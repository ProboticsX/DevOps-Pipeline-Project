const {execSync} = require('child_process');
const fs = require('fs');
const yaml = require('js-yaml');

class Setup{
    async sshIntoVM(command) {
        let configFile = fs.readFileSync('lib/config.json', (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });

        configFile = JSON.parse(configFile);
        let vm_ssh = `ssh -i "${configFile.IdentityFile}" ${configFile.user}@${configFile.HostName} -p ${configFile.Port} -o StrictHostKeyChecking=no `;
        console.log('vm ssh :::',vm_ssh,':::',command);


        execSync(`${vm_ssh} ${command}`, {stdio: ['inherit', 'inherit', 'inherit']});
        
    }

    async setupVM(){
        try {
            const doc = yaml.load(fs.readFileSync('commands/build.yml', 'utf8'));
    
            let jdoc = JSON.stringify(doc);
            jdoc = JSON.parse(jdoc);
            let setup_cmds = jdoc.setup;
            
            console.log(jdoc,jdoc.setup);
            for(let i=0; i< setup_cmds.length;i++){
                let command = setup_cmds[i];
                await this.sshIntoVM(command);                
            }
    
            } catch (e) {
                console.log(e);
            }
    }
    
}

module.exports = new Setup();