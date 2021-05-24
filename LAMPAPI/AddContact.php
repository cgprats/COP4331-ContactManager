<?php
	$inData = getRequestInfo();
	
	$firstname = $inData["firstname"];
	$lastname = $inData["lastname"];
	$email = $inData["email"];
	$phone = $inData["phone"];
	$fooid = $inData["fooid"];

	$conn = new mysqli("localhost", "admin", "plsletM3in", "smallproject"); 	
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT into contacts (firstname,lastname,email,phone,fooid) VALUES(?,?,?,?,?)");
		$stmt->bind_param("ssssi", $firstname, $lastname,$email,$phone,$fooid);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("Yeet");
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
