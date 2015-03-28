describe('researchs', function() {
    var pubs = element(by.id('pub-list')).all(by.repeater('pub in pubs'));
    var pubTitle = element(by.css('h2'));
    var pubresearchs = element(by.css('p'));
    var backBtns = element(by.id('back')).all(by.css('.backBTN'));
    var backTopubsButton = backBtns.get(0);
    var backToWordCloudButton = backBtns.get(1);

    const pubresearchsURL = 'http://localhost:9000/#/pub-researchs';
    const pubListURL = 'http://localhost:9000/#/pub-list';
    const wordCloudURL = 'http://localhost:9000/#/word-cloud';

    //again, it would be ideal to have a function to randomly test
    //elements in the large array, but we'll hand select the sample
    it('should be able to select any pub and be directed to the researchs page', function(){
        browser.get(pubListURL);
        //test only if a sample are clickable
        //since it is not feasible to test all
        pubs.get(0).click();
        expect(browser.getCurrentUrl()).toBe(pubresearchsURL);

        //go back and do it again
        browser.navigate().back();
        pubs.get(2).click();
        expect(browser.getCurrentUrl()).toBe(pubresearchsURL);        

        //and again
        browser.navigate().back();
        pubs.last().click();
        expect(browser.getCurrentUrl()).toBe(pubresearchsURL);
    });

    it('should contain the title of the pub, aligned left', function(){
        browser.get(pubresearchsURL);


        //wasn't able to find a method to test left justification
        //instead I'll see if it's location is less than the paragraph element 
        expect(pubTitle.getLocation().x < pubresearchs.getLocation.x).toBe(true);
    });


    it('should be able to go back to the pub list page or the word cloud page', function(){
        browser.get(pubresearchsURL);

        //click the back to pub button
        backTopubsButton.click();
        //verify url
        expect(browser.getCurrentUrl()).toBe(wordCloudURL);
        //go back to the pub researchs page
        browser.navigate().back();

        //click the back to word cloud button
        backToWordCloudButton.click();
        //verify url
        expect(browser.getCurrentUrl()).toBe(pubListURL);
    });

});
