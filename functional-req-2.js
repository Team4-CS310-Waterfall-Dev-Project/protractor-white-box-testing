describe('word cloud', function() {
    var inputTextField = element(by.id('topic_title'));



    //run grunt serve in the Downloads folder before running tests
    beforeEach(function(){
	   browser.get('http://localhost:9000/#/');
    });  


    it('should begin with an empty space for the word cloud to generate and an input text field for the user to search for an artist.', function(){
	   expect(inputTextField.getText()).toEqual('');
    });


    // it('should be able to search for a music artist according to the artist\'s name entered in the text field.', function(){

    // }); 


    // it('should provide an autocomplete field after a brief pause in the user\'s input.', function(){

    // });


    // it('should be able to see at most 5 suggestions at a time in the Autocomplete field.', function(){

    // }); 


    // it('should also have a scroll bar that will allow the user to view other matches if there are more than 5 suggestions.', function(){

    // }); 


    // it('should have pictures for each artist to help the use recognize the artist they are looking for.', function() {
    
    // });

});
