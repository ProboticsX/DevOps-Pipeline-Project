# CHECKPOINT-M1.md

### What progress we have made ✅
This section aims to explain about the current progress that we have successfully completed uptill now.

- Firstly, we all read the project M1 description carefully and opened issues on github accordingly. Moreover, we assigned each team member some issue task to be completed so that we all can make regular progress in our work 👨‍🎓💡

![image](https://media.github.ncsu.edu/user/22719/files/1f51240f-978a-44f4-9719-344c29b04638)


- After cloning the Pipeline-Template repo, we decided to complete ```pipeline init``` part first. So, we provisioned VM named ```pipeline``` 💻 (using bakerx command). Please note that we also did setup ```npm``` inside our project repo as well.

<img width="680" alt="image" src="https://media.github.ncsu.edu/user/24819/files/500feaaf-b4c3-47ed-a697-cd6a2c31f247">


![image](https://media.github.ncsu.edu/user/22719/files/9de3f823-ccc2-4a7b-8ec2-9c72725f252c)

- After running the ```pipeline```, we stored the configuration settings of the VM like ```"Host","HostName","Port"``` inside ```lib\config.json```.


- We also made some progress ⬆️ on ```pipeline build``` by configuring ```commands\build.yml``` by installing some of the dependencies required for running ```iTrust``` (still in progress) inside VM such as:
  
  ```
  setup: 
  - sudo apt-get update -y
  - sudo apt-get install default-jre -y
  - sudo apt-get install default-jdk -y
  - sudo apt-get install git wget -y
  - sudo apt-get install mysql-server -y
  - rm -rf itrust
  - wget https://github.ncsu.edu/engr-csc326-staff/iTrust2-v10.git -P itrust
  ```
  
  <img width="551" alt="image" src="https://media.github.ncsu.edu/user/24819/files/2635c049-0156-4208-936c-4a44e8c4f5b0">


### What challenges we had and what we learned from them 😎

- Synchronous execution of ```bakerx``` commands
  - Intially while executing the commands ```bakerx pull focal cloud-images.ubuntu.com``` and then ```bakerx run pipeline focal --ip 192.168.56.10``` ,the later command was not waiting for the previous one to be completely executed.
  - Hence, we ran both the commands using ```childprocess.execSync()``` function.
 
- Working with ```config.json```
  - After storing the ```pipeline``` configurations inside ```config.json```, we were not able to read from the file properly since writing/reading content synchronously.
  - We learnt that we can solve this issue by using ```js-yaml```.

- Issue with ```js-yaml```
  - Intially we were encountering this error, which we tried to solve using ```sudo apt-get install js-yaml``` but were unsucessful.
  
  <img width="566" alt="image" src="https://media.github.ncsu.edu/user/24819/files/a54fca21-ad1b-46fa-b061-94803d4d13fd">
  
  - We solved this error by installing the latest version of ```js-yaml``` using ```npm i "js-yaml"@latest```


### Team Contributions 👥	

  - Created the VM using ```bakerx``` and ```ubuntu focal image```
  - Faced challenged in working with synchronous execution of ```bakerx``` commands and solve the issue.
  - Extract and stored information related to the VM connection in ```config.json```.
  - Solved the issue of reading/writing the content in a synchronous manner. 
  - Worked on setting up the enviornment for the build.yaml

### Project board 🗒️

 <img width="900" alt="image" src="https://media.github.ncsu.edu/user/22460/files/22d6adee-487f-44c8-a8df-0fc93cd38ff3">


### Future - Work to be done 🕛

  - Complete the setup block in ```build.yml``` to include sql setup and maven commands
  - Design the ```build.yml``` to include commands to build iTrust in the virtual machine
  - Store the required secrets in the ```.env``` file.
  - Update project boards accordingly
  - Take a screencast of the implementation
  - Update the project report
   

## Contributors

<table>
  <tr>
    <td align="center"><a href="https://github.ncsu.edu/jshah7"><img src="https://avatars.github.ncsu.edu/u/24819?s=400&u=280e70d782addeea586714773e95b8766e098f95"width="75px;" alt=""/ ><br /><sub><b>Jay Shah</b></sub></a></td>
    <td align="center"><a href="https://github.ncsu.edu/nkotche"><img src="https://avatars.github.ncsu.edu/u/22460" width="75px;" alt=""/><br /><sub><b>Neha Kotcherlakota</b></sub></a><br /></td>
    <td align="center"><a href="https://github.ncsu.edu/sshubha"><img src="https://avatars.github.ncsu.edu/u/22719" width="75px;" alt=""/><br /><sub><b>Shubham Shubham</b></sub></a><br /></td>
  </tr>
</table>
