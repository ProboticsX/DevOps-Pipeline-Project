# README.md (F0)

### What progress I have made ✅
This section aims to explain about the current progress that we have successfully completed after continuing from the M3.md

- The new feature has been successfully deployed on top of the orginal pipeline.
- Two different open source project has been used
  - One - Django Web App
  - Two - React App
- The django project has been deployed on green server, where as the react app has been deployed on the blue server.
- The new feature of** Monitoring** has been implemented on top of the current pipeline.
- The monitor droplet is used to for the Monitoring pipeline.

The commands used for running the project are as follows:

``` 
pipeline init
pipeline build itrust-build build.yml
pipeline build F0_build build.yml
pipeline test F0_test build.yml
pipeline prod up
pipeline deploy inventory F0_deploy build.yml
pipeline deploy inventory monitor-deploy build.yml
pipeline deploy inventory django_stats build.yml
pipeline build vehicle-build build.yml
pipeline test vehicle-test build.yml
pipeline deploy inventory vehicle-deploy build.yml
pipeline deploy inventory react_stats build.yml

```

- The F0 is the django webapp
- The vehicle is the react app
- Seperate jobs for building and testing are used


### Project 1 : Django App

BUILD : ```F0_build``` is used

<img width="581" alt="image" src="https://media.github.ncsu.edu/user/24819/files/081fa0ab-f3cd-41a9-9a0d-9821dad4476c">

TEST : Another ```pipeline test``` is used for testing

<img width="581" alt="image" src="https://media.github.ncsu.edu/user/24819/files/7de2e7a5-9e87-41c5-9518-d188a7f9da9b">

DEPLOY: Running the Django App on green droplet, ```F0_deploy``` is used

<img width="943" alt="F0" src="https://media.github.ncsu.edu/user/24819/files/a82748dd-308b-4508-a372-9d4989011a6d">

The Django App communicating with the monitoring server

<img width="550" alt="image" src="https://media.github.ncsu.edu/user/24819/files/e326bb3b-9e6f-401d-9f0c-43fe6f9eadfc">

Test statistics of the Django App, ```django_stats``` is used

<img width="596" alt="image" src="https://media.github.ncsu.edu/user/24819/files/6b351c93-206f-4fe3-9d3c-5738abf77bc3">


### Project 2 : React App

BUILD: ```vehicle-build``` is used

<img width="514" alt="image" src="https://media.github.ncsu.edu/user/24819/files/9419a8ae-7803-4ef0-8bcd-e287cf5af727">

TEST : Another ```pipeline test``` is used for testing

<img width="497" alt="image" src="https://media.github.ncsu.edu/user/24819/files/2b115d23-9f4c-40b1-b1d4-1055930599ca">

DEPLOY: Running the react App on green droplet, ```vehicle-deploy``` is used

<img width="943" alt="React" src="https://media.github.ncsu.edu/user/24819/files/2ddf271f-8c7a-4bd0-ba74-eaa43cfb8079">

The React App communicating with the monitoring server

<img width="508" alt="image" src="https://media.github.ncsu.edu/user/24819/files/91481542-4b0a-4c25-a7c3-ae954eec0c58">


Test statistics of the react App, ```react_stats``` is used

<img width="608" alt="image" src="https://media.github.ncsu.edu/user/24819/files/195d8ee0-648d-4c49-8caf-a3821bb145f7">



### Monitoring Feature 

Creation of monitor dashboard which is used to show the statistics of both the projects

<img width="569" alt="image" src="https://media.github.ncsu.edu/user/24819/files/37fedfad-3e2e-40c4-b798-e5cb357105df">

Creation of all three droplets

<img width="759" alt="droplets" src="https://media.github.ncsu.edu/user/24819/files/bef84937-fa47-44f7-a535-60926deb4a09">

The monitoring dashboard deployed on monitor droplet

<img width="947" alt="monitor" src="https://media.github.ncsu.edu/user/24819/files/fbf664ec-078e-464e-8723-8399d015e99c">


The statistics used for monitoring are

- CPU %
- Memory %
- Latency (ms)
- HTTP response
- Trend

***Note***: Make sure that ```.env``` file is in the below format:
```
Git_Token = <ENTER GITHUB TOKEN>
mySQL_passwd = <ENTER MYSQL PASSWORD>
DO_TOKEN = <ENTER DROPLET TOKEN>
```

### Screencast

Link: https://youtu.be/U3rms5h79nM

## Contributors

<table>
  <tr>
    <td align="center"><a href="https://github.ncsu.edu/jshah7"><img src="https://avatars.github.ncsu.edu/u/24819?s=400&u=280e70d782addeea586714773e95b8766e098f95"width="75px;" alt=""/ ><br /><sub><b>Jay Shah</b></sub></a></td>
  </tr>
</table>
