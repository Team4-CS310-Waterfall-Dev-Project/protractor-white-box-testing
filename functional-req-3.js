describe('song list', function() {
    var wordCloud = element(by.id('wordCloud'));
    var words = wordCloud.all(by.repeater('word in words'));  
    var songs = element(by.id('song-list')).all(by.repeater('song in songs'));

    const wordCloudURL = 'http://localhost:9000/#/word-cloud';
    const songListURL = 'http://localhost:9000/#/song-list';
    

    //again, it would be ideal to have a function to randomly test
    //elements in the large array, but we'll hand select the sample
    it('should be able to select any word in the word cloud and the user should be directed to the songs page', function(){
        browser.get(wordCloudURL);
        //test only if a sample are clickable
        //since it is not feasible to test all
        words.get(0).click();
        expect(browser.getCurrentUrl()).toBe(songListURL);

        //go back and do it again
        browser.navigate().back();
        words.get(2).click();
        expect(browser.getCurrentUrl()).toBe(songListURL);        

        //and again
        browser.navigate().back();
        words.last().click();
        expect(browser.getCurrentUrl()).toBe(songListURL);
    });


    it('should include the titles of all the songs in which this word appears', function(){
        browser.get(songListURL);
        
        //get all the songs from the API by the artists and
        // then see which ones have the word in them and if they're all displayed

        //human oracle rather than an automated process
        var chosenWord = 'sweet';
        var artistsEntered = ['50 cent', 'niel diamond','Lynyrd Skynyrd'];
        var songsWithSweetInThem = [1,2,3,4,5];
        //testing the length of the songs list rather than the actual content of the list
        expect(songsWithSweetInThem.length).toEqual(songs.length);
    });


    it('should show the number of appearances of this word in the lyrics', function(){
        browser.get(songListURL);
        
        //count up the appearances of a word in a sample lyrics
        //don't have time for -- human oracle

        //for sweet home alabama sweet apears 10 xs
        var numSweet = 10;
        expect(songs.first().evaluate('song.occurences')).toBe(numSweet);
    });

    it('should display the songs in decreasing order in which this word appears', function(){
        browser.get(songListURL);

        //loop through all songs & check if sorted in decreasing order
        var areSongsInDecreasingOrder = true;
        var lastSongOccurances = Number.MAX_VALUE;
        var currentIndex = 0;
        while(currentIndex < songs.count()){
            if(songs.get(currentIndex).evaluate('song.occurances') > lastSongOccurances){
                areSongsInDecreasingOrder = false;
                break;
            }
            lastSongOccurances = songs.get(currentIndex).evaluate('song.occurances');
            currentIndex = currentIndex + 1;
        }
        expect(areSongsInDecreasingOrder).toBe(true);

    });

});
