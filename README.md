# README.md (Deployment)

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

- Error in capturing the snapshot in ```screenshot.js```
  - While rendering the ```.js``` file after applying the mutations, we were not able to capture the snapshot of the changed ```.js``` file because of some syntax error since we applied some mutations in the file.
  - Hence, we resolved the error using the ```try/catch``` clause so that the syntax error doesn't close the whole process.
  
- Rendering the 4 files using ```final.sh```
  - The challenge faced here was while rendering the four files given to us, there was a major challenge in handling the ouputs for each iteration in ```build.yml```
  - As a result, the whole logic for handling mutations was done in ```final.sh```

- Using ```git reset --hard```
  - The issue faced here was that we were creating the ```marqdown-mod.js``` everytime we were running iteration.
  - Hence, we used ```git reset --hard``` to revert the changed ```.js``` to its original state.


### Team Contributions 👥	


### Project board 🗒️

![image](https://media.github.ncsu.edu/user/22719/files/3cbd4639-9cc8-4bcb-abd2-820857fa45eb)
   
### Screencast

Link: https://youtu.be/AtTSL8XV8nE

## Contributors

<table>
  <tr>
    <td align="center"><a href="https://github.ncsu.edu/jshah7"><img src="https://avatars.github.ncsu.edu/u/24819?s=400&u=280e70d782addeea586714773e95b8766e098f95"width="75px;" alt=""/ ><br /><sub><b>Jay Shah</b></sub></a></td>
    <td align="center"><a href="https://github.ncsu.edu/nkotche"><img src="https://avatars.github.ncsu.edu/u/22460" width="75px;" alt=""/><br /><sub><b>Neha Kotcherlakota</b></sub></a><br /></td>
    <td align="center"><a href="https://github.ncsu.edu/sshubha"><img src="https://avatars.github.ncsu.edu/u/22719" width="75px;" alt=""/><br /><sub><b>Shubham Shubham</b></sub></a><br /></td>
  </tr>
</table>
