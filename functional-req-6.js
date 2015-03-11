describe('angularjs homepage', function(){
	var el = element(by.css('.fb-share-button'));
	var clickButton = element(by.css('.btn'));
	var inputField = element(by.id('topic_title'));

	it('show facebook share interface', function() {
		browser.get('http://localhost:9000/#/word-cloud');
		
		//tried waiting on the facebook button to load -- no results still
		
		inputField.clear();
		inputField.sendKeys('Drake');
		clickButton.click();
		el.click();
		expect(browser.getCurrentUrl()).toContain('www.facebook.com');
	});
});


