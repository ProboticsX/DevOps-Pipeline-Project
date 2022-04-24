#!/usr/bin/env node
const fs = require('fs');
const yaml = require('js-yaml');
const child_process = require("child_process");
const execSync = require('child_process').execSync;
exports.command = 'build <job_name> <build_yml>';
const os = require('os');
const { options } = require("yargs");
require('dotenv').config();



class Setup{
    // Executing the commands in VM via ssh
    async sshIntoVM(command,processor) {
        let configFile = fs.readFileSync('VM_Info.json', (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });
      
        
    let vm_ssh = null
    configFile = JSON.parse(configFile);
    if(processor == "Intel/Amd64")
    {
        vm_ssh = `ssh -i "${configFile.private_key}" ${configFile.user}@${configFile.hostname} -p ${configFile.port} -o StrictHostKeyChecking=no `;
    }
    else
    {
        vm_ssh = `ssh -i "${configFile.identifyFile}" -p ${configFile.port} -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${configFile.User}@${configFile.HostName}`;
    }
    
     
    let token = process.env.Git_Token

    let passwd = process.env.mySQL_passwd
    command = command.replace('passwd', passwd);

    let microServiceUrl = `https://${token}@github.com/chrisparnin/checkbox.io-micro-preview`
    command = command.replace('microServiceGitUrl', microServiceUrl);

    let snapshotGitUrl = `https://${token}@github.com/ruttabega/screenshot`
    command = command.replace('snapshotGitUrl', snapshotGitUrl);

    command = command.replace("\r","");
    console.log('vm ssh :::',vm_ssh,':::',command);
        execSync(`${vm_ssh} "${command}"`, {stdio: ['inherit', 'inherit', 'inherit']});       
    }    

    // Run the commands in the setup part of build.yml
    async runSetup(setup_cmds,processor)
    {               
        for(let i=0; i< setup_cmds.length;i++)
        {
            let command = setup_cmds[i];
            await this.sshIntoVM(command,processor);                
        }
    }

    
    async runClone(setup_cmds,processor){
        await this.sshIntoVM(setup_cmds,processor);
    }

    // Run the commands for the specific job of build.yml
    async runSteps(job_cmds,processor)
    {      
      for(let i=0; i< job_cmds.length;i++)
      {
          let command = job_cmds[i].run;            
          await this.sshIntoVM(command,processor);                
      }
      
    }
}

exports.handler = async argv => {
    const { job_name, build_yml,processor} = argv;
    try 
    {
        let token = process.env.Git_Token
        const doc = yaml.load(fs.readFileSync(build_yml, 'utf8'));                
        let doc_json = JSON.parse(JSON.stringify(doc)); // Parsing build.yml file

        var index = -1;
        for(let i=0; i< doc_json.jobs.length;i++)
        {
            if(job_name == doc_json.jobs[i].name) // Determining the index of job to execute based on the job name passed in the command line.
            {
                index = i;
            }
        }
        let setup_cmds = doc_json.setup;        
        await new Setup().runSetup(setup_cmds,processor);

        let clone_cmds = `git clone https://${token}@github.ncsu.edu/engr-csc326-staff/iTrust2-v10.git`

        await new Setup().runClone(clone_cmds,processor);
        if(index==-1){
            return;
        }

        let job_cmds = doc_json.jobs[index].steps;  

        // let snapshotDetails = doc_json.jobs[index].snapshots;

        // let finalObjArray = [];

        // for(let i=0; i<snapshotDetails.length;i++){
        //     let jobDetails = snapshotDetails[i].split('/');

        //     let object = {};
        //     object["fileName"] = jobDetails[4].split('.')[0];
        //     object["fileUrl"] = snapshotDetails[i];

        //     finalObjArray.push(object);
        // }

        // let finalJson = {"screenshotDetails":finalObjArray};

        // fs.writeFileSync('screenshotDetails.json', JSON.stringify(finalJson));
                 
        await new Setup().runSteps(job_cmds,processor);
        // await new Setup().sshIntoVM("cp /bakerx/screenshotDetails.json ~/screenshotDetails.json",processor);
        // await new Setup().sshIntoVM("cp /bakerx/final.sh . ",processor);
        // await new Setup().sshIntoVM("sed -i 's/\\r//g' final.sh",processor);
        // await new Setup().sshIntoVM("bash final.sh "+ doc_json.jobs[index].iterations,processor);
    } 
    catch (e) 
    {
        console.log(e);
    }
   
};
