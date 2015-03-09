describe('word cloud', function() {
    var inputTextField = element(by.id('topic_title'));
    var submitButton = element(by.css('.btn'));
    var wordCloud = element(by.id('wordCloud'));
    var words = wordCloud.all(by.css('.child'));

    var fakeArtistInput = 'Billy Joel';
    var expectedWordsInWordCloud = 'piano';
    const WCS = 250;

    //run grunt serve in the Downloads folder before running tests
    beforeEach(function(){
	   browser.get('http://localhost:9000/#/word-cloud');
    });  


    it('should have a submit button for the user', function(){
	   expect(browser.isElementPresent(submitButton)).toEqual(true);
    });


    it('should generate a new word cloud based on the user\'s input sorted by the frequency of words in the lyrics of the artist entered', function(){
       //get the old word cloud
       var oldWords = words;

       //input an artist's name
       inputTextField.sendKeys(fakeArtistInput);

       //submit
       submitButton.click();

       //check new word cloud is not same as old
       // ie an array of labels
       expect(oldWords).toNotEqual(words);
    });


    it('should have all words in the word cloud be clickable', function(){
        //test only if a sample are clickable
        //since it is not feasible to test all


    });


    it('should filter out words such as \'it\', \'the\',\'a\',\'an\' filtered out', function(){
        // since it wouldn't be feasible to test all words
        // in the word cloud, we will only test a sample

        //test if they equal a, an, it, the

    });


    it('should create a word cloud with no more than ' + WCS + ' words', function(){
        //test the length of the array of words
    });

});
