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

				firstName = json.Object.firstName;
				lastName = json.Object.lastName;

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

function doRegister() {
	firstName = document.getElementById("firstName").value;
	lastName = document.getElementById("lastName").value
	login = document.getElementById("registerLoginName").value;
	password = document.getElementById("registerPassword").value;

	var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '", "firstname" : "' + firstName + '", "lastName" : "' + lastName + '"}';
	var url = urlBase + '/LAMPAPI/SignUp.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try {
		xhr.onreadystatechange = function( ) {
			if (this.readyState == 4 && this.status == 200) {
				var jsonObject = JSON.parse(xhr.responseText);
				userId = jsonObject.id;
				firstName = json.Object.firstName;
				lastName = json.Object.lastName;

				saveCookie();

				window.location.href = "contacts.html";
			}
		};
		xhr.send(jsonPayload);
	}

	catch(err) {
		document.getElementById("registerResult").innerHTML = err.message;
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
