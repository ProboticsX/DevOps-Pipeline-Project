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

exports.command = 'test <build_yml>';

exports.handler = async argv => {
    const { build_yml } = argv;

    console.log(chalk.green("Testing the project"));

    let buildYamlFile = await configFile.readBuildYaml(build_yml);

    var index = -1;
    for(let i=0; i< buildYamlFile.jobs.length;i++)
    {
        if('test' == buildYamlFile.jobs[i].name) 
        {
            index = i;
        }
    }
    if(index==-1){
        return;
    }

	let testCommands = buildYamlFile.jobs[index].steps;

    for(let i=0; i< testCommands.length;i++){
        let command = testCommands[i].run;
        await configFile.sshIntoVM(`${command}`); 
    }

};
