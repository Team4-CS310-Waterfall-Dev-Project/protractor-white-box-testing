describe('lyrics', function() {
    var songs = element(by.id('song-list')).all(by.repeater('song in songs'));
    var songTitle = element(by.css('h2'));
    var songLyrics = element(by.css('p'));
    var backBtns = element(by.id('back')).all(by.css('.backBTN'));
    var backToSongsButton = backBtns.get(0);
    var backToWordCloudButton = backBtns.get(1);

    const songLyricsURL = 'http://localhost:9000/#/song-lyrics';
    const songListURL = 'http://localhost:9000/#/song-list';
    const wordCloudURL = 'http://localhost:9000/#/word-cloud';

    //again, it would be ideal to have a function to randomly test
    //elements in the large array, but we'll hand select the sample
    it('should be able to select any song and be directed to the lyrics page', function(){
        browser.get(songListURL);
        //test only if a sample are clickable
        //since it is not feasible to test all
        songs.get(0).click();
        expect(browser.getCurrentUrl()).toBe(songLyricsURL);

        //go back and do it again
        browser.navigate().back();
        songs.get(2).click();
        expect(browser.getCurrentUrl()).toBe(songLyricsURL);        

        //and again
        browser.navigate().back();
        songs.last().click();
        expect(browser.getCurrentUrl()).toBe(songLyricsURL);
    });

    it('should contain the title of the song, aligned left', function(){
        browser.get(songLyricsURL);


        //wasn't able to find a method to test left justification
        //instead I'll see if it's location is less than the paragraph element 
        expect(songTitle.getLocation().x < songLyrics.getLocation.x).toBe(true);
    });


    it('should be able to go back to the song list page or the word cloud page', function(){
        browser.get(songLyricsURL);

        //click the back to song button
        backToSongsButton.click();
        //verify url
        expect(browser.getCurrentUrl()).toBe(wordCloudURL);
        //go back to the song lyrics page
        browser.navigate().back();

        //click the back to word cloud button
        backToWordCloudButton.click();
        //verify url
        expect(browser.getCurrentUrl()).toBe(songListURL);
    });

});
