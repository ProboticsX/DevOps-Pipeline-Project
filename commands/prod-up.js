const chalk = require('chalk');
const pathUtil = require("path");

const sshGeneration = require('../generate-ssh.js');

const provision = require('../provision.js');


exports.command = 'prod up';
exports.desc = 'Prepare tool';
exports.builder = yargs => {
    yargs.options({
    });
};

exports.handler = async argv => {
    const { processor } = argv;

    console.log(chalk.green("Preparing docker builder image"));

    let sshFingerprint = await sshGeneration.generateSSH();

    var dropletName = "sshubha";//+os.hostname();
	var region = "nyc1"; // Fill one in from #1
	var imageName = "ubuntu-20-04-x64"; // Fill one in from #2
    
    await provision.init(dropletName, region, imageName, sshFingerprint);

};