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

    var dropletName = "jshah7";//+os.hostname();
	var region = "nyc1"; // Fill one in from #1
	var imageName = "ubuntu-20-04-x64"; // Fill one in from #2
    
    await provision.init(dropletName, region, imageName, sshFingerprint);

    await new Setup().sshIntoVM("cp /bakerx/web-srv .ssh/", processor);
    await new Setup().sshIntoVM("chmod 600 .ssh/web-srv", processor);
    execSync("chmod 600 web-srv", {stdio: ['inherit', 'inherit', 'inherit']});  
    
    try{

        let configFile_droplet = fs.readFileSync('dropletContent.json', (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });
        let droplet_ssh = null
        configFile_droplet = JSON.parse(configFile_droplet);

        droplet_ssh = `ssh -i "web-srv" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${configFile_droplet.name}@${configFile_droplet.publicIP}`
        // var delayInMilliseconds = 40000; //1 second

        // function change(cmd, delay) {
        //     return new Promise(async function(resolve, reject) {
      
        //         // Setting 2000 ms time
        //         //await new Setup().sshIntoVM(`${droplet_ssh} "ls"`,processor);
        //         setTimeout(resolve, delay);
        //     }).then( async function() {
        //         console.log("Wrapped setTimeout after 2000ms");
        //         await new Setup().sshIntoVM(`${droplet_ssh} "${cmd}"`,processor);
        //         //await new Setup().sshIntoVM(`${droplet_ssh} "pwd"`,processor);
        //     });
        // }

        // var time = 30000

        // change("ls",time);
        // change("touch hello.txt",time+5000);
        // change("sudo apt-get update",time+10000);
        


        // setTimeout(async function() {
        //     //await new Setup().sshIntoVM(`${droplet_ssh} "touch hello.txt"`,processor);
        //     await new Setup().sshIntoVM(`${droplet_ssh} "sudo apt-get update"`,processor);

        //     // //setTimeout(async function() {
        //     await new Setup().sshIntoVM(`${droplet_ssh} "sudo apt-get install tomcat9 tomcat9-admin -y"`,processor);
        //     //     await new Setup().sshIntoVM(`${droplet_ssh} "ss -ltn"`,processor);
        //     //     await new Setup().sshIntoVM(`${droplet_ssh} "sudo systemctl enable tomcat9"`,processor);
        //     //     await new Setup().sshIntoVM(`${droplet_ssh} "sudo ufw allow from any to any port 8080 proto tcp"`,processor);
        //     // //}, 10000);

            
        // }, delayInMilliseconds);

        var delayInMilliseconds = 45000; //1 second

        setTimeout(async function() {
           // await new Setup().sshIntoVM(`${droplet_ssh} touch sample.txt`,processor);
           execSync(`${droplet_ssh} "sudo apt update"`, {stdio: ['inherit', 'inherit', 'inherit']}); 
           execSync(`${droplet_ssh} "sudo apt-cache search tomcat"`, {stdio: ['inherit', 'inherit', 'inherit']});
           execSync(`${droplet_ssh} "sudo apt install tomcat9 tomcat9-admin -y"`, {stdio: ['inherit', 'inherit', 'inherit']}); 
           execSync(`${droplet_ssh} "sudo systemctl enable tomcat9"`, {stdio: ['inherit', 'inherit', 'inherit']}); 
           execSync(`${droplet_ssh} "sudo ufw allow from any to any port 8080 proto tcp"`, {stdio: ['inherit', 'inherit', 'inherit']});
           execSync(`${droplet_ssh} "sudo apt-get install -qq -y debconf-utils"`, {stdio: ['inherit', 'inherit', 'inherit']});
           execSync(`${droplet_ssh} "sudo apt install mysql-server -y"`, {stdio: ['inherit', 'inherit', 'inherit']}); 
           execSync(`${droplet_ssh} "echo "mysql-server mysql-server/root_password password {{mysql_pass}}" | sudo debconf-set-selections"`, {stdio: ['inherit', 'inherit', 'inherit']}); 
           execSync(`${droplet_ssh} "echo "mysql-server mysql-server/root_password_again password {{mysql_pass}}" | sudo debconf-set-selections"`, {stdio: ['inherit', 'inherit', 'inherit']});
           execSync(`${droplet_ssh} "sudo systemctl start mysql"`, {stdio: ['inherit', 'inherit', 'inherit']});
           execSync(`${droplet_ssh} "sudo apt install default-jre -y"`, {stdio: ['inherit', 'inherit', 'inherit']});
           execSync(`${droplet_ssh} "sudo apt install openjdk-11-jdk -y"`, {stdio: ['inherit', 'inherit', 'inherit']});
           execSync(`${droplet_ssh} "sudo apt install maven -y ; export PATH=/opt/apache-maven-3.8.4/bin:$PATH"`, {stdio: ['inherit', 'inherit', 'inherit']});
           execSync(`${droplet_ssh} "scp -i web-srv filename root@ip:~"`, {stdio: ['inherit', 'inherit', 'inherit']});
           execSync(`${droplet_ssh} "java -jar iTrust2-10.jar"`, {stdio: ['inherit', 'inherit', 'inherit']});

           
           // await new Setup().sshIntoVM(`sudo apt update`,processor);
            // await new Setup().sshIntoVM(`sudo apt install tomcat9 tomcat9-admin -y`,processor);
            // await new Setup().sshIntoVM(`sudo systemctl enable tomcat9`,processor);
            // await new Setup().sshIntoVM(`${droplet_ssh} sudo ufw allow from any to any port 8080 proto tcp`,processor);
            // await new Setup().sshIntoVM(`${droplet_ssh} sudo apt install mysql-server -y`,processor);
        }, delayInMilliseconds);


    //    await new Setup().sshIntoVM(`${droplet_ssh} touch sample.txt`,processor);
    // //    await new Setup().sshIntoVM(`${droplet_ssh} sudo apt update -y`,processor);
    //    await new Setup().sshIntoVM(`${droplet_ssh} sudo apt install mysql-server -y`,processor);

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
    // if(processor == "Intel/Amd64")
    // {
        vm_ssh = `ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i "${configFile.private_key}" ${configFile.user}@${configFile.hostname} -p ${configFile.port}`;
    // }
    // else
    // {
    //     vm_ssh = `ssh -i "${configFile.identifyFile}" -p ${configFile.port} -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${configFile.User}@${configFile.HostName}`;
    // }

    console.log('vm ssh :::',vm_ssh,':::',command);
    execSync(`${vm_ssh} "${command}"`, {stdio: ['inherit', 'inherit', 'inherit']});       
    
    }    
}


