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
1000 mutations completed

![WhatsApp Image 2022-04-17 at 10 15 26 AM](https://media.github.ncsu.edu/user/22719/files/d35eef28-4cd8-4ab0-8ee0-7a6c3bc34484)


mutation folder: https://github.ncsu.edu/CSC-DevOps-S22/DEVOPS-18/tree/M2/mutation

result file: https://github.ncsu.edu/CSC-DevOps-S22/DEVOPS-18/blob/M2/result

***Note***: Make sure that ```.env``` file is in the below format:
```
Git_Token = <ENTER GITHUB TOKEN>
mySQL_passwd = <ENTER MYSQL PASSWORD>
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

### File Structure 📁
```
-> referenceSnaps
 -> ref_long.png
 -> ref_upload.png
 -> ref_variations.png
 -> ref_survey.png
 
-> mutations
  -> upload
     -> 1.png
     -> 2.png
     -> 3.png
  -> long
     -> 1.png
     -> 2.png
     -> 3.png
  -> variations
     -> 1.png
     -> 2.png
     -> 3.png
  -> survey
     -> 1.png
     -> 2.png
     -> 3.png
   ...
```


### Team Contributions 👥	


### Project board 🗒️

![image](https://media.github.ncsu.edu/user/22719/files/3cbd4639-9cc8-4bcb-abd2-820857fa45eb)
   
### Screencast

Link: https://youtu.be/pzoK56wi7xw

## Contributors

<table>
  <tr>
    <td align="center"><a href="https://github.ncsu.edu/jshah7"><img src="https://avatars.github.ncsu.edu/u/24819?s=400&u=280e70d782addeea586714773e95b8766e098f95"width="75px;" alt=""/ ><br /><sub><b>Jay Shah</b></sub></a></td>
    <td align="center"><a href="https://github.ncsu.edu/nkotche"><img src="https://avatars.github.ncsu.edu/u/22460" width="75px;" alt=""/><br /><sub><b>Neha Kotcherlakota</b></sub></a><br /></td>
    <td align="center"><a href="https://github.ncsu.edu/sshubha"><img src="https://avatars.github.ncsu.edu/u/22719" width="75px;" alt=""/><br /><sub><b>Shubham Shubham</b></sub></a><br /></td>
  </tr>
</table>
