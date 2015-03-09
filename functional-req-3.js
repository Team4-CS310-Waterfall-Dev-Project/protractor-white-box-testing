describe('song list', function() {
    var wordCloud = element(by.id('wordCloud'));
    var words = wordCloud.all(by.repeater('word in words'));  

    const wordCloudURL = 'http://localhost:9000/#/word-cloud';
    const songListURL = 'http://localhost:9000/#/song-list';
    //again, it would be ideal to have a function to randomly test
    //elements in the large array, but we'll hand select the sample
    it('should be able to select any word in the word cloud and the user should be directed to the songs page', function(){
        browser.get(wordCloudURL);
        //test only if a sample are clickable
        //since it is not feasible to test all
        words.get(0).click();
        expect(browser.getCurrentUrl()).toBe(songListURL);

        //go back and do it again
        browser.navigate().back();
        words.get(2).click();
        expect(browser.getCurrentUrl()).toBe(songListURL);        

        //and again
        browser.navigate().back();
        words.last().click();
        expect(browser.getCurrentUrl()).toBe(songListURL);
    });


    // it('should be able to search for a music artist according to the artist\'s name entered in the text field.', function(){
    //     //enter artist name into text box
    //     inputTextField.sendKeys(test2Value);

    //     //click submit
    //     submitButton.click();
    // }); 


    // it('should provide an autocomplete field after a brief pause in the user\'s input.', function(){

    // });


    // it('should be able to see at most 5 suggestions at a time in the Autocomplete field.', function(){

    // }); 


    // it('should also have a scroll bar that will allow the user to view other matches if there are more than 5 suggestions.', function(){

    // }); 


    // it('should have pictures for each artist to help the use recognize the artist they are looking for.', function() {
    
    // });

});
