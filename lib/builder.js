const {execSync} = require('child_process');
const fs = require('fs');
const setup = require('../lib/setup');
const vm_details  =require('../lib/detailsOfVm.json')
const chalk = require('chalk');



class Builder{

    async setupWin(vmName,ipName){
        let sshExe = 'bakerx pull focal cloud-images.ubuntu.com';
        let vm_run = `bakerx run ${vmName} focal --ip ${ipName} --sync`;

        execSync(sshExe, {stdio: ['inherit', 'inherit', 'inherit']});
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

        let jsonContent = JSON.stringify(jsonObject);
        let fileName = "lib/"+vmName+"config.json"
        fs.writeFileSync(fileName, jsonContent, 'utf8', function (error) {
            if (error) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(error);
            }
        });
        
        console.log( chalk.yellow(fileName+" saved!") );
    }

    async buildAndProvisionVM() {

        let nameWeb = vm_details['web_server_name'];
        let ipWeb = vm_details['web_server_static_ip'];
        let nameConfig = vm_details['cfg_server_name'];
        let ipConfig = vm_details['cfg_server_static_ip'];

        console.log( chalk.yellow("Setting up Web server") );
        await this.setupWin(nameWeb,ipWeb);

        console.log( chalk.yellow("Setting up Config server") );
        await this.setupWin(nameConfig,ipConfig);

        // let sshExe = `bakerx pull focal cloud-images.ubuntu.com`;
        // let vm_run = `bakerx run pipeline focal --ip 192.168.56.10`;
        // execSync(sshExe, {stdio: ['inherit', 'inherit', 'inherit']});
        // execSync(vm_run, {stdio: ['inherit', 'inherit', 'inherit']});
        // let vm_info = `bakerx ssh-info --format config pipeline`;
        // let info = execSync(vm_info);
        // let jsonObject = {};
        // info.toString().trim().split(/\r?\n/).forEach(result => {
        //     if(result.trim().length > 0){
        //         let line = result.trim().split(" ");
        //         jsonObject[line[0]] = line[1];
        //     }
        // });
        // let jsonContent = JSON.stringify(jsonObject);
        // fs.writeFileSync("lib/config.json", jsonContent, 'utf8', function (error) {
        //     if (error) {
        //         console.log("An error occured while writing JSON Object to File.");
        //         return console.log(error);
        //     }
        // });
        //setup.setupVM();
    }
    
}

module.exports = new Builder();