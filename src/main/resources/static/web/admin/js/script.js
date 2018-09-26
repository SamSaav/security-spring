var activesBody = document.getElementById('activesBody');
var inactivesBody = document.getElementById('inactivesBody');
var url = 'http://localhost:8083/api/veedor/users';
var http = new XMLHttpRequest();

http.open("GET", url, true);
http.responseType = 'json';
http.send();
http.onload = function () {
    if (http.readyState === 4 && http.status === 200) {
        'use strict';
        var users = http.response;
        getUsers(users);
    }
};

function getUsers(jsonObj) {
    'use strict';

    var users = jsonObj.users;

	for (var i = 0; i < users.length; i++) {
		if (activesBody != null) {
			if (users[i].active){
				activesBody.append(createTheTableUsers(users[i]));
			}
		} else if (inactivesBody != null) {
			if (!(users[i].active)) {
				inactivesBody.append(createTheTableUsers(users[i]));
			}
		} else {
			alert('ERROR');
        	window.location.replace('http://localhost:8083/web/admin/index.html');
		}		
    }
}

function createTheTableUsers(jsonObj) {
	var user = jsonObj;
	var tr1 = document.createElement('tr');
	var td2 = document.createElement('td');
	td2.setAttribute('class', 'col-xs-2');
	var td3 = document.createElement('td');
	td3.setAttribute('class', 'col-xs-2');
	var td4 = document.createElement('td');
	td4.setAttribute('class', 'col-xs-2');
	var td5 = document.createElement('td');
	td5.setAttribute('class', 'col-xs-1');
	var td6 = document.createElement('td');
	td6.setAttribute('class', 'col-xs-1');
	var td7 = document.createElement('td');
	td7.setAttribute('class', 'col-xs-3 modificaciones');
	var button1 = document.createElement('button');
	button1.setAttribute('type', 'button');
	button1.setAttribute('onclick', 'buttonEdit('+user.id+')');
	button1.setAttribute('value', 'Edit');
	button1.setAttribute('class', 'btn btn-dark btn-lg');
	var span1 = document.createElement('span');
	span1.setAttribute('class', 'glyphicon glyphicon-edit');
	span1.setAttribute('aria-hidden', 'true');
	var button2 = document.createElement('button');
	button2.setAttribute('type', 'button');
	button2.setAttribute('onclick', 'buttonDelete('+user.id+')');
	button2.setAttribute('value', 'Delete');
	var span2 = document.createElement('span');
	var button3 = document.createElement('button');
	button3.setAttribute('type', 'button');
	button3.setAttribute('onclick', 'buttonAbsolutDelete('+user.id+')');
	button3.setAttribute('value', 'Delete');
	var span3 = document.createElement('span');
	span3.setAttribute('class', 'glyphicon glyphicon-trash');
	span3.setAttribute('aria-hidden', 'true');
	if (activesBody !== null) {
		button2.setAttribute('class', 'btn btn-danger btn-lg');
		span2.setAttribute('class', 'glyphicon glyphicon-remove');
		span2.setAttribute('aria-hidden', 'true');
		button3.setAttribute('class', 'btn btn-default btn-lg');
	} else if (inactivesBody !== null) {
		button2.setAttribute('class', 'btn btn-success btn-lg');
		span2.setAttribute('class', 'glyphicon glyphicon-ok');
		span2.setAttribute('aria-hidden', 'true');
		button3.setAttribute('class', 'btn btn-danger btn-lg');
	}

	td2.textContent = user.name;
	td3.textContent = user.lastName;
	td4.textContent = user.email;
	td5.textContent = user.role.role;
	td6.textContent = user.active;
	button1.append(span1);
	button2.append(span2);
	button3.append(span3);
	td7.append(button1);
	td7.append(button2);
	td7.append(button3);

	tr1.append(td2);
	tr1.append(td3);
	tr1.append(td4);
	tr1.append(td5);
	tr1.append(td6);
	tr1.append(td7);

	return tr1;
}


