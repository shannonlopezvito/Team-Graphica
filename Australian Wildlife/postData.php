<?php

	$mysqli = new mysqli('localhost', 'root', '', 'australian wildlife');
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
		//get data for row with a particular id
		$animal_id=mt_rand(1,3);		
		$query = "SELECT * FROM sky WHERE ID=" . $animal_id;
		$result = $mysqli->query($query);
		while(list($ID, $Animal_Name, $Image, $Height, $Description) = $result->fetch_row()) {
			//echo "<script type='text/javascript'>alert('$ID');</script>";
			echo $ID . ":" . $Animal_Name . ":" .  $Image . ":" . $Height . ":" . $Description;
		}
	}
	
	function getDataByrandomgrassland($mysqli) {
		//get data for row with a particular id
		$animal_id=mt_rand(1,3);		
		$query = "SELECT * FROM grassland WHERE ID=" . $animal_id;
		$result = $mysqli->query($query);
		while(list($ID, $Animal_Name, $Image, $Height, $Description) = $result->fetch_row()) {
			//echo "<script type='text/javascript'>alert('$ID');</script>";
			echo $ID . ":" . $Animal_Name . ":" .  $Image . ":" . $Height . ":" . $Description;
		}
	}
	
	function getDataByrandomunderground($mysqli) {
		//get data for row with a particular id
		$animal_id=mt_rand(1,3);		
		$query = "SELECT * FROM underground WHERE ID=" . $animal_id;
		$result = $mysqli->query($query);
		while(list($ID, $Animal_Name, $Image, $Height, $Description) = $result->fetch_row()) {
			//echo "<script type='text/javascript'>alert('$ID');</script>";
			echo $ID . ":" . $Animal_Name . ":" .  $Image . ":" . $Height . ":" . $Description;
		}
	}
	
	function getDataByrandomsea($mysqli) {
		//get data for row with a particular id
		$animal_id=mt_rand(1,3);		
		$query = "SELECT * FROM sea WHERE ID=" . $animal_id;
		$result = $mysqli->query($query);
		while(list($ID, $Animal_Name, $Image, $Height, $Description) = $result->fetch_row()) {
			//echo "<script type='text/javascript'>alert('$ID');</script>";
			echo $ID . ":" . $Animal_Name . ":" .  $Image . ":" . $Height . ":" . $Description;
		}
	}
	
	

	


	$mysqli->close();
?>