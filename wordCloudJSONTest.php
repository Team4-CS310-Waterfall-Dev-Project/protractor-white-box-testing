<?php


class GenerateWordCloudTest extends PHPUnit_Framework_TestCase {


	//testing that stopwordfilter words for 
	//stop words that have caps
	function testCapsLockStopWordDelete() {
		$c = new GenerateWordCloud();
		$words = array();
		array_push($words, 'DELETED');
		$stopwords = array();
		array_push($stopwords, 'deleted');
		$wordsFiltered = $c->stopWordFilter($words, $stopwords);
		$this -> assertEmpty($wordsFiltered);
	}


	//testing that a stop word is deleted
	//from words, even if it appears multiple times
	function testDoubleStopWordDelete() {
		$c = new GenerateWordCloud();
		$words = array();
		array_push($words, 'deleted');
		array_push($words, 'deleted');
		$stopwords = array();
		array_push($stopwords, 'deleted');
		$wordsFiltered = $c->stopWordFilter($words, $stopwords);
		$this -> assertEmpty($wordsFiltered);
	}

	//testing that a $words array with 2 words
	//containing one stop word returns array
	//with only one word 
	function testStopWordFilterArraySize1() {
		$c = new GenerateWordCloud();
		$words = array();
		array_push($words, 'deleted');
		array_push($words, 'deletoed');
		$stopwords = array();
		array_push($stopwords, 'deletoed');
		$wordsFiltered = $c->stopWordFilter($words, $stopwords);
		$this -> assertEquals(1, count($wordsFiltered));
	}


	//testing that an empty array is returned
	//if the $words array is empty
	function testEmptyInputArray(){
		
		$c = new GenerateWordCloud();
		$words = array();
		$stopwords = array();
		array_push($stopwords, 'deleted');
		$wordsFiltered = $c->stopWordFilter($words, $stopwords);
		$this -> assertEmpty($wordsFiltered);

	}

	//testing to make sure the frequency list
	//returns the correct frequencies for the given
	//array of words
	function testFrequencyList321(){

		$c = new GenerateWordCloud();
		$words = array();
		array_push($words, 'most');
		array_push($words, 'most');	
		array_push($words, 'most');
		array_push($words, 'average');
		array_push($words, 'average');
		array_push($words, 'least');
	
		$frequency_list = $c->wordFreq($words);
		$this->assertEquals(3, $frequency_list['most']);
		$this->assertEquals(2, $frequency_list['average']);
		$this->assertEquals(1, $frequency_list['least']);
		$this->assertEquals(3, count($frequency_list));
	}


	//testing to make sure if $words is empty,
	//frequency_list is also empty
	function testEmptyInputFrequencylist(){
		$words = array();
		$c = new GenerateWordCloud();
		$frequency_list = $c->wordFreq($words);
		$this->assertEmpty($frequency_list);
	}


	//test to make sure that same word with
	//different caps are still equal	
	//frequency list should be updated appropriately
	function testCapsFrequencyList321(){

		$c = new GenerateWordCloud();
		$words = array();
		array_push($words, 'MOST');
		array_push($words, 'most');	
		array_push($words, 'mOSt');
		array_push($words, 'aveRage');
		array_push($words, 'averAGE');
		array_push($words, 'leasT');
	
		$frequency_list = $c->wordFreq($words);
		$this->assertEquals(3, $frequency_list['most']);
		$this->assertEquals(2, $frequency_list['average']);
		$this->assertEquals(1, $frequency_list['least']);
		$this->assertEquals(3, count($frequency_list));
	}


	//test to make sure that words with greater
	//frequencies have larger fonts
	//also tests to make sure the word with 
	//smallest frequency is excluded (array size
	//is equal 9, not 10)
	function testWordCloudFontSizes(){
		$c = new GenerateWordCloud();

		$words = array('ten' => 10, 'nine' => 9, 'eight' => 8, 'seven' => 7, 'six' => 6, 'five' => 5, 'four' => 4, 'three' => 3, 'two' => 2, 'one' => 1);
	
		$returnCloud = $c -> word_cloud($words);
	
		$this->assertGreaterThan($returnCloud['nine'], $returnCloud['ten']);

		$this->assertGreaterThan($returnCloud['eight'], $returnCloud['nine']);

		$this->assertGreaterThan($returnCloud['seven'], $returnCloud['eight']);

		$this->assertGreaterThan($returnCloud['six'], $returnCloud['seven']);

		$this->assertGreaterThan($returnCloud['five'], $returnCloud['six']);
	
		$this->assertGreaterThan($returnCloud['four'], $returnCloud['five']);

		$this->assertGreaterThan($returnCloud['three'], $returnCloud['four']);

		$this->assertGreaterThan($returnCloud['two'], $returnCloud['three']);
	
		$this->assertEquals(9, count($returnCloud));




	}


}

?>
