#!/bin/bash

# start the webapp
cd ~/Downloads &&
grunt serve &&

# start the testing serve
gnome-terminal --working-directory="$HOME/" &&
webdriver-manager start &&

# start the black box testing 
gnome-terminal --working-directory="$HOME/protractor-testing/protractor-white-box-testing" &&
protractor conf.js