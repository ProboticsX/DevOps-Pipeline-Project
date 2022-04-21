const chalk = require('chalk');
const pathUtil = require("path");

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
    
    await provision.initialize();
    await provision.listRegions();
    var name = "sshubha";//+os.hostname();
	var region = "nyc1"; // Fill one in from #1
	var image = "ubuntu-20-04-x64"; // Fill one in from #2
    
    await provision.createDroplet(name, region, image);

};