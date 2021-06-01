var urlBase = 'https://cop4331group2.com';
var extension = 'php';

var userId = 0;
var login = "";
var password = "";
var firstName = "";
var lastName = "";

function doLogin() {
	login = document.getElementById("loginName").value;
	password = document.getElementById("password").value;

	var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
	var url = urlBase + '/LAMPAPI/Login.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try {
		xhr.onreadystatechange = function( ) {
			if (this.readyState == 4 && this.status == 200) {
				var jsonObject = JSON.parse(xhr.responseText);
				userId = jsonObject.id;

				if (userId < 1) {
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}

				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();

				window.location.href = "contacts.html";
			}
		};
		xhr.send(jsonPayload);
	}

	catch(err) {
		document.getElementById("loginResult").innerHTML = err.message;
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function doRegister() {
	console.log("Attempting Registration...");
	firstName = document.getElementById("firstName").value;
	lastName = document.getElementById("lastName").value
	login = document.getElementById("registerLoginName").value;
	password = document.getElementById("registerPassword").value;

	var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '", "firstname" : "' + firstName + '", "lastname" : "' + lastName + '"}';
	var url = urlBase + '/LAMPAPI/SignUp.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	console.log("Trying to Register User...");
	try {
		xhr.onreadystatechange = function( ) {
			if (this.readyState == 4 && this.status == 200) {
				var jsonObject = JSON.parse(xhr.responseText);
				userId = jsonObject.id;
				firstName = jsonObject.firstname;
				lastName = jsonObject.lastname;

				saveCookie();

				//window.location.href = "contacts.html";
				window.location.href = "index.html"
			}
		};
		xhr.send(jsonPayload);
		window.alert("Registration Success");

	}

	catch(err) {
		window.alert("Registration Failed");
		document.getElementById("registerResult").innerHTML = err.message;
	}
}

function addContact() {
	var newFirstName = document.getElementById("contactFirstName").value;
	var newLastName = document.getElementById("contactLastName").value;
	var newEmail = document.getElementById("contactEmail").value;
	var newPhone = document.getElementById("contactPhone").value;
	
	if (newFirstName == "" || newLastName == "" || newEmail == "" || newPhone == "")
	{
		document.getElementById("contactAddResult").innerHTML = "All fields are required.";
		return;
	}
	
	document.getElementById("contactAddResult").innerHTML = "";
	
	var jsonPayload = '{"firstname" : "' + newFirstName + '", "lastname" : "' + newLastName + '", "email" : "' + newEmail + '", "phone" : "' + newPhone + '", "fooid" : ' + userId + '}';
	var url = urlBase + '/LAMPAPI/AddContact.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactAddResult").innerHTML = "Contact has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}
}

function deleteContact() {
	var deleteId = document.getElementById("contactDeleteID").value;
	document.getElementById("contactDeleteResult").innerHTML = "";
	
	var jsonPayload = '{"id" : ' + deleteId + '}';
	var url = urlBase + '/LAMPAPI/DeleteContact.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactDeleteResult").innerHTML = "Contact has been deleted";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactDeleteResult").innerHTML = err.message;
	}
}

function doSearch() {
	var srch = document.getElementById("searchText").value;
	document.getElementById("searchResult").innerHTML = "";
	
	var contactList = "";
	
	var jsonPayload = '{"search" : "' + srch + '","userId" : ' + userId + '}';
	var url = urlBase + '/LAMPAPI/SearchContacts.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("searchResult").innerHTML = "Contact(s) has been retrieved";
				var jsonObject = JSON.parse(xhr.responseText);
				
				if (jsonObject.error > "")
				{
					document.getElementById("searchResult").innerHTML = jsonObject.error;
					return;
				}
				
				for (var i = 0; i < jsonObject.results.length; i++)
				{
					contactList += jsonObject.results[i];
					if (i < jsonObject.results.length - 1)
					{
						contactList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = contactList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("searchResult").innerHTML = err.message;
	}
}

function editContact() {
	var editId = document.getElementById("contactEditID").value;
	var newFirstName = document.getElementById("contactEditFirstName").value;
	var newLastName = document.getElementById("contactEditLastName").value;
	var newEmail = document.getElementById("contactEditEmail").value;
	var newPhone = document.getElementById("contactEditPhone").value;
	
	if (newFirstName == "" || newLastName == "" || newEmail == "" || newPhone == "")
	{
		document.getElementById("contactEditResult").innerHTML = "All fields are required.";
		return;
	}
	
	document.getElementById("contactEditResult").innerHTML = "";
	
	var jsonPayload = '{"firstname" : "' + newFirstName + '", "lastname" : "' + newLastName + '", "email" : "' + newEmail + '", "phone" : "' + newPhone + '", "id" : ' + editId + '}';
	var url = urlBase + '/LAMPAPI/EditContact.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactEditResult").innerHTML = "Contact has been edited";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactEditResult").innerHTML = err.message;
	}
}

function saveCookie() {
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime() + (minutes * 60 * 1000));
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie() {
	userId = -1;
	var data = document.cookie;
	var splits = data.split(",");

	for (var i = 0; i < splits.length; i++) {
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");

		if (tokens[0] == "firstName") {
			firstName = tokens[1];
		}

		else if (tokens[0] == "lastName") {
			lastName = tokens[1];
		}

		else if (tokens[0] == "userId") {
			userId = parseInt(tokens[1].trim());
		}
	}

	if (userId < 0) {
		window.location.href = "index.html";
	}

	else {
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}
