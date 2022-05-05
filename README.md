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

**BUILD**:

![image](https://media.github.ncsu.edu/user/22719/files/aaf19475-1522-46c1-83aa-1ab631341004)

**TEST**:

![image](https://media.github.ncsu.edu/user/22719/files/4cfc3fec-f789-41d5-b9c9-e3578e957bf4)


**DEPLOY**:

![image](https://media.github.ncsu.edu/user/22719/files/d02711ab-91d7-407b-8105-42c28b2e1e3b)

  
**ANALYSIS:**

  - codeacy
  
  With a single command you can:

  Get static code analysis issues, complexity, duplication and other code metrics
  Run a tool or the whole suite of supported tools by Codacy
  Use the tools' default patterns, your configuration files or your settings saved on Codacy
  
  The metrics data is printed for each file and contains 5 types of data:

  LOC - Lines of Code
  CLOC - Commented Lines of Code
  CC - Cyclomatic Complexity
  #methods - Number of methods
  #classes - Number of classes
  
  The command used was:
  ```
  sudo codacy-analysis-cli analyze --tool metrics --directory ~/angular-demo-travelapp/
  ```

![image](https://media.github.ncsu.edu/user/22719/files/7ca3af4e-3cc7-4ff2-9c94-0a46684953ea)

  - cloc

The ```cloc``` tool helped me in analysing all the different files that were present in the project. Moreover, it was language independent.
The commands used for installing ```cloc``` was: 
```
sudo apt-get install cloc
```

![image](https://media.github.ncsu.edu/user/22719/files/ea738c81-3bdd-468b-a795-dea45a1d904d)

  - PMD

The tool utlisized mainly for analysing the ```java``` applications. The command used was:

```
./run.sh pmd -d ~/spring-petclinic/src/main/java/org/springframework/samples/petclinic/ -f text -R rulesets/java/quickstart.xml
```
 
![image](https://media.github.ncsu.edu/user/22719/files/4b801532-b04d-49ee-aa5f-894ea8cfe252)


### Challenges faced 😎

- Error in setting up the dependencies for ```codeacy```.
  - The major problem I faced in this was that this tool required the installation of ```docker``` that I didn't know earlier.
  - Hence, I resolved the error by installing ```docker``` on the ```deploy-vm``` using the commands given in the [blog](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)
   
### Screencast for Project 1

Link: https://youtu.be/y6c-LGoUSbc


# Project 2 - Angular-Demo-Travel App

### Tasks Completed ✅

This section aims to explain about the progress that I have successfully completed after continuing from the M3 for Project-2:

- The build, test and deploy commands for ```pipeline``` were run successfully and the VM ```deploy-vm``` was setup successfully.
- BUILD: Setting up of dependencies for the VM was done successfully. The ```.jar``` file was created using ```mvn package```. Some of the dependencies are:
```
 npm, n, angular-cli, ng
```
- TEST: The testing of the application was done succesffully in the VM using ``` ng test```.
- DEPLOY: The deployment of the application was done on the ```droplet-blue``` and ```droplet-green``` successfully. The packages needed to be installed on the droplets were as follows:
```
openssh, nginx
```
- STATIC-CODE ANALYSIS (Extra Feature): The static code analysis of the application was done successfully. Some of the tools used for the same are as follows:
```
codacy-analysis-cli
cloc
esprima
```

The commands used for running the project are as follows:

``` 
pipeline init
pipeline build angular-build build.yml
pipeline prod up
pipeline deploy inventory angular-deploy build.yml
pipeline test angular-test build.yml
pipeline analysis angular-analysis build.yml
```

**BUILD**:

![Screenshot 2022-05-04 220312](https://media.github.ncsu.edu/user/22719/files/c19baeb6-2040-40a3-8282-695a81be9e60)


**TEST**:

![Screenshot 2022-05-04 220523](https://media.github.ncsu.edu/user/22719/files/0cad8304-6a38-437a-b54c-883bb3a6e9a5)


**DEPLOY**:

![Screenshot 2022-05-04 220436](https://media.github.ncsu.edu/user/22719/files/3720bdf0-4f42-40a1-a515-b917a0a790ba)

  
**ANALYSIS**:

- ESLint: 
  
  The tool used for analyzing and finding errors in the angular applications. The command used here was:
  ```
  ng lint
  ```

![Screenshot 2022-05-04 220642](https://media.github.ncsu.edu/user/22719/files/82e5875f-bcce-4d88-83a3-695cd7da930a)

- Esprima:

The requirement mainly used for ```javascript``` projects. I was able to find the number of import packages and strings in the application.

![Screenshot 2022-05-04 220722](https://media.github.ncsu.edu/user/22719/files/34b0d148-6332-4653-8bb6-7a0fc694cea6)

- cloc

The ```cloc``` tool helped me in analysing all the different files that were present in the project. Moreover, it was language independent.
The commands used for installing ```cloc``` was: 
```
sudo apt-get install cloc
```

![Screenshot 2022-05-04 220759](https://media.github.ncsu.edu/user/22719/files/090f0f76-c77e-48f7-9ec6-46286dc91ad2)

- codacy:

Similar to as explained above

![Screenshot 2022-05-04 221035](https://media.github.ncsu.edu/user/22719/files/4b9c321c-85e8-4c9d-a709-97054dc33c63)


  
### Challenges faced 😎
   
   The major challenge I faced was finding the appropriate analyzing tool for angular projects. Although, ```EsLint``` and ```Esprima``` are good tools but their outcome was not enough to meet the requirements of the analysis. Hence, I was able to solve this challenge by using ```codacy``` tool that created the whole metrics for the application and it was language independent.
   
### Screencast for Projcet 2

Link: https://youtu.be/LdOikAhylHA


### Important Links & References:

Project1 Link: https://github.com/spring-projects/spring-petclinic

Project2 Link: https://github.com/nivmprasad/angular-demo-travelapp

Codelacy: https://github.com/codacy/codacy-analysis-cli

ESLint: https://github.com/angular-eslint/angular-eslint#readme

PMD: https://github.com/pmd/pmd

***Note***: Make sure that ```.env``` file is in the below format:
```
Git_Token = <ENTER GITHUB TOKEN>
mySQL_passwd = <ENTER MYSQL PASSWORD>
DO_TOKEN = <ENTER DROPLET TOKEN>
```

## Contributor

<table>
  <tr>
    <td align="center"><a href="https://github.ncsu.edu/sshubha"><img src="https://avatars.github.ncsu.edu/u/22719" width="75px;" alt=""/><br /><sub><b>Shubham Shubham</b></sub></a><br /></td>
  </tr>
</table>
