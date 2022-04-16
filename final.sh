# for loop iterations

rm -rf log.json temp1.json temp2.json pixelDiff1 pixelDiff2 pixelDiff3 pixelDiff4
mkdir /bakerx/mutated
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
        
                forever start index.js
                sleep 3
                {
                screenshot http://localhost:3000/survey/upload.md /home/vagrant/mutated/upload_screenshot/$i 
                } || {
                    flag_ex=1
                }
                {
                screenshot http://localhost:3000/survey/long.md /home/vagrant/mutated/long_screenshot/$i 
                } || {
                    flag_ex=1
                }
                {
                screenshot http://localhost:3000/survey/survey.md /home/vagrant/mutated/survey_screenshot/$i 
                } || {
                    flag_ex=1
                }
                {
                screenshot http://localhost:3000/survey/variations.md /home/vagrant/mutated/variations_screenshot/$i 
                } || {
                    flag_ex=1
                }
                forever stop index.js 
                if [ $flag_ex -eq 0 ]
                then
                cd ~ ; 
                echo "Here is comparison"
                compare -metric AE -fuzz 5% ~/originalSnaps/ori_upload.png ~/mutated/upload_screenshot/$i.png null: 2>pixelDiff1
                compare -metric AE -fuzz 5% ~/originalSnaps/ori_long.png ~/mutated/long_screenshot/$i.png null: 2>pixelDiff2
                compare -metric AE -fuzz 5% ~/originalSnaps/ori_survey.png ~/mutated/survey_screenshot/$i.png null: 2>pixelDiff3
                compare -metric AE -fuzz 5% ~/originalSnaps/ori_variations.png ~/mutated/variations_screenshot/$i.png null: 2>pixelDiff4
                
                pixelDiff=$(( $(head -n 1 pixelDiff1)+$(head -n 1 pixelDiff2)+$(head -n 1 pixelDiff3)+$(head -n 1 pixelDiff4) ))

                        if [ $pixelDiff -eq 0 ]
                        then
                        endResult='Not Changed'
                        else
                        endResult='Changed'
                        changeCounter=$(($changeCounter+1))
                        fi
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
done


cp -r ~/mutated/ /bakerx/
cp -r ~/log.json /bakerx/result


passedCounter=$((1000-$changeCounter-$exceptionCounter))
denom=$(( 1000-$exceptionCounter ))

echo "Failed Mutants: $changeCounter"
echo "Passed Mutants: $passedCounter"
echo "Exception Mutants: $exceptionCounter"
echo "Mutation Coverage: $changeCounter/$denom"