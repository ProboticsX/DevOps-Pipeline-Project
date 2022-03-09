const child_process = require('child_process');
const chalk = require('chalk');
//const sshcmd = require('./ssh');
const fs = require('fs');
const exec = require('child_process').exec;


class config_setup{

 async ssh_command(name_command,cmd,vm_info) {
    console.log(chalk.green("Executing ", name_command));
   //let name = "lib//" + `${fileName}`;
    console.log(chalk.yellow(`${vm_info}`));
    // let sshConfig = fs.readFileSync(`${vm_info}`, (err) => {
    //     if (err) {
    //         console.error(err);
    //         return;
    //     }
    // });
    // sshConfig = JSON.parse(sshConfig);
    //child_process.execSync("pwd", {stdio: ['inherit', 'inherit', 'inherit']});
    let sshConfig = await fs.readFileSync(`${vm_info}`);
    sshConfig = JSON.parse(sshConfig);
    //console.log(chalk.yellow(sshConfig));
    let sshExe = `ssh -i "${sshConfig.IdentityFile}" -p ${sshConfig.Port} -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${sshConfig.user}@${sshConfig.HostName}`;
    console.log( chalk.yellow(`${sshExe} ${cmd}`) );
    //console.log(chalk.red("error"));
    //console.log(`${cmd}`);
    child_process.execSync(`${sshExe} ${cmd}`, {stdio: ['inherit', 'inherit', 'inherit']}, (error, stdout, stderr)=>{
        console.log(chalk.red("error"));
        console.log(`${cmd}`);
        console.log(error || stderr);
        console.log(stdout);
    });
}


    async setup(name_web_server,name_config_server){
        let gen_key = `ssh-keygen -t rsa -b 4096 -C "${name_web_server}" -f web-srv -N ""`
        child_process.execSync(gen_key, {stdio: ['inherit', 'inherit', 'inherit']});
        let webServerFileName = name_web_server+"config.json";
        let csServerFileName = name_config_server+"config.json";
        //console.log(csServerFileName);
        let csKey = '"cp /bakerx/web-srv .ssh/web-srv"'
        let permKey = '"cd .ssh; chmod 600 web-srv"'
        let wsKey = '"cat /bakerx/web-srv.pub >> .ssh/authorized_keys"'
        await this.ssh_command("Config server ssh key setup", csKey, csServerFileName);
        await this.ssh_command("Providing permisisons for the key", permKey, csServerFileName);         
        await this.ssh_command("Web server ssh key setup", wsKey, webServerFileName); 

        // //let check = "bakerx ssh ansible"
        // child_process.execSync(check, {stdio: ['inherit', 'inherit', 'inherit']}, (error, stdout, stderr)=>{
        //     console.log(chalk.red("error"));
        //     console.log(`${cmd}`);
        //     console.log(error || stderr);
        //     console.log(stdout);
        // });


        //child_process.execSync('ssh -q -i "~/.bakerx/insecure_private_key" -p 2003 -o StrictHostKeyChecking=no vagrant@127.0.0.1 "touch ss.txt"', {stdio: 'inherit'});
        //child.execSync(ssh -q -i )//let check = "ssh -i ~/.ssh/web-srv -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no vagrant@192.168.56.10";
         //let check = "ssh -i ~/.ssh/web-srv vagrant@192.168.56.10";
         //await this.ssh_command("Checking ssh connection", check, csServerFileName);



    }
    
}
module.exports = new config_setup();