const child_process = require('child_process');
const chalk = require('chalk');
const fs = require('fs');
const exec = require('child_process').exec;


class setupServer{

 async sshIntoServer(name_command,cmd,vm_info) {
    console.log(chalk.green("Executing ", name_command));
    console.log(chalk.yellow(`${vm_info}`));
    let ssh_config = await fs.readFileSync(`${vm_info}`);
    ssh_config = JSON.parse(ssh_config);
    let ssh_cmd = `ssh -i "${ssh_config.IdentityFile}" -p ${ssh_config.Port} -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${ssh_config.user}@${ssh_config.HostName}`;
    console.log( chalk.yellow(`${ssh_cmd} ${cmd}`) );
    child_process.execSync(`${ssh_cmd} ${cmd}`, {stdio: ['inherit', 'inherit', 'inherit']}, (error, stdout, stderr)=>{
        console.log(`${cmd}`);
        console.log(error || stderr);
        console.log(stdout);
    });
}


    async serverSetup(name_web_server,name_config_server){
        let gen_key = `ssh-keygen -t rsa -b 4096 -C "${name_web_server}" -f web-srv -N ""`
        child_process.execSync(gen_key, {stdio: ['inherit', 'inherit', 'inherit']});
        let webServerFileName = name_web_server+"config.json";
        let csServerFileName = name_config_server+"config.json";
        let csKey = '"cp /bakerx/web-srv .ssh/web-srv"'
        let permKey = '"cd .ssh; chmod 600 web-srv"'
        let wsKey = '"cat /bakerx/web-srv.pub >> .ssh/authorized_keys"'
        await this.sshIntoServer("Config server ssh key setup", csKey, csServerFileName);
        await this.sshIntoServer("Providing permisisons for the key", permKey, csServerFileName);         
        await this.sshIntoServer("Web server ssh key setup", wsKey, webServerFileName);
    }
    
}
module.exports = new setupServer();