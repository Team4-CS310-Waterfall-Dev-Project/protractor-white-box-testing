#!/bin/bash

# start the webapp
gnome-terminal --working-directory="$HOME/Downloads" -e --command="grunt serve" &&

#wait for webapp to start up
sleep 10 &&

# start the testing serve
gnome-terminal --working-directory="$HOME/" -e --command="webdriver-manager start" &&


#wait for testing server to start up
sleep 5 &&

# start the black box testing
# attempting to write output to a text file
gnome-terminal --working-directory="$HOME/protractor-testing/protractor-white-box-testing" -e --command="protractor conf.js" &&

#wait for black box testing to finish
sleep 20 && 

# TODO start the white box testing
phpunit --coverage-text --bootstrap onlyGenerateWC.php wordCloudJSONTest.php