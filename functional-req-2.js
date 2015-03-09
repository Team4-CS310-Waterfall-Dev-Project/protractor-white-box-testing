describe('word cloud', function() {
    var inputTextField = element(by.id('topic_title'));
    var submitButton = element(by.css('.btn'));
    var wordCloud = element(by.id('wordCloud'));
    var words = wordCloud.all(by.repeater('word in words'));

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
       var oldWord0 = String(words.get(0));
       var oldWord1 = String(words.get(words.count()/2))
       var oldWord2 = String(words.last());


       //input an artist's name
       inputTextField.sendKeys(fakeArtistInput);

       //submit
       submitButton.click();

       //check new word cloud is not same as old
       // ie an array of labels
       expect(oldWord0).toNotEqual(String(words.get(0)));
       expect(oldWord1).toNotEqual(String(words.get(words.count()/2)));
       expect(oldWord2).toNotEqual(String(words.last()));
    });


    it('should have all words in the word cloud be clickable', function(){
        //test only if a sample are clickable
        //since it is not feasible to test all
        words.get(0).click();

        //go back and do it again
        browser.navigate().back();
        words.get(2).click();

        //and again
        browser.navigate().back();
        words.last().click();

    });

    //I'm aware it would be more efficient/easier to use an 'or' for checking the values
    //but I couldn't find anything in the protractor docs that would be adequate
    it('should filter out words such as \'it\', \'the\',\'a\',\'an\' filtered out', function(){
        // since it wouldn't be feasible to test all words
        // in the word cloud, we will only test a sample
        var word0 = String(words.get(0));
        var word1 = String(words.get(words.count()/2));
        var word2 = String(words.last());

        //test if they equal a, an, it, the
        expect(word0).toNotEqual('a');
        expect(word1).toNotEqual('a');
        expect(word2).toNotEqual('a');

        expect(word0).toNotEqual('an');
        expect(word1).toNotEqual('an');
        expect(word2).toNotEqual('an');

        expect(word0).toNotEqual('it');
        expect(word1).toNotEqual('it');
        expect(word2).toNotEqual('it');

        expect(word0).toNotEqual('the');
        expect(word1).toNotEqual('the');
        expect(word2).toNotEqual('the');
    });


    it('should create a word cloud with no more than ' + WCS + ' words', function(){
        //test the length of the array of words
        // var isWordCountGreaterThanWCS = (words.count() > WCS)
        expect(words.count() <= WCS).toBe(true);
    });

});
