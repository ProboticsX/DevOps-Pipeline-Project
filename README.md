# README.md (Final Exam)

# Project 1 - Spring-Pet Clinic

### Tasks Completed ✅

This section aims to explain about the progress that I have successfully completed after continuing from the M3 for Project-1:

- The build, test and deploy commands for ```pipeline``` were run successfully and the VM ```deploy-vm``` was setup successfully.
- BUILD: Setting up of dependencies for the VM was done successfully. The ```.jar``` file was created using ```mvn package```. Some of the dependencies are:
```
java jre, java jdk, maven, git
```
- TEST: The testing of the application was done succesffully in the VM using ``` mvn clean test```.
- DEPLOY: The deployment of the application was done on the ```droplet-blue``` and ```droplet-green``` successfully. The packages needed to be installed on the droplets were as follows:
```
java, jre
```
- STATIC-CODE ANALYSIS (Extra Feature): The static code analysis of the application was done successfully. Some of the tools used for the same are as follows:
```
codacy-analysis-cli
cloc
PMD
```

The commands used for running the project are as follows:

``` 
pipeline init
pipeline build pet-build build.yml
pipeline prod up
pipeline deploy inventory pet-deploy build.yml
pipeline test pet-test build.yml
pipeline analysis pet-analysis build.yml
```

BUILD:
SsssssssssssssssS

TEST:
SsssssssssssssssS

DEPLOY:
SsssssssssssssssS
  
ANALYSIS:
SsssssssssssssssS
  

***Note***: Make sure that ```.env``` file is in the below format:
```
Git_Token = <ENTER GITHUB TOKEN>
mySQL_passwd = <ENTER MYSQL PASSWORD>
DO_TOKEN = <ENTER DROPLET TOKEN>
```

### Challenges faced 😎

- Error in setting up the dependencies for ```codelacy```.
  - The major problem I faced in this was that this tool required the installation of ```docker``` that I didn't know earlier.
  - Hence, I resolved the error by installing ```docker``` on the ```deploy-vm``` using the commands given in the [blog](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)
   
### Screencast

Link: https://www.youtube.com/watch?v=9W2khgoUpmc


# Project 2 - Angular-Demo-Travel App

### Tasks Completed ✅

This section aims to explain about the progress that I have successfully completed after continuing from the M3 for Project-1:

- The build, test and deploy commands for ```pipeline``` were run successfully and the VM ```deploy-vm``` was setup successfully.
- BUILD: Setting up of dependencies for the VM was done successfully. The ```.jar``` file was created using ```mvn package```. Some of the dependencies are:
```
java jre, java jdk, maven, git
```
- TEST: The testing of the application was done succesffully in the VM using ``` mvn clean test```.
- DEPLOY: The deployment of the application was done on the ```droplet-blue``` and ```droplet-green``` successfully. The packages needed to be installed on the droplets were as follows:
```
java, jre
```
- STATIC-CODE ANALYSIS (Extra Feature): The static code analysis of the application was done successfully. Some of the tools used for the same are as follows:
```
codacy-analysis-cli
cloc
PMD
```

The commands used for running the project are as follows:

``` 
pipeline init
pipeline build pet-build build.yml
pipeline prod up
pipeline deploy inventory pet-deploy build.yml
pipeline test pet-test build.yml
pipeline analysis pet-analysis build.yml
```

BUILD:
SsssssssssssssssS

TEST:
SsssssssssssssssS

DEPLOY:
SsssssssssssssssS
  
ANALYSIS:
SsssssssssssssssS
  

***Note***: Make sure that ```.env``` file is in the below format:
```
Git_Token = <ENTER GITHUB TOKEN>
mySQL_passwd = <ENTER MYSQL PASSWORD>
DO_TOKEN = <ENTER DROPLET TOKEN>
```

### Challenges faced 😎

- Error in setting up the dependencies for ```codelacy```.
  - The major problem I faced in this was that this tool required the installation of ```docker``` that I didn't know earlier.
  - Hence, I resolved the error by installing ```docker``` on the ```deploy-vm``` using the commands given in the [blog](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)
   
### Screencast

Link: https://www.youtube.com/watch?v=9W2khgoUpmc








### Links:

Project1 Link: https://github.com/spring-projects/spring-petclinic
Project2 Link: https://github.com/nivmprasad/angular-demo-travelapp
Codelacy: https://github.com/codacy/codacy-analysis-cli


## Contributors

<table>
  <tr>
    <td align="center"><a href="https://github.ncsu.edu/sshubha"><img src="https://avatars.github.ncsu.edu/u/22719" width="75px;" alt=""/><br /><sub><b>Shubham Shubham</b></sub></a><br /></td>
  </tr>
</table>
