
<?php

	$inData = getRequestInfo();
	
	$firstname = $inData["firstname"];
	$lastname = $inData["lastname"];
	$login = $inData["login"];
  	$password = $inData["password"];

	$conn = new mysqli("localhost", "admin", "plsletM3in", "smallproject"); 	
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("INSERT into users (firstname,lastname,login,password) VALUES(?,?,?,?)");
		$stmt->bind_param("ssss", $firstname, $lastname, $login, $password);
		
		
		$diditwork = $stmt->execute();
		
		$stmt->close();
		$conn->close();
		
		if($diditwork)
			returnWithError("Yeet");
		else
			returnWithError("NotYeet");
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
	
	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
