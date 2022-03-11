const {execSync} = require('child_process');
const fs = require('fs');
const vm_details  =require('../lib/detailsOfVm.json')
const chalk = require('chalk');
const setup_server = require('./setupServer');



class Builder{

    async setupVM(vmName,ipName){
        let vm_pull = 'bakerx pull focal cloud-images.ubuntu.com';
        let vm_run = `bakerx run ${vmName} focal --ip ${ipName} --sync --memory 4096`;

        execSync(vm_pull, {stdio: ['inherit', 'inherit', 'inherit']});
        execSync(vm_run, {stdio: ['inherit', 'inherit', 'inherit']});

        let vm_info = `bakerx ssh-info --format config ${vmName}`;
        let info = execSync(vm_info);
        let jsonObject = {};
        info.toString().trim().split(/\r?\n/).forEach(result => {
            if(result.trim().length > 0){
                let line = result.trim().split(" ");
                jsonObject[line[0]] = line[1];
            }
        });
    
        let json_content = JSON.stringify(jsonObject);
        let file_name = vmName+"config.json"
        fs.writeFileSync(`${file_name}`, json_content, 'utf8', function (error) {
            if (error) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(error);
            }
        });
        
        console.log( chalk.yellow(file_name + " saved!") );
    }

    async installAnsible(fileName){
        let cmd1 = '"sudo add-apt-repository ppa:ansible/ansible"';
        let cmd2 = '"sudo apt-get update"';
        let cmd3 = '"sudo apt-get install ansible -y"';
        
        await setup_server.sshIntoServer("Installing ansible repo",cmd1,fileName);
        await setup_server.sshIntoServer("Installing ansible repo",cmd2,fileName);
        await setup_server.sshIntoServer("Installing ansible repo",cmd3,fileName);

        execSync(`ssh -q -i  "~/.bakerx/insecure_private_key" -p 2002 -o StrictHostKeyChecking=no vagrant@127.0.0.1 "ping -c 5 -w 5 192.168.56.10"`, {stdio: ['inherit', 'inherit', 'inherit']}, (error, stdout, stderr)=>{
            console.log(error || stderr);
            console.log(stdout);
        });
    }


    async runBuild(job_name, build_yaml){
        let command = `ssh -q -i  "~/.bakerx/insecure_private_key" -p 2003 -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null vagrant@127.0.0.1 'ansible-playbook ${build_yaml} --tags "${job_name}" -i ${process.env.bakerx_path} -e "gituser=${process.env.gituser}" -e "buildyamlpath=${build_yaml}" -e "gitpass=${process.env.gitpass}" -e "url=${process.env.url}" -e "destdir=${process.env.destdir}" -e "mysql_pass=${process.env.mysql_pass}"'`;
        execSync(`${command}`, {stdio: ['inherit', 'inherit', 'inherit']}, (error, stdout, stderr)=>{
            console.log(error || stderr);
            console.log(stdout);
        });
    }

    async buildAndProvisionVM() {

        let nameWeb = vm_details['webName'];
        let ipWeb = vm_details['webIP'];
        let ipConfig = vm_details['configIP'];
        let nameConfig = vm_details['configName'];

        console.log( chalk.yellow("Setting up Web server") );
        await this.setupVM(nameWeb,ipWeb);

        console.log( chalk.yellow("Setting up Config server", ipConfig, nameConfig) );
        await this.setupVM(nameConfig,ipConfig);
        
        console.log( chalk.yellow("Setting up Config server:::") );
        await setup_server.serverSetup(nameWeb,nameConfig);
        await this.installAnsible(nameConfig+"config.json");
    }
    
}

module.exports = new Builder();