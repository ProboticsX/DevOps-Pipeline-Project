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

    await provision.init(dropletName, region, imageName, sshFingerprint);

//     await new Setup().sshIntoVM("cp /bakerx/web-srv .ssh/", processor);
//     await new Setup().sshIntoVM("chmod 600 .ssh/web-srv", processor);
//     execSync("chmod 600 web-srv", {stdio: ['inherit', 'inherit', 'inherit']});  
    
//     try{

//         let configFile_droplet = fs.readFileSync(dropletName+'_dropletContent.json', (err) => {
//             if (err) {
//                 console.error(err);
//                 return;
//             }
//         });
//         let droplet_ssh = null
//         configFile_droplet = JSON.parse(configFile_droplet);

//         droplet_ssh = `ssh -i "web-srv" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${configFile_droplet.name}@${configFile_droplet.publicIP}`

//         var delayInMilliseconds = 45000; //1 second

//         setTimeout(async function() {


//         await new Setup().sshIntoVM(`cd iTrust2-v10/iTrust2/ && mvn package `,processor);
//         await new Setup().sshIntoVM(` scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -q -i ".ssh/web-srv" ~/iTrust2-v10/iTrust2/target/iTrust2-10.jar ${configFile_droplet.name}@${configFile_droplet.publicIP}:~ `,processor);
        
//         execSync(`${droplet_ssh} "echo "mysql-server mysql-server/root_password password abcd1234" | sudo debconf-set-selections"`, {stdio: ['inherit', 'inherit', 'inherit']});
//         execSync(`${droplet_ssh} "echo "mysql-server mysql-server/root_password_again password abcd1234" | sudo debconf-set-selections"`, {stdio: ['inherit', 'inherit', 'inherit']});
//         execSync(`${droplet_ssh} "sudo apt install -y mysql-server"`, {stdio: ['inherit', 'inherit', 'inherit']});
//         execSync(`${droplet_ssh} "sudo systemctl start mysql"`, {stdio: ['inherit', 'inherit', 'inherit']});
//         execSync(`${droplet_ssh} "sudo apt install default-jre -y"`, {stdio: ['inherit', 'inherit', 'inherit']});
//         execSync(`${droplet_ssh} "sudo apt install openjdk-11-jdk -y"`, {stdio: ['inherit', 'inherit', 'inherit']});
//         execSync(`${droplet_ssh} "sudo apt install maven -y ; export PATH=/opt/apache-maven-3.8.4/bin:$PATH"`, {stdio: ['inherit', 'inherit', 'inherit']});

//         //await new Setup().sshIntoVM(`cd iTrust2-v10/iTrust2/ && mvn package `,processor);
//         //await new Setup().sshIntoVM(` scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -q -i ".ssh/web-srv" ~/iTrust2-v10/iTrust2/target/iTrust2-10.jar ${configFile_droplet.name}@${configFile_droplet.publicIP}:~ `,processor);
        
//         //execSync(`${droplet_ssh} "java -jar iTrust2-10.jar"`, {stdio: ['inherit', 'inherit', 'inherit']});

// /*
//            // await new Setup().sshIntoVM(`${droplet_ssh} touch sample.txt`,processor);
//            //execSync(`${droplet_ssh} "sudo apt update"`, {stdio: ['inherit', 'inherit', 'inherit']}); 
//         //    execSync(`${droplet_ssh} "sudo apt-cache search tomcat"`, {stdio: ['inherit', 'inherit', 'inherit']});
//         //    execSync(`${droplet_ssh} "sudo apt install tomcat9 tomcat9-admin -y"`, {stdio: ['inherit', 'inherit', 'inherit']}); 
//         //    execSync(`${droplet_ssh} "sudo systemctl enable tomcat9"`, {stdio: ['inherit', 'inherit', 'inherit']}); 
//         //    execSync(`${droplet_ssh} "sudo ufw allow from any to any port 8080 proto tcp"`, {stdio: ['inherit', 'inherit', 'inherit']});
//            execSync(`${droplet_ssh} "sudo apt-get install -qq -y debconf-utils"`, {stdio: ['inherit', 'inherit', 'inherit']});
           
//            execSync(`${droplet_ssh} "sudo apt install mysql-server -y"`, {stdio: ['inherit', 'inherit', 'inherit']}); 
//            execSync(`${droplet_ssh} "echo "mysql-server mysql-server/root_password password {{mysql_pass}}" | sudo debconf-set-selections"`, {stdio: ['inherit', 'inherit', 'inherit']}); 
//            execSync(`${droplet_ssh} "echo "mysql-server mysql-server/root_password_again password {{mysql_pass}}" | sudo debconf-set-selections"`, {stdio: ['inherit', 'inherit', 'inherit']});
//            execSync(`${droplet_ssh} "sudo systemctl start mysql"`, {stdio: ['inherit', 'inherit', 'inherit']});
//            execSync(`${droplet_ssh} "sudo apt install default-jre -y"`, {stdio: ['inherit', 'inherit', 'inherit']});
//            execSync(`${droplet_ssh} "sudo apt install openjdk-11-jdk -y"`, {stdio: ['inherit', 'inherit', 'inherit']});
//            execSync(`${droplet_ssh} "sudo apt install maven -y ; export PATH=/opt/apache-maven-3.8.4/bin:$PATH"`, {stdio: ['inherit', 'inherit', 'inherit']});
//            //execSync(`${droplet_ssh} "scp -i web-srv "`, {stdio: ['inherit', 'inherit', 'inherit']}); 
//            //execSync(`${droplet_ssh} "scp -i web-srv filename root@ip:~"`, {stdio: ['inherit', 'inherit', 'inherit']});
//            //execSync(`${droplet_ssh} "java -jar iTrust2-10.jar"`, {stdio: ['inherit', 'inherit', 'inherit']});

           
//            // await new Setup().sshIntoVM(`sudo apt update`,processor);
//             // await new Setup().sshIntoVM(`sudo apt install tomcat9 tomcat9-admin -y`,processor);
//             // await new Setup().sshIntoVM(`sudo systemctl enable tomcat9`,processor);
//             // await new Setup().sshIntoVM(`${droplet_ssh} sudo ufw allow from any to any port 8080 proto tcp`,processor);
//             // await new Setup().sshIntoVM(`${droplet_ssh} sudo apt install mysql-server -y`,processor);

//             */

//         }, delayInMilliseconds);

//     }

//     catch (e) 
//     {
//         console.log(e);
//     }



}


exports.handler = async argv => {
    const { job_name, processor } = argv;
    var dropletName1 = "sshubha-green";
	var region = "nyc1"; // Fill one in from #1
	var imageName = "ubuntu-20-04-x64"; // Fill one in from #2
    var dropletName2 = "sshubha-blue";

    let sshFingerprint = await sshGeneration.generateSSH();

    await provisionDroplet(dropletName1, region, imageName, sshFingerprint, processor)
    //  setTimeout(async function(){
    //     await provisionDroplet(dropletName2, region, imageName, sshFingerprint, processor)
    //  }, 300000)

    await provisionDroplet(dropletName2, region, imageName, sshFingerprint, processor)    
    // let myPromise = new Promise(async function(myResolve, myReject){
        
    // })

    // myPromise.then(
    
    // )
    
    

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