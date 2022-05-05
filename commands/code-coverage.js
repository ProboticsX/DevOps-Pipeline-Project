#!/usr/bin/env node
const fs = require('fs');
const yaml = require('js-yaml');
const chalk = require('chalk');
const child_process = require("child_process");
const execSync = require('child_process').execSync;
const os = require('os');
const { options } = require("yargs");

const configFile = require("../lib/config");


require('dotenv').config();

exports.command = 'code-coverage <build_yml>';

exports.handler = async argv => {
    const { build_yml } = argv;

    console.log(chalk.green("Evaluating code coverage"));

    let buildYamlFile = await configFile.readBuildYaml(build_yml);

    var index = -1;
    for(let i=0; i< buildYamlFile.jobs.length;i++)
    {
        if('code-coverage' == buildYamlFile.jobs[i].name) 
        {
            index = i;
        }
    }
    if(index==-1){
        return;
    }

	let codeCoverageCommands = buildYamlFile.jobs[index].steps;

    let thresholdVal = buildYamlFile.jobs[index].threshold;

    for(let i=0; i< codeCoverageCommands.length;i++){
        let command = codeCoverageCommands[i].run;
        command = command.replace('threshold', thresholdVal); 
        await configFile.sshIntoVM(`${command}`); 
    } 

};
