# for loop iterations
rm -rf log.json tempFile1.json tempFile2.json 
mkdir /bakerx/mutation
touch log.json tempFile1.json tempFile2.json 
exceptionCount=0
changeCount=0
for (( i=1; i<=$1; i++ ))
do 
        cd ~
        echo "Mutation-$i started"
        pixelDifference=0
        exceptionStatus=0
        node mutate.js > output.txt
        operatorChange=$(cat output.txt| awk '{if(NR==2) print $0}')
        sourceLine=$(cat output.txt| awk '{if(NR==3) print $0}')
        #echo $operator
        #echo $sourceLine

        fileLength=$(jq '.screenshotDetails | length' screenshotDetails.json)

        cd ~
        cd checkbox.io-micro-preview
        forever start index.js
        cd ~
        for (( j=0; j<$fileLength; j++ ))
        do

        cd ~

        screenshotFileName=$(jq '.screenshotDetails['$j'].fileName' screenshotDetails.json | tr -d '"')
        screenshotFileUrl=$(jq '.screenshotDetails['$j'].fileUrl' screenshotDetails.json | tr -d '"')
        
        sleep 3
        { 
            cd ~
            screenshot $screenshotFileUrl /home/vagrant/mutation/$screenshotFileName/$i
        } || {
            exceptionStatus=1
        } 
         if [ $exceptionStatus -eq 0 ]
            then
            cd ~ ; 
            
            compare -metric AE -fuzz 5% ~/referenceSnaps/ref_$screenshotFileName.png ~/mutation/$screenshotFileName/$i.png null: 2>pixelDifference1
            pixelDifference=$(( $pixelDifference + $(head -n 1 pixelDifference1) ))
       
        fi
        
        done
        
        # forever list

        cd ~
        cd checkbox.io-micro-preview
        forever stop index.js
        if [ $exceptionStatus -eq 0 ]
        then
            if [ $pixelDifference -eq 0 ]
                then
                status='No Change Occured'
                else
                status='File modified'
                changeCount=$(($changeCount+1))
            fi
        fi    
                
        
        if [ $exceptionStatus -eq 1 ]
        then
        status='Exception Encountered'
        exceptionCount=$(($exceptionCount+1))
        exceptionFlag=false
        fi

resultData=$(cat <<EOF 
{"$i":
{"Operator Change": "$operatorChange",
"Source Line": "$sourceLine",
"Status": "$status",
"Pixel Difference": "$pixelDifference"
}
}
EOF
)


cd ~
echo $resultData > tempFile1.json
cat log.json > tempFile2.json
jq -s add tempFile1.json tempFile2.json > log.json
echo "Mutation-$i completed"
cd ~
cd checkbox.io-micro-preview
git reset --hard > log.txt
done


cp -r ~/mutation/ /bakerx/
cp -r ~/log.json /bakerx/result


passedCounter=$(($1-$changeCount-$exceptionCount))
denom=$(( $1-$exceptionCount ))

echo "Failed Mutants: $changeCount"
echo "Passed Mutants: $passedCounter"
echo "Exception Mutants: $exceptionCount"
echo "Mutation Coverage: $changeCount/$denom"