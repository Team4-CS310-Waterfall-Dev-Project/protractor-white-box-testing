<?php


class GenerateWordCloudTest extends PHPUnit_Framework_TestCase {

	function ensureAttributesAPICall(){
		$this->assertClassHasAttribute('stopwords', 'APICall');
		 $this->assertClassHasAttribute('scholarRequest', 'APICall');
		
	}




	//@covers APICall::__construct
	function testQueryAppend() {
		$c = new APICall("check");
		$this->assertEquals($c->scholarRequest, "http://ieeexplore.ieee.org/gateway/ipsSearch.jsp?querytext=check");

	}

	//@covers APICall:theCall
	function testBadQuery(){
		$c = new APICall("THISSHOULDNTWORKEEJEJ");
		$w = $c->theCall();
		$data = $w->data;
		$names = $w->names;
		//print_r($data);
		$this->assertEquals(count($data), 0);
		$this->assertEquals(count($names), 0);
	}


	//@covers APICall:theCall
	function testGoodQuery(){
		$c = new APICall("(java OR C++)");
		$w = $c->theCall();
		$data = $w->data;
		$names = $w->names;
		$this->assertGreaterThan(0, count($data));
		$this->assertGreaterThan(0, count($names));
	}

	//testing that stopwordfilter works for 
	//stop words that have caps
	/**
	 * @covers GenerateWordCloud::stopWordFilter
	 */
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
	/**
	 * @covers GenerateWordCloud::stopWordFilter
	 */
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
	/**
	 * @covers GenerateWordCloud::stopWordFilter
	 */ 
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
	/**
	 * @covers GenerateWordCloud::stopWordFilter
	 */
	function testEmptyInputArray(){
		
		$c = new GenerateWordCloud();
		$words = array();
		$stopwords = array();
		array_push($stopwords, 'deleted');
		$wordsFiltered = $c->stopWordFilter($words, $stopwords);
		$this -> assertEmpty($wordsFiltered);

	}


	/**
	 *@runInSeparateProcess
	 */
	public function testHeader(){

		header("Access-Control-Allow-Origin: *");

	}



	//testing to make sure the frequency list
	//returns the correct frequencies for the given
	//array of words
	/**
	 * @covers GenerateWordCloud::wordFreq
	 */
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
	/**
	 * @covers GenerateWordCloud::wordFreq
	 */
	function testEmptyInputFrequencylist(){
		$words = array();
		$c = new GenerateWordCloud();
		$frequency_list = $c->wordFreq($words);
		$this->assertEmpty($frequency_list);
	}


	//test to make sure that same word with
	//different caps are still equal	
	//frequency list should be updated appropriately
	/**
	 * @covers GenerateWordCloud::wordFreq
	 */
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


	//tests to make sure count_select_word 
	//is not case sensitive when count word frequency
	/**
	 * @covers APICall::count_select_word
	 */
	function testCapCountSelectWord(){
	
	$abstract = "find the needle NEEDLE needle in the haystack";

	$a = new APICall("needle");	

	$f = (int)$a->count_select_word($abstract, $a->searchQuery);

	$this->assertEquals($f, 4);
	
	}


	//tests to make sure count_select_word 
	//returns 1 when the word is not found
	//in the abstract or when there is no
	//abstract
	/**
	 * @covers APICall::count_select_word
	 */
	function testNoCountSelectWord(){
	
	$abstract = "find the needle NEEDLE needle in the haystack";

	$a = new APICall("goat");	

	$f = (int)$a->count_select_word($abstract, $a->searchQuery);

	$this->assertEquals($f, 1);

	$ab = " ";
	$g = (int)$a->count_select_word($ab, $a->searchQuery);
	
	$this->assertEquals($g, 1);
	}





	//test to make sure that words with greater
	//frequencies have larger fonts
	//also tests to make sure the word with 
	//smallest frequency is excluded (array size
	//is equal 9, not 10)
	/**
	 * @covers GenerateWordCloud::word_cloud
	 */
	function testWordCloudGreaterFreq(){
	$c = new GenerateWordCloud();

	$abstract = " ten ten ten ten ten ten ten ten ten ten nine nine nine nine nine nine nine nine nine eight eight eight eight eight eight eight eight seven seven seven seven seven seven seven six six six six six six five five five five five four four four four ";  

	$words = array('ten' => 10, 'nine' => 9, 'eight' => 8, 'seven' => 7, 'six' => 6, 'five' => 5, 'four' => 4, 'three' => 3);
	//$words = str_word_count($abstract, 1);

	$theCloud = new stdClass();
	$theCloud->names = array();
	$theCloud->data = array();

	
	
	$returnCloud = $c -> word_cloud($words, $theCloud);
	
	$rC = array();
	foreach( $returnCloud->data as $key => $obj){


		$rC[] = array($obj['Word'] => $obj['Size']);
	}
	print_r($rC);
	
	$this->assertGreaterThan($rC[1]['nine'], $rC[0]['ten']);

	$this->assertGreaterThan($rC[2]['eight'], $rC[1]['nine']);

	$this->assertGreaterThan($rC[3]['seven'], $rC[2]['eight']);

	$this->assertGreaterThan($rC[4]['six'], $rC[3]['seven']);

	$this->assertGreaterThan($rC[5]['five'], $rC[4]['six']);

	$this->assertGreaterThan($rC[6]['four'], $rC[5]['five']);


	$this->assertEquals(7, count($rC));


	}

}

?>
