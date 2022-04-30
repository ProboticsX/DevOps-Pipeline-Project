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


async function provisionDroplet(dropletName, region, imageName, sshFingerprint, processor){

     var jsonContent = await provision.init(dropletName, region, imageName, sshFingerprint);
     return jsonContent;
}


exports.handler = async argv => {
    const { job_name, processor } = argv;
    var dropletName1 = "sshubha-green";
	var region = "nyc1"; // Fill one in from #1
	var imageName = "ubuntu-20-04-x64"; // Fill one in from #2
    var dropletName2 = "sshubha-blue";

    let sshFingerprint = await sshGeneration.generateSSH();

    var info1 = await provisionDroplet(dropletName1, region, imageName, sshFingerprint, processor)
    var info2 = await provisionDroplet(dropletName2, region, imageName, sshFingerprint, processor)    
    var result = '{\n"green":'+info1 + ',\n"blue":' + info2+'\n}';
    console.log(result);
    fs.writeFileSync("inventory.json", result, 'utf8', function (err) {     
	    if (err) {
		console.log("An error occured while writing JSON Object to File.");
		return console.log(err);
		}
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
}