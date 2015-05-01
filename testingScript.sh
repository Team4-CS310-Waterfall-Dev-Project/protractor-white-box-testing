#!/bin/bash

# start the webapp
gnome-terminal --working-directory="$HOME/Downloads" -e --command="grunt serve" &&

#wait for webapp to start up
sleep 10 &&

# start the testing serve
gnome-terminal --working-directory="$HOME/" -e --command="webdriver-manager start" &&


#wait for testing server to start up
sleep 5 &&

# start the unit testing
gnome-terminal --working-directory="$HOME/protractor-testing/protractor-white-box-testing" -e --command="phpunit --coverage-text --bootstrap wordCloudForTest.php wordCloudTests.php"
