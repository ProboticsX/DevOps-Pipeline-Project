const chalk = require('chalk');
const pathUtil = require("path");
const execSync = require('child_process').execSync;
const fs = require('fs');

const sshGeneration = require('../generate-ssh.js');

const provision = require('../provision.js');


exports.command = 'prod <job_name>';
exports.desc = 'Prepare tool';
exports.builder = yargs => {
    yargs.options({
    });
};





exports.handler = async argv => {
    const { job_name, processor } = argv;

    console.log(chalk.green("Preparing docker builder image"));

    let sshFingerprint = await sshGeneration.generateSSH();

    var dropletName = "sshubha";//+os.hostname();
	var region = "nyc1"; // Fill one in from #1
	var imageName = "ubuntu-20-04-x64"; // Fill one in from #2
    
    await provision.init(dropletName, region, imageName, sshFingerprint);

    await new Setup().sshIntoVM("cp /bakerx/web-srv .ssh/", processor);
    await new Setup().sshIntoVM("chmod 600 .ssh/web-srv", processor);
    
    try{

        let configFile_droplet = fs.readFileSync('dropletContent.json', (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });
        let droplet_ssh = null
        configFile_droplet = JSON.parse(configFile_droplet);

        droplet_ssh = `"ssh -i .ssh/web-srv -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${configFile_droplet.name}@${configFile_droplet.publicIP}"`
        var delayInMilliseconds = 30000; //1 second

        setTimeout(async function() {
            await new Setup().sshIntoVM(`${droplet_ssh} "touch hello.txt"`,processor);
        }, delayInMilliseconds);

        // await new Setup().sshIntoVM(`${droplet_ssh} touch hello.txt`,processor);
    }

    catch (e) 
    {
        console.log(e);
    }


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
    if(processor == "Intel/Amd64")
    {
        vm_ssh = `ssh -i "${configFile.private_key}" ${configFile.user}@${configFile.hostname} -p ${configFile.port} -o StrictHostKeyChecking=no `;
    }
    else
    {
        vm_ssh = `ssh -i "${configFile.identifyFile}" -p ${configFile.port} -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${configFile.User}@${configFile.HostName}`;
    }

    console.log('vm ssh :::',vm_ssh,':::',command);
    execSync(`${vm_ssh} "${command}"`, {stdio: ['inherit', 'inherit', 'inherit']});       
    
    }    
}


