# for loop iterations

rm -rf log.json temp1.json temp2.json pixelDiff_1 pixelDiff_2 pixelDiff_3 pixelDiff_4
mkdir /bakerx/mutation
touch log.json temp1.json temp2.json 
exceptionCounter=0
changeCounter=0
for (( i=1; i<=$1; i++ ))
do 
        cd ~
        cd checkbox.io-micro-preview
        echo "Mutation-$i started"
        pixelDiff=0
        flag_ex=0
        node mutate.js > output.txt
        operator=$(cat output.txt| awk '{if(NR==2) print $0}')
        sourceLine=$(cat output.txt| awk '{if(NR==3) print $0}')
        #echo $operator
        #echo $sourceLine

        fileLength=$(jq '.screenshotDetails | length' screenshotDetails.json)

        cd ~
        cd checkbox.io-micro-preview
        forever start index.js

        for (( j=0; j<$fileLength; j++ ))
        
        do

        cd ~
        cd checkbox.io-micro-preview

        screenshotFileName=$(jq '.screenshotDetails['$j'].fileName' screenshotDetails.json | tr -d '"')
        screenshotFileUrl=$(jq '.screenshotDetails['$j'].fileUrl' screenshotDetails.json | tr -d '"')

        sleep 3
        {
            screenshot $screenshotFileUrl /home/vagrant/mutation/$screenshotFileName/$i
        } || {
            flag_ex=1
        } 
         if [ $flag_ex -eq 0 ]
            then
            cd ~ ; 
            echo "Here is comparison originalSnaps/ori_$screenshotFileName"
            compare -metric AE -fuzz 5% ~/originalSnaps/ori_$screenshotFileName.png ~/mutation/$screenshotFileName/$i.png null: 2>pixelDiff1
            pixelDiff=$(( $pixelDiff + $(head -n 1 pixelDiff1) ))
       
        fi
        
        done
        
        # forever list

        cd ~
        cd checkbox.io-micro-preview
        forever stop index.js
        echo "pixeldifff $pixelDiff"
        if [ $pixelDiff -eq 0 ]
            then
            endResult='Not Changed'
            else
            endResult='Changed'
            changeCounter=$(($changeCounter+1))
        fi
                
        echo $flag_ex
        if [ $flag_ex -eq 1 ]
        then
        endResult='Exception'
        exceptionCounter=$(($exceptionCounter+1))
        exceptionFlag=false
        fi

json_data=$(cat <<EOF 
{"$i":
{"operator": "$operator",
"sourceLine": "$sourceLine",
"result": "$endResult",
"pixel diff": "$pixelDiff"
}
}
EOF
)


cd ~
echo $json_data > temp1.json
cat log.json > temp2.json
jq -s add temp1.json temp2.json > log.json
echo "Mutation-$i completed"
cd ~
cd checkbox.io-micro-preview
git reset --hard > log.txt
done


cp -r ~/mutation/ /bakerx/
cp -r ~/log.json /bakerx/result


passedCounter=$((1000-$changeCounter-$exceptionCounter))
denom=$(( 1000-$exceptionCounter ))

echo "Failed Mutants: $changeCounter"
echo "Passed Mutants: $passedCounter"
echo "Exception Mutants: $exceptionCounter"
echo "Mutation Coverage: $changeCounter/$denom"