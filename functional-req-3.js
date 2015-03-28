describe('pub list', function() {
    var wordCloud = element(by.id('wordCloud'));
    var words = wordCloud.all(by.repeater('word in words'));  
    var pubs = element(by.id('pub-list')).all(by.repeater('pub in pubs'));

    const wordCloudURL = 'http://localhost:9000/#/word-cloud';
    const pubListURL = 'http://localhost:9000/#/pub-list';
    

    //again, it would be ideal to have a function to randomly test
    //elements in the large array, but we'll hand select the sample
    it('should be able to select any word in the word cloud and the user should be directed to the pubs page', function(){
        browser.get(wordCloudURL);
        //test only if a sample are clickable
        //since it is not feasible to test all
        words.get(0).click();
        expect(browser.getCurrentUrl()).toBe(pubListURL);

        //go back and do it again
        browser.navigate().back();
        words.get(2).click();
        expect(browser.getCurrentUrl()).toBe(pubListURL);        

        //and again
        browser.navigate().back();
        words.last().click();
        expect(browser.getCurrentUrl()).toBe(pubListURL);
    });


    it('should include the titles of all the pubs in which this word appears', function(){
        browser.get(pubListURL);
        
        //get all the pubs from the API by the authors and
        // then see which ones have the word in them and if they're all displayed

        //human oracle rather than an automated process
        var chosenWord = 'sweet';
        var authorsEntered = ['50 cent', 'niel diamond','Lynyrd Skynyrd'];
        var pubsWithSweetInThem = [1,2,3,4,5];
        //testing the length of the pubs list rather than the actual content of the list
        expect(pubsWithSweetInThem.length).toEqual(pubs.length);
    });


    it('should show the number of appearances of this word in the researchs', function(){
        browser.get(pubListURL);
        
        //count up the appearances of a word in a sample researchs
        //don't have time for -- human oracle

        //for sweet home alabama sweet apears 10 xs
        var numSweet = 10;
        expect(pubs.first().evaluate('pub.occurences')).toBe(numSweet);
    });

    it('should display the pubs in decreasing order in which this word appears', function(){
        browser.get(pubListURL);

        //loop through all pubs & check if sorted in decreasing order
        var arepubsInDecreasingOrder = true;
        var lastpubOccurances = Number.MAX_VALUE;
        var currentIndex = 0;
        while(currentIndex < pubs.count()){
            if(pubs.get(currentIndex).evaluate('pub.occurances') > lastpubOccurances){
                arepubsInDecreasingOrder = false;
                break;
            }
            lastpubOccurances = pubs.get(currentIndex).evaluate('pub.occurances');
            currentIndex = currentIndex + 1;
        }
        expect(arepubsInDecreasingOrder).toBe(true);

    });

});
