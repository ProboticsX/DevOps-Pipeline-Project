const chalk = require('chalk');
const path = require('path');
const os = require('os');

const got = require('got');
const http = require('http');
const httpProxy = require('http-proxy');
const fs = require('fs');

exports.command = 'serve';
exports.desc = 'Run traffic proxy.';
exports.builder = yargs => {};

exports.handler = async argv => {
    const { } = argv;

    (async () => {

        await run( );

    })();

};


var droplet_file_name = ["sshubha-green","sshubha-blue"]

let configFile_droplet = fs.readFileSync(droplet_file_name[0]+'_dropletContent.json', (err) => {
    if (err) {
        console.error(err);
        return;
    }
});

let configFile_droplet_green = JSON.parse(configFile_droplet);
const GREEN = `http://${configFile_droplet_green.publicIP}:8080/iTrust2`;


configFile_droplet = fs.readFileSync(droplet_file_name[1]+'_dropletContent.json', (err) => {
    if (err) {
        console.error(err);
        return;
    }
});

let configFile_droplet_blue = JSON.parse(configFile_droplet);
const BLUE  = `http://${configFile_droplet_blue.publicIP}:8080/iTrust2`;

global.TARGET = GREEN;

var count = 0;
class Production
{
    constructor()
    {
        //this.TARGET = GREEN;
        this.count = 0;
        setInterval(this.healthCheck.bind(this), 5000 );

    }

    // TASK 1: 
    proxy()
    {
        let options = {};
        let proxy   = httpProxy.createProxyServer(options);
        let self = this;
        // Redirect requests to the active TARGET (BLUE or GREEN)
        let server  = http.createServer(function(req, res)
        {
            // callback for redirecting requests.
            proxy.web( req, res, {target: TARGET } );
        });
        server.listen(3090);
   }

   failover()
   {
      TARGET = BLUE;
   }

   async healthCheck()
   {

      try 
      {
        let response = null;

        setTimeout(async function(){
            if(response == null){
                console.log("-----------Switching to BLUE SERVER---------------")
                TARGET = BLUE;
            }
        }, 5000)

        response = await got(TARGET, {throwHttpErrors: false});
        let status = response.statusCode == 200 ? chalk.green(response.statusCode) : chalk.red(response.statusCode);
        console.log( chalk`{grey Health check on ${TARGET}}: ${status}`);

       if(response.statusCode == 200){
           count = count+1;
       }

       console.log("Count:", count);

       if(TARGET==GREEN && (response.statusCode == 500)){
           this.failover();
       }

      }
      catch (error) {
         console.log(error);
      }

   }
   
}

async function run() {

    console.log(chalk.keyword('pink')('Starting proxy on localhost:3090'));

    let prod = new Production();
    prod.proxy();

}