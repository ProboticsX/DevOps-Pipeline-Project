#!/bin/bash

name="deploymentAllowed"
if [ -z "$(grep "BUILD SUCCESS" coverage-java.txt)" ]
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

echo $json_str > java-code-coverage.json