const chalk = require('chalk');
const pathUtil = require("path");
const execSync = require('child_process').execSync;
const fs = require('fs');
const yaml = require('js-yaml');


exports.command = 'deploy inventory <job_name> <build_yml>';
exports.desc = 'Prepare tool';

var droplet_file_name = ["sshubha-green","sshubha-blue"]

exports.builder = yargs => {
    yargs.options({
    });
};

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
    vm_ssh = `ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i "${configFile.private_key}" ${configFile.user}@${configFile.hostname} -p ${configFile.port}`;

    console.log('vm ssh :::',vm_ssh,':::',command);
    execSync(`${vm_ssh} "${command}"`, {stdio: ['inherit', 'inherit', 'inherit']});       
    
    }
    
    async runSteps(job_cmds_droplet, job_cmds_vm,dropletName,processor)
    {
        try{

            console.log("sadbaskdb",job_cmds_droplet)
            var delayInMilliseconds = 5000; //1 second

            setTimeout(async function() {

                execSync("chmod 600 web-srv", {stdio: ['inherit', 'inherit', 'inherit']});  
                let configFile_droplet = fs.readFileSync(dropletName+'_dropletContent.json', (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });

                configFile_droplet = JSON.parse(configFile_droplet);

                for(let i=0; i< job_cmds_vm.length;i++){
                    let command = job_cmds_vm[i].run;    
                    if(i == job_cmds_vm.length-1){
                        command = ` scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -q -i ".ssh/web-srv" ~/iTrust2-v10/iTrust2/target/iTrust2-10.jar ${configFile_droplet.name}@${configFile_droplet.publicIP}:~ `;
                    }
                    await new Setup().sshIntoVM(command,processor);                
                }

                let droplet_ssh = null
                droplet_ssh = `ssh -i "web-srv" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${configFile_droplet.name}@${configFile_droplet.publicIP}`
                for(let i=0; i< job_cmds_droplet.length;i++){
                    let command = job_cmds_droplet[i].run;  
                    execSync(`${droplet_ssh} "${command}"`, {stdio: ['inherit', 'inherit', 'inherit']}); 
                }

            }, delayInMilliseconds);


            
        }

        catch(e){
            console.log(e)
        }
      
    }
}

exports.handler = async argv => {
    const { job_name, build_yml,processor} = argv;
    try 
    {
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
        if(job_name=="itrust-deploy") {

            if(index==-1){
                return;
            }


        }

        // execSync("touch sample.txt")
        // execSync("start cmd /k echo Hello2")
        // execSync("ipconfig")

        await new Setup().sshIntoVM("cp /bakerx/web-srv .ssh/", processor);
        await new Setup().sshIntoVM("chmod 600 .ssh/web-srv", processor);
        execSync("chmod 600 web-srv", {stdio: ['inherit', 'inherit', 'inherit']});  
        await new Setup().sshIntoVM(`cd iTrust2-v10/iTrust2/ && mvn package `,processor);

        let job_cmds_vm = doc_json.jobs[index].vm_steps;         
        let job_cmds_droplet = doc_json.jobs[index].droplet_steps;
        
        for(let i=0; i< droplet_file_name.length;i++){
            await new Setup().runSteps(job_cmds_droplet,job_cmds_vm,droplet_file_name[i], processor);
        }
        
        
    } 
    catch (e) 
    {
        console.log(e);
    }
   
};
