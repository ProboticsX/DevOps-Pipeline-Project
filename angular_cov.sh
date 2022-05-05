#!/usr/bin/ksh
awk 'FNR == 6 {print}' coverage-angular.txt | xargs | awk '{print $4" "$7" "$10" "$13}' > coverage.txt
awk 'FNR == 8 {print}' coverage-angular.txt | xargs | awk '{print $4" "$6" "$8" "$10}' >> coverage.txt

count=$(awk '{print NF; exit}' coverage.txt)


e=$(awk 'FNR == 2 {print}' coverage.txt)

echo $e > coverage.txt

g=$(awk '{for(i=1;i<=NF;i++) t+=$i; print t; t=0}' coverage.txt)


total=$(echo "$g $count" | awk '{printf "%.2f \n", $1/$2}')

echo "Threshold provided: $1"
echo "Current Total Code Coverage: $total" 

name="deploymentAllowed"

if [[ $(bc -l <<< "$total < $1") -eq 1 ]]
then
    val=false
    json_str="{"
    json_str+="\"${name}\" : ${val}"
    json_str+="}"
else
    val=true
    json_str="{"
    json_str+="\"${name}\" : ${val}"
    json_str+="}"

fi

echo $json_str > angular-code-coverage.json









