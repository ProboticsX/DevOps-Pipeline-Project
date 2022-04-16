# README.md (Mutation Coverage)

### What progress we have made ✅
This section aims to explain about the current progress that we have successfully completed after continuing from the M1.md

- We have made changes to our project to utilise only one VM ```pipeline``` and dropped the idea of using ```ansible```
- The provisioning and configuring of computing environment for ```pipeline``` was done successfully.
- We performed the 1000 iterations using random mutation operators.
- Triggering of build job ```pipeline build mutation-coverage build.yml``` was done successfully 
- The result for each mutation involved details such as operator changed, pixel differences, line changed and the final result.

The commands used for running the project are as follows:

``` 
pipeline init
pipeline build mutation-coverage build.yml
```
 <-----------SS showing 1000 iterations were completed successfully---------------->
 <-----------SS showing result.json---------------->

***Note***: Make sure that you've set up the ```Git_Token``` and ```mySQL_passwd``` in ```.env``` file.

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
