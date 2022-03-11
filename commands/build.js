const chalk = require('chalk');
const path = require('path');
const builder = require('../lib/builder');

exports.command = 'build <job_name> <build_yaml>';
exports.desc = 'Prepare tool';
exports.builder = yargs => {
    yargs.options({
    });
};

exports.handler = async argv => {
    const { job_name, build_yaml } = argv;
    console.log(chalk.green(job_name, build_yaml));
    await builder.runBuild(job_name, build_yaml);
};
