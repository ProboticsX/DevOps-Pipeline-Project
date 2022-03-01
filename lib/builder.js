const {spawn, execSync} = require('child_process');
const chalk = require('chalk');
class Builder{
    async buildAndProvisionVM() {
        let sshExe = `bakerx pull focal cloud-images.ubuntu.com`;
        let vm_run = `bakerx run pipeline focal --ip 192.168.56.10`;
        let vm_ssh = `bakerx ssh pipeline`;
        execSync(sshExe, {stdio: ['inherit', 'inherit', 'inherit']});
        execSync(vm_run, {stdio: ['inherit', 'inherit', 'inherit']});
        // spawn('sh', ['-c', vm_ssh],{stdio: 'inherit'}, (error, stdout, stderr) => {

        //     console.log(error || stderr);
        //     console.log(`stdout',${stdout}`);
    
        // });
        let vm_info = `bakerx ssh-info --format config pipeline`;
        let info = execSync(vm_info).toString();
        console.log(info);
    }
    
}

module.exports = new Builder();