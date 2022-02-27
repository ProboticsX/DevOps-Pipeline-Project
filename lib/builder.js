const {spawn, execSync} = require('child_process');
const chalk = require('chalk');
class Builder{
    async buildAndProvisionVM() {
        let sshExe = `bakerx pull focal cloud-images.ubuntu.com`;
        let vm_run = `bakerx run pipeline focal`;
        let vm_ssh = `bakerx ssh pipeline`;
        execSync(sshExe, {stdio: ['inherit', 'inherit', 'inherit']});
        execSync(vm_run, {stdio: ['inherit', 'inherit', 'inherit']});
        spawn('sh', ['-c', vm_ssh],{stdio: 'inherit'}, (error, stdout, stderr) => {

            console.log(error || stderr);
            console.log(`stdout',${stdout}`);
    
        });
       
    }
    
}

module.exports = new Builder();