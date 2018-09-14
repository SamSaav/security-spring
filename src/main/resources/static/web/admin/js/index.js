var url = 'http://localhost:8083/api/users';
var http = new XMLHttpRequest();

http.open("GET", url, true);
http.responseType = 'json';
http.send();
http.onload = function () {
    if (http.readyState === 4 && http.status === 200) {
        'use strict';
        var users = http.response;
        tablaUsers(users);
        getEmployee();
    }
};

function getEmployee () {
	'use strict';
	var empUrl = 'http://localhost:8083/api/employees';
	var xhr = new XMLHttpRequest();

	xhr.open("GET", empUrl, true);
	xhr.responseType = 'json';
	xhr.send();
	xhr.onload = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			'use strict';
			var employees = xhr.response;
			tablaEmployee(employees);
		}
	}
}

function tablaUsers(jsonObj) {
    'use strict';

    var bodyUsers = document.getElementById('bodyUsers');

    var users = jsonObj.users;

    var num;

    if (users.length < 5) {
    	num = users.length;
    }else{
    	num = 5;
    }

	for (var i = 0; i < num; i++) {
		if (users[i].active) {
			var tr1 = document.createElement('tr');
			var td2 = document.createElement('td');
			td2.setAttribute('class', 'col-xs-2');
			var td3 = document.createElement('td');
			td3.setAttribute('class', 'col-xs-2');
			var td4 = document.createElement('td');
			td4.setAttribute('class', 'col-xs-2');

			td2.textContent = users[i].name;
			td3.textContent = users[i].lastName;
			td4.textContent = users[i].email;

	        tr1.append(td2);
	        tr1.append(td3);
	        tr1.append(td4);

	        bodyUsers.append(tr1);
		}
    }

    var section = document.getElementById('myUsers');
    var button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'btn btn-dark');
    button.setAttribute('onclick', 'movePage("usersActive")');

    button.textContent = 'See more';

    section.append(button);

}

function tablaEmployee(jsonObj) {
    'use strict';

    var bodyEmployee = document.getElementById('bodyEmployee');

    var users = jsonObj.employee;

    var num;

    if (users.length < 5) {
    	num = users.length;
    } else {
    	num = 5;
    }

	for (var i = 0; i < num; i++) {
		if (users[i].active) {
			var tr1 = document.createElement('tr');
			var td2 = document.createElement('td');
			td2.setAttribute('class', 'col-xs-2');
			var td3 = document.createElement('td');
			td3.setAttribute('class', 'col-xs-2');
			var td4 = document.createElement('td');
			td4.setAttribute('class', 'col-xs-2');
			var td5 = document.createElement('td');
			td5.setAttribute('class', 'col-xs-2');

			td2.textContent = users[i].name;
			td3.textContent = users[i].lastName;
			td4.textContent = users[i].project;
			td5.textContent = users[i].client;

	        tr1.append(td2);
	        tr1.append(td3);
	        tr1.append(td4);
	        tr1.append(td5);

	        bodyEmployee.append(tr1);
		}
    }

    var section = document.getElementById('myEmployees');
    var button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'btn btn-dark');
    button.setAttribute('onclick', 'movePage("employeesActive")');

    button.textContent = 'See more';

    section.append(button);

}