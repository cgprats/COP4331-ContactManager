<?php

	$inData = getRequestInfo();
	

	$conn = new mysqli("localhost", "admin", "plsletM3in", "smallproject"); 
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("UPDATE contacts SET firstname=?, lastname=?, email=?, phone=? WHERE id=?");
		$stmt->bind_param("ssssi", $inData["firstname"], $inData["lastname"], $inData["email"], $inData["phone"], $inData["id"]);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError($inData["ContactsID"]);
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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
