# README.md (Final Exam)

# Project 1 - Spring-Pet Clinic

### What progress we have made ✅


This section aims to explain about the current progress that we have successfully completed after continuing from the M2.md

- The provisioning and configuring of computing environment for ```pipeline``` was done successfully.
- Creation of ```.jar``` file for iTrut deployment is done successfully.
- Creation of blue and green droplets using the ``` pipeline prod up``` is done successfully.
- ```inventory.json``` file to save the dropet information is created successfully.
- Triggering of build job ```pipeline deploy inventory itrust-deploy build.yml``` is done successfully.
- Deployment of iTrust using the blue-green stratergy is done successfully.

The commands used for running the project are as follows:

``` 
pipeline init
pipeline build itrust-build build.yml
pipeline prod up
pipeline deploy inventory itrust-deploy build.yml
```
Blue-Green droplets created

<img width="577" alt="image" src="https://media.github.ncsu.edu/user/24819/files/14f05545-1867-4f7d-9b2e-f7a767199494">

iTrust running on Green Server

<img width="565" alt="image" src="https://media.github.ncsu.edu/user/24819/files/1d39b8ab-8e84-493f-ac97-8b51df164354">

iTrust running on Blue Server

<img width="563" alt="image" src="https://media.github.ncsu.edu/user/24819/files/14e837a7-9e14-4aaf-8782-b6e5b3d9c1c5">




***Note***: Make sure that ```.env``` file is in the below format:
```
Git_Token = <ENTER GITHUB TOKEN>
mySQL_passwd = <ENTER MYSQL PASSWORD>
DO_TOKEN = <ENTER DROPLET TOKEN>
```
### What challenges we had and what we learned from them 😎

- Error in installing the dependencies in droplet via a vm 
  - We initially tried to install the necessary dependdencies for iTrust in a droplet via a vm. However, multiple times there were connection time out error, or connection refused errors, we evene tried to use await and a promise.
  - Hence, we resolved the error by installing the dependencies in the droplet from the host machine, instead of double ssh into droplet.
  
- Exporting the iTrust project in a ```.jar``` or ```.war```
  - The challenge faced here was that the ```.war``` file was created, but the issues arises with the new version of iTrust, and setting the correct path of Tomcat.
  - As a result, we chose to use the ```.jar``` file to deploy iTrust.

- Creation of proxy server for blue-green deployment
  - The issue faced here was that we were creating the proxy server, however there were issues with ip masking, for blue-green deployment.
  - Hence, this was solved by properly using the proxy server and resolving the errors in it, so as to properly mask the ips.


### Team Contributions 👥	


### Project board 🗒️

<img width="1434" alt="Screenshot 2022-05-02 at 11 10 18 PM" src="https://media.github.ncsu.edu/user/22460/files/77bbf262-73d1-45c1-ac4c-b9a3f4993ff6">

   
### Screencast

Link: https://www.youtube.com/watch?v=9W2khgoUpmc

## Contributors

<table>
  <tr>
    <td align="center"><a href="https://github.ncsu.edu/jshah7"><img src="https://avatars.github.ncsu.edu/u/24819?s=400&u=280e70d782addeea586714773e95b8766e098f95"width="75px;" alt=""/ ><br /><sub><b>Jay Shah</b></sub></a></td>
    <td align="center"><a href="https://github.ncsu.edu/nkotche"><img src="https://avatars.github.ncsu.edu/u/22460" width="75px;" alt=""/><br /><sub><b>Neha Kotcherlakota</b></sub></a><br /></td>
    <td align="center"><a href="https://github.ncsu.edu/sshubha"><img src="https://avatars.github.ncsu.edu/u/22719" width="75px;" alt=""/><br /><sub><b>Shubham Shubham</b></sub></a><br /></td>
  </tr>
</table>
