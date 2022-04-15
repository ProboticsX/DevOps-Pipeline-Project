#!/usr/bin/env node
const fs = require("fs");
const chalk = require('chalk');
const path = require('path');
const { exec } = require("child_process");
const child_process = require("child_process");
const execSync = require('child_process').execSync;
const os = require('os');
const { options } = require("yargs");
exports.command = 'init';
exports.desc = 'Prepare tool';
exports.builder = yargs => {
    yargs.options({
    });
};

exports.handler = async argv => {
    const { processor } = argv;

    console.log(chalk.green("Preparing computing environment..."));

	if(processor == "Intel/Amd64")  // For Windows and Mac Intel processors
    {
        let pull_img = `bakerx pull focal cloud-images.ubuntu.com`;                   // Pull the focal image
        child_process.execSync(pull_img, {stdio: ['inherit', 'inherit', 'inherit']});       

        let createVM = `bakerx run pipeline-vm focal --ip 192.168.56.10 --sync --memory 4096`;  // Create VM
        child_process.execSync(createVM, {stdio: ['inherit', 'inherit', 'inherit']});       
	
	let print_get_info = `bakerx ssh-info pipeline-vm --format json`;    // Display connection information of VM
        child_process.execSync(print_get_info, {stdio: ['inherit', 'inherit', 'inherit']});    
	    
        let get_info = `bakerx ssh-info pipeline-vm --format json > "VM_Info.json"`;    // Store connection information of VM in JSON file
        child_process.execSync(get_info, {stdio: ['inherit', 'inherit', 'inherit']});                                    
    }
    else // For Mac M1 processors
    {

        child_process.execSync(`cp "$HOME/Library/Application Support/basicvm/key" ./`);  
        child_process.execSync(`mkdir keys`);
        child_process.execSync(`mv key ./keys `);   // Retrieve ssh-key of basicvm
        child_process.execSync(`vm pull`, {stdio: ['inherit', 'inherit', 'inherit']});   // Pull the image
        child_process.execSync(`vm run pipeline-vm ubuntu:jammy`, {stdio: ['inherit', 'inherit', 'inherit']});
        const info=child_process.execSync(`vm ssh-config pipeline-vm `);
        var temp1 = {}
        info.toString().trim().split(/\r?\n/).forEach(line =>  {
            if(line.trim().length > 0) {
                let l = line.trim().split(" ");
                temp1[l[0]] = l[1];
            }
        });

        temp1['Path'] = '~/Library/Application\ Support/basicvm/key';
        temp1['port'] = 22;
        temp1['identifyFile'] = path.join( path.dirname(require.main.filename), 'keys', 'key');

        var jsonContent1 = JSON.stringify(temp1);   
        const output = execSync('echo "VM Information"', { encoding: 'utf-8' });
        console.log(output);
        console.log(jsonContent1);  


        // Creating JSON file and storing VM connection information
        fs.writeFile("VM_Info.json", jsonContent1, 'utf8', function (err) {     
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
         
        });



    }

 
   
};
