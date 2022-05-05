# README.md (F0-nkotche)

### Folder Structure of the project

- The main files in the project are the javascript files that trigger the commands and the javascript files in the lib folder that contain the processing logic for the commands.
- All the commands in this folder process various projects in a generic way.
- Each project has a seperate .yaml file associated with it, that contains all the application specific commands required to run it.

### Open Source Projects chosen: 

1. Angular Application - https://github.com/DariuszWietecha/angular-jest.git
- Tech stack: Angular, Jest, Express JS
2. Java Spring Boot Application - https://github.com/springframeworkguru/springbootwebapp.git
- Tech stack: Java, Spring boot

### Additional feature

  Along with the stages done in the project milestones: M1, M2 and M3 the additional feature added is: A stage that compues the code coverage of the application that helps determine whether the application can be deployed to production

The command to trigger the new stage is:

`pipeline code-coverage <yaml-file>`

#### Feature:
- This command triggers the set of commands that are required in order compute the code coverage of the respective applications that the pipeline is triggered for
- A threshold value for the desired code coverage is to be added in the build.yaml file of the respective application.
- After the code coverage is computed, it is evaluated against the threshold set by the user.
- If we encounter a scenario where the code covered by unit tests in the application is lower than the threshold set by the user, as soon as the user attempts to trigger the deploy command, the command will be interrupted with an appropriate error message that reads: "DEPLOY NOT PERMITTED. CODE COVERAGE THRESHOLD NOT MET"
- This pipeline ensures that a user will only be allowed to deploy an application if the code coverage requirements are met.

## Project 1: Angular Application : Angular Jest

About the application:

Simple Angular 8 WebApp implements CRUD on two models: companies and categories and list companies filtered by categoryId on the home view.
Backend implemented using Express-REST 

The commands used for running the Angular Project are as follows:

``` 
pipeline init
pipeline build angular-build angular-build.yml
pipeline test angular-build.yml
pipeline code-coverage angular-build.yml
pipeline prod up
pipeline deploy inventory angular-deploy angular-build.yml
```

Running the pipeline for the app:

1. Run `pipeline init`
- Running this will trigger the commands that initialise a virtual machine by the name: f0-nkotche-vm which is required to run the Angular Application.

2. Run `pipeline build angular-build angular-build.yml`
- The build command requires 2 parameters: 
1. <job-name\> : angular-build
2. <yaml-file\> : angular-build.yml
- Running this will trigger the commands that are required to run in order to setup the virtual machines with all the dependencies required to run the application
- It then creates a build for the application
  
3. Run `pipeline test angular-build.yml`
- The build command requires 1 parameter: 
1. <yaml-file\> - angular-build.yml
- Running this will trigger all the commands that are required to run in order to test the application

4. Run `pipeline code-coverage angular-build.yml`
- The build command requires 1 parameter: 
1. <yaml-file\> - angular-build.yml
- "Note": Prior to executing this command, add a miniumum threshold value for the code coverage below which the user should not be allowed to deploy the application, in the threshold field of the 'code-coverage' job in the angular-build.yml file 
- Running this will trigger all the commands that are required to run in order to compute the code coverage of the application
  
5. Run `pipeline prod up`
- Running this will trigger all the commands that are required to run in order to create two droplets: nkotche-blue and nkotche-green

6. Run `pipeline deploy inventory angular-deploy angular-build.yml`
- The build command requires 2 parameters: 
1. <job-name\> : angular-build
2. <yaml-file\> : angular-build.yml
- Running this will trigger all the commands that are required to run in order to deploy the application on the droplets: nkotche-blue and nkotche-green

- After the application is successfully deployed, hit the api: `{{http://ip_address_of_nkotche_green_droplet}}/` and `{{http://ip_address_of_nkotche_blue_droplet}}/` in order to see the application running.


## Project 2: Java Spring Boot Application : springbootwebapp

About the application:

Simple Angular 8 WebApp implements CRUD on two models: companies and categories and list companies filtered by categoryId on the home view.
Backend implemented using Express-REST 

The commands used for running the Angular Project are as follows:

``` 
pipeline init
pipeline build angular-build angular-build.yml
pipeline test angular-build.yml
pipeline code-coverage angular-build.yml
pipeline prod up
pipeline deploy inventory angular-deploy angular-build.yml
```

Running the pipeline for the app:

1. Run `pipeline init`
- Running this will trigger the commands that initialise a virtual machine by the name: f0-nkotche-vm which is required to run the Java Spring Boot Application.

2. Run `pipeline build java-build java-build.yml`
- The build command requires 2 parameters: 
1. <job-name\> : java-build
2. <yaml-file\> : angular-build.yml
- Running this will trigger the commands that are required to run in order to setup the virtual machines with all the dependencies required to run the application
- It then creates a build for the application
  
3. Run `pipeline test java-build.yml`
- The build command requires 1 parameter: 
1. <yaml-file\> - java-build.yml
- Running this will trigger all the commands that are required to run in order to test the application

4. Run `pipeline code-coverage java-build.yml`
- The build command requires 1 parameter: 
1. <yaml-file\> - java-build.yml
- "Note": Prior to executing this command, add a miniumum threshold value for the code coverage below which the user should not be allowed to deploy the application, in the threshold field of the 'code-coverage' job in the java-build.yml file 
- Running this will trigger all the commands that are required to run in order to compute the code coverage of the application
  
5. Run `pipeline prod up`
- Running this will trigger all the commands that are required to run in order to create two droplets: nkotche-blue and nkotche-green

6. Run `pipeline deploy inventory java-deploy java-build.yml`
- The build command requires 2 parameters: 
1. <job-name\> : java-build
2. <yaml-file\> : java-build.yml
- Running this will trigger all the commands that are required to run in order to deploy the application on the droplets: nkotche-blue and nkotche-green

- After the application is successfully deployed, hit the api: `{{http://ip_address_of_nkotche_green_droplet}}/` and `{{http://ip_address_of_nkotche_blue_droplet}}/` in order to see the application running.


The commands used for running the Java Project are as follows:

``` 
pipeline init
pipeline build java-build java-build.yml
pipeline test java-build.yml
pipeline code-coverage java-build.yml
pipeline prod up
pipeline deploy inventory java-deploy java-build.yml
```


