describe('angularjs homepage todo list', function() {
  it('should access application through web browser through a link', function() {
    browser.get('http://localhost:9000/#/word-cloud');

   expect(browser.getCurrentUrl()).toEqual('http://localhost:9000/#/word-cloud');
  });
});


