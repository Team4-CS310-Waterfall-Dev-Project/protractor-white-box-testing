describe('navigate', function(){
	
	const wordCloudURL = 'http://localhost:9000/#/word-cloud';
    const pubListURL = 'http://localhost:9000/#/pub-list';
    const pubresearchsURL = 'http://localhost:9000/#/pub-researchs';
    const mainURL = 'http://localhost:9000/#/';

    var wordCloud = element(by.id('wordCloud'));
    var words = wordCloud.all(by.repeater('word in words'));
    var backBtns = element(by.id('back')).all(by.css('.backBTN'));
    var backTopubsButton = backBtns.get(0);
    var backToWordCloudButton = backBtns.get(1);
    var submitBtn = element(by.css('.btn-lg'));
    var publication = element(by.css('.animate-repeat')).get(0);

    it('should be able to navigate between screens', function(){
        //navigate to word cloud
        browser.get(mainURL);
        submitBtn.click();
        expect(browser.getCurrentUrl()).toBe(wordCloudURL);

        //navigate back and forth between word cloud and publication list
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
    

        //navigate back toword cloud from publication list
        browser.get(pubListURL);
        backToWordCloudButton.click();
        expect(browser.getCurrentUrl()).toBe(wordCloudURL);

        //navigate to the publication research page from the publication list
        browser.get(pubListURL);
        //click on one of the publications
        publication.click();
        expect(browser.getCurrentUrl()).toBe(pubresearchsURL);


        //go back from pub research page
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