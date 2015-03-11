describe('angularjs homepage', function(){
	it('add words to cloud', function() {
	browser.get('http://localhost:9000/#/word-cloud');

	//find and fill in textbox
	var items,
		startCount

	var inputField = element(by.id('topic_title'));
	inputField.clear();
	inputField.sendKeys('Drake');
	startCount = words.count();
	var wordCloud = element(by.id('wordCloud'));
	var words = wordCloud.all(by.repeater('word in words'));
	var Submit = element(by.css('.btn'));
	Submit.click();
	
	inputField.sendKeys('Beatles');
	var addToWCButton = element(by.id('addToWC'));
	addToWCBUtton.click();

	expect(words.count()).toEqual(startCount+1);
	});
});
