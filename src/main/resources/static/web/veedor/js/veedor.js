var url = 'http://localhost:8083/api/users';
var http = new XMLHttpRequest();

http.open("GET", url, true);
http.responseType = 'json';
http.send();
http.onload = function () {
	if (http.readyState === 4 && http.status === 200) {
		'use strict';
		var users = http.response;
		tabla(users);
	}
};

function tabla(jsonObj) {
	'use strict';

	var main = document.getElementById('myMain');

	var div1 = document.createElement('div');
	div1.setAttribute('class', 'col-xs-2');
	var div2 = document.createElement('div');
	div2.setAttribute('class', 'col-xs-2');
	var div = document.createElement('div');
	div.setAttribute('class', 'col-xs-8');
	var table = document.createElement('table');
	var tr = document.createElement('tr');
	var th2 = document.createElement('th');
	th2.setAttribute('class', 'col-xs-2');
	var th3 = document.createElement('th');
	th3.setAttribute('class', 'col-xs-3');
	var th4 = document.createElement('th');
	th4.setAttribute('class', 'col-xs-4');

	th2.textContent = 'Name';
	th3.textContent = 'Last Name';
	th4.textContent = 'Email';

	tr.append(th2);
	tr.append(th3);
	tr.append(th4);

	table.append(tr);

	var users = jsonObj.users;

	for (var i = 0; i < users.length; i++) {
		var tr1 = document.createElement('tr');
		var td2 = document.createElement('td');
		td2.setAttribute('class', 'col-xs-3');
		var td3 = document.createElement('td');
		td3.setAttribute('class', 'col-xs-3');
		var td4 = document.createElement('td');
		td4.setAttribute('class', 'col-xs-3');

		td2.textContent = users[i].name;
		td3.textContent = users[i].lastName;
		td4.textContent = users[i].email;

		tr1.append(td2);
		tr1.append(td3);
		tr1.append(td4);

		table.append(tr1);

	}

	div.append(table);

	main.append(div1);
	main.append(div);
	main.append(div2);

}