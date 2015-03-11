# protractor-white-box-testing
Testing functional requirements of Implementation using Protractor


#instructions for setup and testing
1a) import Group4Testing.ova  
1b) in terminal cd protractor-testing/protractor-white-box-testing  
1c) ./testingScript.sh  
1d) The shell script will create 4 terminal windows: 1 will contain the output of protractor black box tests and another the phpunit white box tests. The other 2 are running the webapp and a server for protractor testing. 


# if the above instractions fail

2a) open up terminal
2b) cd Downloads
2c) grunt serve

3a) open a new terminal window
3b) webdriver-manager start

4a) open a new terminal window
4b) cd protractor-testing/protractor-white-box-testing
4c) protractor conf.js
