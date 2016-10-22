<?php

	$mysqli = new mysqli('localhost', 'root', '8157a8527338fbc8', 'australian wildlife');
	$action=$_POST["action"];
	//depending on the action value, run a different function
	switch ($action) {
	    case 0:
	    	getDataByrandomsky($mysqli);
	        break;
		case 1:
	    	getDataByrandomgrassland($mysqli);
	        break;
		case 2:
	    	getDataByrandomunderground($mysqli);
	        break;
		case 3:
	    	getDataByrandomsea($mysqli);
	        break;
	}
	function getDataByrandomsky($mysqli) {
		//get a random animal from the sky habitat
		$animal_id=mt_rand(1,8);		
		$query = "SELECT * FROM sky WHERE ID=" . $animal_id;
		$result = $mysqli->query($query);
		while(list($ID, $Animal_Name, $Image, $Height, $Description) = $result->fetch_row()) {
			// use echo to send the data to the javascript file
			echo $ID . ":" . $Animal_Name . ":" .  $Image . ":" . $Height . ":" . $Description;
		}
	}
	
	function getDataByrandomgrassland($mysqli) {
		//get a random animal from the grassland habitat
		$animal_id=mt_rand(1,8);		
		$query = "SELECT * FROM grassland WHERE ID=" . $animal_id;
		$result = $mysqli->query($query);
		while(list($ID, $Animal_Name, $Image, $Height, $Description) = $result->fetch_row()) {
			echo $ID . ":" . $Animal_Name . ":" .  $Image . ":" . $Height . ":" . $Description;
		}
	}
	
	function getDataByrandomunderground($mysqli) {
		//get a random animal from the underground habitat
		$animal_id=mt_rand(1,8);		
		$query = "SELECT * FROM underground WHERE ID=" . $animal_id;
		$result = $mysqli->query($query);
		while(list($ID, $Animal_Name, $Image, $Height, $Description) = $result->fetch_row()) {
			echo $ID . ":" . $Animal_Name . ":" .  $Image . ":" . $Height . ":" . $Description;
		}
	}
	
	function getDataByrandomsea($mysqli) {
		//get a random animal from the sea habitat
		$animal_id=mt_rand(1,8);		
		$query = "SELECT * FROM sea WHERE ID=" . $animal_id;
		$result = $mysqli->query($query);
		while(list($ID, $Animal_Name, $Image, $Height, $Description) = $result->fetch_row()) {
			echo $ID . ":" . $Animal_Name . ":" .  $Image . ":" . $Height . ":" . $Description;
		}
	}

	$mysqli->close();
?>