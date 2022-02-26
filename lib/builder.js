const {spawn} = require('child_process');

class Builder{
    async buildAndProvisionVM(){
        let sshexe = 'bakerx pull focal cloud-images.ubuntu.com';
        let vm_run = 'bakerx run pipeline focal';

        spawn('sh', ['-c', sshexe],{stdio: 'inherit'}, (error, stdout, stderr) => {

            console.log(error || stderr);
            console.log(stdout);
    
        });
    
        spawn('sh', ['-c', vm_run],{stdio: 'inherit'}, (error, stdout, stderr) => {

            console.log(error || stderr);
            console.log(stdout);
    
        });
    }
}
module.exports = new Builder();
