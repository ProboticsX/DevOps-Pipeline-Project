const {execSync, childProcess} = require('child_process');
const fs = require('fs');
const setup = require('../lib/setup');
const vm_details  =require('../lib/detailsOfVm.json')
const chalk = require('chalk');
const config_setup = require('../lib/server_setup');
const delay = ms => new Promise(res => setTimeout(res, ms));

//const { ssh_command } = require('../lib/server_setup');



class Builder{

    async setupWin(vmName,ipName){
        let sshExe = 'bakerx pull focal cloud-images.ubuntu.com';
        let vm_run = `bakerx run ${vmName} focal --ip ${ipName} --sync`;

        execSync(sshExe, {stdio: ['inherit', 'inherit', 'inherit']});
        execSync(vm_run, {stdio: ['inherit', 'inherit', 'inherit']});

        let vm_info = `bakerx ssh-info --format config ${vmName}`;
        let info = execSync(vm_info);
       // console.log(chalk.yellow(`${vm_info}`));
        let jsonObject = {};
        info.toString().trim().split(/\r?\n/).forEach(result => {
            if(result.trim().length > 0){
                let line = result.trim().split(" ");
                jsonObject[line[0]] = line[1];
            }
        });
    
        let jsonContent = JSON.stringify(jsonObject);
        let fileName = vmName+"config.json"
        fs.writeFileSync(`${fileName}`, jsonContent, 'utf8', function (error) {
            if (error) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(error);
            }
        });
        
        console.log( chalk.yellow(fileName+" saved!") );
        // let configFile = fs.readFileSync("pipelineconfig.json", (err) => {
        //     if (err) {
        //         console.error(err);
        //         return;
        //     }
        // });
        
        // configFile = JSON.parse(configFile);
        // console.log(configFile.Host);
        // //await this.installAnsible(fileName);

        //await this.SetUpInventory(configFile);
        //console.log(chalk.yellow("Inventory has been saved"));
    }

    async installAnsible(fileName){
        let cmd1 = '"sudo add-apt-repository ppa:ansible/ansible"';
        let cmd2 = '"sudo apt-get update"';
        let cmd3 = '"sudo apt-get install ansible -y"';
        
        await config_setup.ssh_command("Installing ansible repo",cmd1,fileName);
        await config_setup.ssh_command("Installing ansible repo",cmd2,fileName);
        await config_setup.ssh_command("Installing ansible repo",cmd3,fileName);

      
      // execSync(`ssh -q -i  "~/.bakerx/insecure_private_key" -p 2002 -o StrictHostKeyChecking=no vagrant@127.0.0.1 "ip a"`, {stdio: 'inherit'});
        execSync(`ssh -q -i  "~/.bakerx/insecure_private_key" -p 2002 -o StrictHostKeyChecking=no vagrant@127.0.0.1 "ping -c 5 -w 5 192.168.56.10"`, {stdio: ['inherit', 'inherit', 'inherit']}, (error, stdout, stderr)=>{
            console.log(error || stderr);
            console.log(stdout);
        });
        execSync(`ssh -q -i "~/.bakerx/insecure_private_key" -p 2003 -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null vagrant@127.0.0.1 "ansible-playbook /bakerx/lib/build.yml -i /bakerx/inventory"`, {stdio: ['inherit', 'inherit', 'inherit']}, (error, stdout, stderr)=>{
            console.log(error || stderr);
            console.log(stdout);
        });




    }

    // async SetUpInventory(fileName){

    //     let configFile = fs.readFileSync(fileName, (err) => {
    //         if (err) {
    //             console.error(err);
    //             return;
    //         }
    //     });

    //     configFile = JSON.parse(configFile);
    //     let ip = "192.168.56.100"
    //     let path = "~/.ssh/web-srv"
    //     let Inventory = `[web]\n${ip} ansible_ssh_user=${configFile.user} ansible_ssh_private_key_file=${path}\n[web:vars]\nansible_ssh_common_args='-o StrictHostKeyChecking=no'\nansible_python_interpreter=/usr/bin/python3`
    //     fs.writeFileSync('inventory',Inventory);

    // //     let resolve = 'ping 192.168.56.10'
    // //     execSync( `${resolve}`, {stdio: ['inherit', 'inherit', 'inherit']}, (error, stdout, stderr)=>{
    // //        console.log(error || stderr);
    // //        console.log(stdout);
    // //    });

    //    // let ping = `ansible all -m ping -i inventory`;
    //    // await config_setup.ssh_command("Inventory create",ping,)
    //     // execSync( `${ping}`, {stdio: ['inherit', 'inherit', 'inherit']}, (error, stdout, stderr)=>{
    //     //     console.log(error || stderr);
    //     //     console.log(stdout);
    //     // });

        
    // }

    async buildAndProvisionVM() {

        let nameWeb = vm_details['web_server_name'];
        let ipWeb = vm_details['web_server_static_ip'];
        let nameConfig = vm_details['cfg_server_name'];
        let ipConfig = vm_details['cfg_server_static_ip'];

        console.log( chalk.yellow("Setting up Web server") );
        await this.setupWin(nameWeb,ipWeb);

        console.log( chalk.yellow("Setting up Config server") );
        await this.setupWin(nameConfig,ipConfig);
        
        await config_setup.setup(nameWeb,nameConfig);
        await this.installAnsible(nameConfig+"config.json");

        //setup.setupVM();
    }
    
}

module.exports = new Builder();