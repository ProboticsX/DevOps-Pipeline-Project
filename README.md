# README.md (F0-nkotche)

The commands used for running the Angular Project are as follows:

``` 
pipeline init
pipeline build angular-build angular-build.yml
pipeline test angular-build.yml
pipeline code-coverage angular-build.yml
pipeline prod up
pipeline deploy inventory angular-deploy angular-build.yml
```


The commands used for running the Java Project are as follows:

``` 
pipeline init
pipeline build java-build java-build.yml
pipeline test java-build.yml
pipeline code-coverage java-build.yml
pipeline prod up
pipeline deploy inventory java-deploy java-build.yml
```
