describe('web application - search', function() {
    var inputTextField = element(by.id('topic_title'));
    var submitButton = element(by.css('.btn'));
    var autocompletejQueryBox = element(by.id('autocompletejQueryBox'));
    var autocompleteScrollbar = element(by.css('.scrollBar'));
    var albumImages = element(by.css('.albumArt'));

    var test1ExpectedValue = '';
    var test2Value = "Bob Dylan";
    var test3Value = "Bob";
    const SUGG = 5;


    //run grunt serve in the Downloads folder before running tests
    beforeEach(function(){
	   browser.get('http://localhost:9000/#/');
    });  


    it('should begin with an empty space for the word cloud to generate and an input text field for the user to search for an artist.', function(){
	   expect(inputTextField.getText()).toEqual(test1ExpectedValue);
    });


    it('should be able to search for a music artist according to the artist\'s name entered in the text field.', function(){
        //enter artist name into text box
        inputTextField.sendKeys(test2Value);

        //click submit
        submitButton.click();
    });  


    it('should provide an autocomplete field after a brief pause in the user\'s input.', function(){
        //enter artist name into text box
        inputTextField.sendKeys(test3Value);

        //wait for 5 seconds
        browser.sleep(5000);

        //test if autocomplete exists
        expect(browser.isElementPresent(autocompletejQueryBox)).toEqual(true);
    });


    it('should be able to see at most 5 suggestions at a time in the Autocomplete field.', function(){
        //test for children (suggestions) of autocomplete object
        autocompletejQueryBox.all(by.css('children')).then(function(items){
            expect(items.length).toBe(SUGG);
        });
    }); 


    it('should also have a scroll bar that will allow the user to view other matches if there are more than 5 suggestions.', function(){
        //test if autocomplete scroll bar exists
        expect(browser.isElementPresent(autocompleteScrollbar)).toEqual(true);
    }); 


    it('should have pictures for each artist to help the user recognize the artist they are looking for.', function() {
        //test for image existence
        expect(browser.isElementPresent(albumImages)).toEqual(true);
    });

});
