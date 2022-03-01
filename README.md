# CHECKPOINT-M1.md

### What progress we have made ✅
This section aims to explain about the current progress that we have successfully completed uptill now.

- Firstly, we all read the project M1 description carefully and opened issues on github accordingly. Moreover, we assigned each team member some issue task to be completed so that we all can make regular progress in our work 👨‍🎓💡

![image](https://media.github.ncsu.edu/user/22719/files/1f51240f-978a-44f4-9719-344c29b04638)


- After cloning the Pipeline-Template repo, we decided to complete ```pipeline init``` part first. So, we provisioned VM named ```pipeline``` 💻 (using bakerx command). Please note that we also did setup ```npm``` inside our project repo as well.

![image](https://media.github.ncsu.edu/user/22719/files/9de3f823-ccc2-4a7b-8ec2-9c72725f252c)

- After running the ```pipeline```, we stored the configuration settings of the VM like ```"Host","HostName","Port"``` inside ```lib\config.json```.

<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<            SS REQUIRED           >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

- We also made some progress ⬆️ on ```pipeline build``` by configuring ```commands\build.yml``` by installing some of the dependencies required for running ```iTrust``` (still in progress) inside VM such as:
  
  ```
  setup: 
  - sudo apt-get update -y
  - sudo apt-get install default-jre -y
  - sudo apt-get install default-jdk -y
  - sudo apt-get install git wget -y
  - sudo apt-get install mysql=8.0.28 -y
  - rm -rf itrust
  - wget https://github.ncsu.edu/engr-csc326-staff/iTrust2-v10.git -P itrust
  ```

### What challenges we had and what we learned from them 😎
