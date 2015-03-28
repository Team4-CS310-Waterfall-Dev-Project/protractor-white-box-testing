describe('angularjs homepage', function(){
	it('add words to cloud', function() {
	browser.get('http://localhost:9000/#/word-cloud');

	//find and fill in textbox
	var items,
		startCount

	var inputField = element(by.id('topic_title'));
	inputField.clear();
	inputField.sendKeys('Drake');
	var wordCloud = element(by.id('wordCloud'));
	var words = wordCloud.all(by.repeater('word in words'));
	startCount = words.count();
	
	
	var submit = element(by.css('.btn'));
	submit.click();
	
	inputField.sendKeys('Beatles');
	var addToWCButton = element(by.id('addToWC'));
	addToWCButton.click();

	expect(words.count()).toEqual(startCount+1);
	});
});
