describe('angularjs homepage', function(){
	it('show facebook share interface', function() {
	browser.get('http://localhost:9000/#/word-cloud');
	var el = element(by.id('fb_root'));
	var clickButton = element(by.css('.btn'));
	var inputField = element(by.id('topic_title'));
	inputField.clear();
	inputField.sendKeys('Drake');
	clickButton.click();
	el.click();
	expect(browser.getCurrentUrl()).toEqual('https://www.facebook.com/login.php?next=https%3A%2F%2Fwww.facebook.com%2Fsharer%2Fsharer.php%3Fapp_id%3D660864187373367%26sdk%3Djoey%26u%3Dhttps%253A%252F%252Fdevelopers.facebook.com%252Fdocs%252Fplugins%252F%26display%3Dpopup%26ref%3Dplugin%26src%3Dshare_button%26ret%3Dlogin&display=popup');
	});
});


