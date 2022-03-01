const {execSync} = require('child_process');
const fs = require('fs');
const setup = require('../lib/setup');



class Builder{
    async buildAndProvisionVM() {
        let sshExe = `bakerx pull focal cloud-images.ubuntu.com`;
        let vm_run = `bakerx run pipeline focal --ip 192.168.56.10`;
        // let vm_ssh = `bakerx ssh pipeline`;
        execSync(sshExe, {stdio: ['inherit', 'inherit', 'inherit']});
        execSync(vm_run, {stdio: ['inherit', 'inherit', 'inherit']});
        let vm_info = `bakerx ssh-info --format config pipeline`;
        let info = execSync(vm_info);
        let jsonObject = {};
        info.toString().trim().split(/\r?\n/).forEach(result => {
            if(result.trim().length > 0){
                let line = result.trim().split(" ");
                jsonObject[line[0]] = line[1];
            }
        });
        let jsonContent = JSON.stringify(jsonObject);
        fs.writeFileSync("lib/config.json", jsonContent, 'utf8', function (error) {
            if (error) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(error);
            }
        });
        setup.setupVM();
    }
    
}

module.exports = new Builder();