const {execSync} = require('child_process');
const fs = require("fs");
const axios    = require("axios");
const chalk  = require('chalk');


class GenerateSSH{

    async generateSSH(){    
        
        await execSync("rm -rf web-srv", {stdio: ['inherit', 'inherit', 'inherit']});

        await execSync("rm -rf web-srv.pub", {stdio: ['inherit', 'inherit', 'inherit']});

        let ssh_command = `ssh-keygen -t rsa -b 4096 -C "web-srv" -f web-srv -N ""`;

        await execSync(ssh_command, {stdio: ['inherit', 'inherit', 'inherit']});

        return this.getContents();
    }

    async getContents(){
        let ssh_contents = fs.readFileSync("web-srv.pub", 'utf8');

        return this.getFingerprint(ssh_contents);
    }

    async getFingerprint(ssh_data){

        let configuration = {};

        configuration.token = process.env.DO_TOKEN;

        let headers = {};

        headers =
        {
            'Content-Type':'application/json',
            Authorization: 'Bearer ' + configuration.token
        };


        let data = {};
        data = {
            "public_key": ssh_data,
            "name": "My SSH Public Key"
        }

        console.log('header', headers);

        console.log('data', data);

        let response = await axios.post("https://api.digitalocean.com/v2/account/keys", 
		data,
		{
			headers: headers,
		}).catch( err => 
			console.error(chalk.red(`getFingerprint: ${err}`)) 
		);

        if( !response ) return;

		console.log('status',response.status);
		console.log('data',response.data);
		
        let ssh_fingerprint = response.data.ssh_key.fingerprint;
        return ssh_fingerprint;
    }

}

module.exports = new GenerateSSH();