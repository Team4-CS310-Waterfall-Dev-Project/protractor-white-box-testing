<?php

class GenerateWordCloud{

	//Filters out stopWords

	function stopWordFilter($words, $stopwords){
		//had to add this declaration
		//bc test showed an error if 
		//$words is a subset of $stopwords
		$wordsFiltered = array();
		foreach($words as $pos => $word){

			if (!in_array(strtolower($word), $stopwords, TRUE)) {

				$wordsFiltered[$pos] = $word;

			}

		}

		return $wordsFiltered;

	}

	//Counts frequency of words

	function wordFreq($words) {

		$frequency_list = array();

		foreach ($words as $pos => $word) {

			$word = strtolower($word);

			if (array_key_exists($word, $frequency_list)) {

				++$frequency_list[$word];

			}

			else {

				$frequency_list[$word] = 1;

			}

		}

		return $frequency_list;

	}

	//Calculates the size of each word

	function word_cloud($words) {

	   $returnCloud = array();

		$fmax = 120; 

		$fmin = 8; 

		$tmin = min($words); 

		$tmax = max($words); 



		foreach ($words as $word => $frequency) {    

			if ($frequency > $tmin) {

				$font_size = floor(  ( $fmax * ($frequency - $tmin)*5 ) / ( $tmax - $tmin )  );

			}

			else {

				$font_size = 0;

			}

			if ($font_size >= $fmin) {

				$returnCloud[$word] =	$font_size;

			}  
		}
		return $returnCloud;   
	}

	

	function word_cloud_show($words) {

		$div_size = 500;

		$cloud = "<div style=\"width: {$div_size}px\">";

		

		$fmax = 120; /* Maximum font size */

		$fmin = 8; /* Minimum font size */

		$tmin = min($words); /* Frequency lower-bound */

		$tmax = max($words); /* Frequency upper-bound */



		foreach ($words as $word => $frequency) {    

			if ($frequency > $tmin) {

				$font_size = floor(  ( $fmax * ($frequency - $tmin)*5 ) / ( $tmax - $tmin )  );

			}

			else {

				$font_size = 0;

			}

			if ($font_size >= $fmin) {

				$cloud .= "<span style=\"font-size: {$font_size}px;\">$word</span> ";

			}  

		}

		$cloud .= "</div>";

		return $cloud;   

	}

}

?>
