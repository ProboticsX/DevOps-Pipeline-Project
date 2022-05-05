const chalk = require('chalk');
const pathUtil = require("path");
const execSync = require('child_process').execSync;
const fs = require('fs');
const yaml = require('js-yaml');
const configFile = require("../lib/config");
const console = require('console');
const proxyConfig = require('../lib/proxyConfig');


exports.command = 'deploy inventory <job_name> <build_yml>';
exports.desc = 'Prepare tool';

var dropletNames = ["green", "blue"]

exports.builder = yargs => {
    yargs.options({
    });
};

exports.handler = async argv => {
    const { job_name, build_yml} = argv;
                                    
    let buildYamlFile = await configFile.readBuildYaml(build_yml);
    
    var index = -1;
    for(let i=0; i< buildYamlFile.jobs.length;i++)
    {
        if(job_name == buildYamlFile.jobs[i].name) 
        {
            index = i;
        }
    }
    if(index==-1){
        return;
    }


    let appType = buildYamlFile.jobs[index].application_type;

    let fileName = appType + '-' + 'code-coverage' + '.json';


    let coverageResult = fs.readFileSync(`${fileName}`, (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });

    
    coverageResult = JSON.parse(coverageResult);

    if(!coverageResult.deploymentAllowed){
        console.log('----------------------------------------------------------------');
        console.log(chalk.red('DEPLOY NOT PERMITTED. CODE COVERAGE THRESHOLD NOT MET'));
        console.log('----------------------------------------------------------------');

        process.exit();
    }


    let permitCommands = buildYamlFile.jobs[index].execute_permission !== undefined ? buildYamlFile.jobs[index].execute_permission : [];

    for(let i=0; i< permitCommands.length;i++){
        let command = permitCommands[i].run;  
        await execSync(`${command}`, {stdio: ['inherit', 'inherit', 'inherit']}); 
    }

    //read inventory
    let inventoryFile = fs.readFileSync('inventory.json', (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });

    
    inventoryFile = JSON.parse(inventoryFile);
    
    if(index == 4){

        let vmCommands = buildYamlFile.jobs[index].vm_steps;

        for(let i=0; i< vmCommands.length;i++){
            let command = vmCommands[i].run;  
            await configFile.sshIntoVM(`${command}`); 
        }
     
        let dropletStepsCommand = buildYamlFile.jobs[index].droplet_steps !== undefined ? buildYamlFile.jobs[index].droplet_steps : [];

        let sqlSetupSteps = buildYamlFile.jobs[index].sql_setup !== undefined ? buildYamlFile.jobs[index].sql_setup : []; 
    
        for(let i=0;i<dropletNames.length;i++){
           
            let tempInventoryFile = inventoryFile[dropletNames[i]];

            let dropletName = tempInventoryFile.name;
            let publicIP = tempInventoryFile.publicIP;

            let projectPath = buildYamlFile.jobs[index].deployment_file_path !== undefined ? buildYamlFile.jobs[index].deployment_file_path : [];

            let applicationName = buildYamlFile.jobs[index].application_name;

            let droplet_ssh = null;
            droplet_ssh = `ssh -i "web-srv" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${dropletName}@${publicIP}`;

            for(let i=0;i< sqlSetupSteps.length; i++){
                let command = sqlSetupSteps[i].run;  
                let passwd = process.env.mySQL_passwd;
                command = command.replace('passwd', passwd); 
                await execSync(`${droplet_ssh} "${command}"`, {stdio: ['inherit', 'inherit', 'inherit']}); 
            }

            let vmToDroplet = buildYamlFile.jobs[index].vm_to_droplet !== undefined ? buildYamlFile.jobs[index].vm_to_droplet : [];

            console.log('vm to droplet:: ', vmToDroplet)

            for(let i=0; i< vmToDroplet.length;i++){
                let command = vmToDroplet[i].run; 
                command = command.replace('project_path', projectPath); 
                command = command.replace('droplet_name', dropletName);
                command = command.replace('ip_address', publicIP); 
                command = command.replace('app_name', applicationName); 
                await configFile.sshIntoVM(`${command}`); 
            }

            for(let i=0; i< dropletStepsCommand.length;i++){
                let command = dropletStepsCommand[i].run;  
                await execSync(`${droplet_ssh} "${command}"`, {stdio: ['inherit', 'inherit', 'inherit']}); 
            }

            let vmToDropletCommands = buildYamlFile.jobs[index].vm_to_droplet_steps !== undefined ? buildYamlFile.jobs[index].vm_to_droplet_steps : [];

            for(let i=0; i< vmToDropletCommands.length;i++){
                let command = vmToDropletCommands[i].run; 
                command = command.replace('project_path', projectPath); 
                command = command.replace('droplet_name', dropletName);
                command = command.replace('ip_address', publicIP); 
                command = command.replace('app_name', applicationName); 
                await configFile.sshIntoVM(`${command}`); 
            }
        } 

        // let endPoint = buildYamlFile.jobs[index].end_point;
        // console.log("-----------------Starting Proxy!-----------------")
        // //await new Promise(resolve => setTimeout(resolve, 2000));
        // await proxyConfig.runProxy(inventoryFile, endPoint);

    }
};
