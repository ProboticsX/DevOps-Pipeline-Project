# README.md

### What progress we have made ✅
This section aims to explain about the current progress that we have successfully completed after continuing from the M1.md

- We have made changes to our project to utilise only one VM ```pipeline``` and dropped the idea of using ```ansible```
- To run ansible, we created two VMs named **ansible** and **pipeline**. ansible is used as host VM and pipeline is used to run the build.
- In ```pipeline.init``` we create the VMs using the  ```bakerx``` comnand. 

 <img width="958" alt="image" src="https://media.github.ncsu.edu/user/24819/files/1230cad0-4e93-4089-9df7-7f2ac9048ec2">

- We set up the keys for the VMs so that the communication between the VMs is seemless.
- We then, run the ansible install commands 
  ```
  - sudo add-apt-repository ppa:ansible/ansible
  - sudo apt-get update
  - sudo apt-get install ansible -y
  ```
  ![Screenshot (74)](https://media.github.ncsu.edu/user/24819/files/f6a78518-959d-4b6a-b89c-d00af2f8469f)

  
- After the ansible installation, we run the ansible playbook named **build.yml**
-  In the build.yml file, the dependencies required for iTrust are downloaded
-  The following dependencies are downloaded
   ```
   - Node.js
   - wget
   - git
   - maven
   - jdk 11
   - mysql
   - mvn
   ```
   ![Screenshot (76)](https://media.github.ncsu.edu/user/24819/files/ce35eb1b-60a3-412c-ac5e-bf3622f8f33c)

-  To clone iTrust from github, github access tokens is used
-  Also the password required for mySQL is taken from the ```.env``` file
-  Then finally to build iTrust and all run all test, the following command is used ```pipeline build iTrust-build /bakerx/lib/build.yml```

![image](https://media.github.ncsu.edu/user/24819/files/5109908e-142f-43d3-b980-2e2473a163cd)


### What challenges we had and what we learned from them 😎

- Running Ansible in Windows
  - Ansible is available for Windows, but only as a client, we wanted to run ansible as a host, so to overcome this challenge we created two VMs and used one VM as a host ```ansible``` and the other VM as web server ```pipeline```

- Cloning iTrust using Ansible
  - The challenge faced here was in cloning the ```iTrust``` repo that required the user name and password to be specified while running the command which we neither wanted to disclose nor did we wanted to put in ```.env```
  - Hence, we used the GitHub token to pass it as a password hence we were able to overcome this challenge.

- Setting up password for SQL
 - The major requirement for setting up iTrust is the installation of ```mysql``` which needs username and password to be passed from ```.env```. Finally, we were able to set the mysql password through ```my.cnf.j2``` plugin.

```
 - name: copy .my.cnf file with mysql root password credentials
    become: yes
    template: src=my.cnf.j2 dest=/root/.my.cnf owner=root mode=0600
    tags: iTrust-build
```


### Team Contributions 👥	


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
