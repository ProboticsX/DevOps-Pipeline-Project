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

    let permitCommands = buildYamlFile.jobs[index].execute_permission;

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

    if(job_name=="itrust-deploy"){

        let vmCommands = buildYamlFile.jobs[index].vm_steps;

        for(let i=0; i< vmCommands.length;i++){
            let command = vmCommands[i].run;  
            await configFile.sshIntoVM(`${command}`); 
        }
     
        let dropletStepsCommand = buildYamlFile.jobs[index].droplet_steps;

        let sqlSetupSteps = buildYamlFile.jobs[index].sql_setup; 
    
        for(let i=0;i<dropletNames.length;i++){
           
            let tempInventoryFile = inventoryFile[dropletNames[i]];

            await configFile.sshIntoVM(`scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -q -i ".ssh/web-srv " ~/iTrust2-v10/iTrust2/target/iTrust2-10.jar ${tempInventoryFile.name}@${tempInventoryFile.publicIP}:~ `);

            let droplet_ssh = null;
            droplet_ssh = `ssh -i "web-srv" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${tempInventoryFile.name}@${tempInventoryFile.publicIP}`;

            for(let i=0;i< sqlSetupSteps.length; i++){
                let command = sqlSetupSteps[i].run;  
                let passwd = process.env.mySQL_passwd;
                command = command.replace('passwd', passwd); 
                execSync(`${droplet_ssh} "${command}"`, {stdio: ['inherit', 'inherit', 'inherit']}); 
            }

            for(let i=0; i< dropletStepsCommand.length;i++){
                let command = dropletStepsCommand[i].run;  
                execSync(`${droplet_ssh} "${command}"`, {stdio: ['inherit', 'inherit', 'inherit']}); 
            }
        }


        let endPoint = buildYamlFile.jobs[index].end_point;
        console.log("-----------------Starting Proxy!-----------------")
        //await new Promise(resolve => setTimeout(resolve, 2000));
        await proxyConfig.runProxy(inventoryFile, endPoint);

    }

    if(job_name=="F0_deploy"){
    
       // for(let i=0;i<dropletNames.length;i++){

            let tempInventoryFile = inventoryFile["green"];
            let vmCommands = buildYamlFile.jobs[index].vm_steps;

            for(let i=0; i< vmCommands.length;i++){
                let command = vmCommands[i].run;  
                command = command.replaceAll('droplet_path', tempInventoryFile.name +"@"+tempInventoryFile.publicIP);
                await configFile.sshIntoVM(`${command}`); 
            }

        let droplet_ssh = null;
        droplet_ssh = `ssh -i "web-srv" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${tempInventoryFile.name}@${tempInventoryFile.publicIP}`;


            
            
        let dropletStepsCommand = buildYamlFile.jobs[index].droplet_steps;
        console.log(dropletStepsCommand)
        
        
        
        for(let i=0; i< dropletStepsCommand.length;i++){
            let command = dropletStepsCommand[i].run;  
            execSync(`${droplet_ssh} "${command}"`, {stdio: ['inherit', 'inherit', 'inherit']}); 
        }

        // let monitorStepsCommand = buildYamlFile.jobs[index].monitor_steps;
        //     console.log(monitorStepsCommand) 

        //     for(let i=0; i< monitorStepsCommand.length;i++){
        //         let command = monitorStepsCommand[i].run;  
        //         execSync(`${droplet_ssh} "${command}"`, {stdio: ['inherit', 'inherit', 'inherit']}); 
        //     }
        
        
       // let tempInventoryFile = inventoryFile[dropletNames[i]];
       // let droplet_ssh = null;
        //droplet_ssh = `ssh -i "web-srv" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${tempInventoryFile.name}@${tempInventoryFile.publicIP}`;

        

    //}
}


    if(job_name=="django_stats"){

        let tempInventoryFile = inventoryFile["green"];

        let droplet_ssh = null;
        droplet_ssh = `ssh -i "web-srv" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${tempInventoryFile.name}@${tempInventoryFile.publicIP}`;

        let monitorStepsCommand = buildYamlFile.jobs[index].monitor_steps;
        console.log(monitorStepsCommand) 

        for(let i=0; i< monitorStepsCommand.length;i++){
            let command = monitorStepsCommand[i].run;  
            execSync(`${droplet_ssh} "${command}"`, {stdio: ['inherit', 'inherit', 'inherit']}); 
        }

    }

    if(job_name=="react_stats"){

        let tempInventoryFile = inventoryFile["blue"];

        let droplet_ssh = null;
        droplet_ssh = `ssh -i "web-srv" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${tempInventoryFile.name}@${tempInventoryFile.publicIP}`;

        let monitorStepsCommand = buildYamlFile.jobs[index].monitor_steps;
        console.log(monitorStepsCommand) 

        for(let i=0; i< monitorStepsCommand.length;i++){
            let command = monitorStepsCommand[i].run;  
            execSync(`${droplet_ssh} "${command}"`, {stdio: ['inherit', 'inherit', 'inherit']}); 
        }

    }

    if(job_name=="vehicle-deploy"){

       // for(let i=0;i<dropletNames.length;i++){

            let dropletStepsCommand = buildYamlFile.jobs[index].droplet_steps;
            console.log(dropletStepsCommand)
            
            let tempInventoryFile = inventoryFile["blue"];
            let droplet_ssh = null;
            droplet_ssh = `ssh -i "web-srv" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${tempInventoryFile.name}@${tempInventoryFile.publicIP}`;
        
            let vmCommands = buildYamlFile.jobs[index].vm_steps;

            for(let i=0; i< vmCommands.length;i++){
                let command = vmCommands[i].run;  
                command = command.replaceAll('droplet_path', tempInventoryFile.name +"@"+tempInventoryFile.publicIP);
                await configFile.sshIntoVM(`${command}`); 
            }

            for(let i=0; i< dropletStepsCommand.length;i++){
                let command = dropletStepsCommand[i].run;  
                execSync(`${droplet_ssh} "${command}"`, {stdio: ['inherit', 'inherit', 'inherit']}); 
            }
       // }

    }

    if(job_name=="monitor-deploy"){

      //  for(let i=0;i<dropletNames.length;i++){
            
        let vmCommands = buildYamlFile.jobs[index].vm_steps;
        console.log(vmCommands);
        let tempInventoryFile = inventoryFile["monitor"];
        for(let i=0; i< vmCommands.length;i++){
            let command = vmCommands[i].run;  
            command = command.replaceAll('droplet_path', tempInventoryFile.name +"@"+tempInventoryFile.publicIP);
            await configFile.sshIntoVM(`${command}`); 
        }

            let dropletStepsCommand = buildYamlFile.jobs[index].droplet_steps;
            console.log(dropletStepsCommand)
            
            //let tempInventoryFile = inventoryFile["monitor"];
            let droplet_ssh = null;
            droplet_ssh = `ssh -i "web-srv" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${tempInventoryFile.name}@${tempInventoryFile.publicIP}`;
    
            for(let i=0; i< dropletStepsCommand.length;i++){
                let command = dropletStepsCommand[i].run;  
                command = command.replaceAll('droplet_path', tempInventoryFile.name +"@"+tempInventoryFile.publicIP);
                execSync(`${droplet_ssh} "${command}"`, {stdio: ['inherit', 'inherit', 'inherit']}); 
            }
        //}

    }

};
