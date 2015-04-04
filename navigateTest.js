describe('navigate', functino(){
	
	const wordCloudURL = 'http://localhost:9000/#/word-cloud';
    const pubListURL = 'http://localhost:9000/#/pub-list';
    const pubresearchsURL = 'http://localhost:9000/#/pub-researchs';

        //again, it would be ideal to have a function to randomly test
    //elements in the large array, but we'll hand select the sample
    it('should be able to navigate between screens', function(){
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

});