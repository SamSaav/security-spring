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

	var div = document.createElement('div');
	div.setAttribute('class', 'table-responsive');
	var table = document.createElement('table');
	table.setAttribute('class', 'table');
	var tr = document.createElement('tr');
	var th1 = document.createElement('th');
	th1.setAttribute('class', 'col-xs-1');
	var th2 = document.createElement('th');
	th2.setAttribute('class', 'col-xs-2');
	var th3 = document.createElement('th');
	th3.setAttribute('class', 'col-xs-2');
	var th4 = document.createElement('th');
	th4.setAttribute('class', 'col-xs-2');
	var th5 = document.createElement('th');
	th5.setAttribute('class', 'col-xs-1');
	var th6 = document.createElement('th');
	th6.setAttribute('class', 'col-xs-1');
	var th7 = document.createElement('th');
	th7.setAttribute('class', 'col-xs-3');

	th1.textContent = 'ID';
	th2.textContent = 'Name';
	th3.textContent = 'Last Name';
	th4.textContent = 'Email';
	th5.textContent = 'Role';
	th6.textContent = 'Active';
	th7.textContent = 'Modificaciones';

	tr.append(th1);
	tr.append(th2);
	tr.append(th3);
	tr.append(th4);
	tr.append(th5);
	tr.append(th6);
	tr.append(th7);

	table.append(tr);

	var users = jsonObj.users;

	for (var i = 0; i < users.length; i++) {
		var tr1 = document.createElement('tr');
		var td1 = document.createElement('td');
		td1.setAttribute('class', 'col-xs-1');
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
		td7.setAttribute('class', 'col-xs-3');
		var formEdit = document.createElement('form');
		formEdit.setAttribute('method', 'POST');
		var inputEdit = document.createElement('input');
		inputEdit.setAttribute('type', 'hidden');
		inputEdit.setAttribute('value', users[i].id);
		inputEdit.setAttribute('id', 'userId');
		var button1 = document.createElement('button');
		button1.setAttribute('type', 'button');
		button1.setAttribute('onclick', 'buttonEdit('+users[i].id+')');
		button1.setAttribute('id', 'edit');
		button1.setAttribute('class', 'btn btn-default');
		var button2 = document.createElement('button');
		button2.setAttribute('type', 'button');
		button2.setAttribute('onclick', 'buttonDelete('+users[i].id+')');
		button2.setAttribute('id', 'delete');
		button2.setAttribute('class', 'btn btn-danger');

		td1.textContent = users[i].id;
		td2.textContent = users[i].name;
		td3.textContent = users[i].lastName;
		td4.textContent = users[i].email;
		td5.textContent = users[i].role.role;
		td6.textContent = users[i].active;
		button1.textContent = 'Edit';
		button2.textContent = 'Delete';
		formEdit.append(inputEdit);
		formEdit.append(button1);
		td7.append(formEdit);
		td7.append(button2);


		tr1.append(td1);
		tr1.append(td2);
		tr1.append(td3);
		tr1.append(td4);
		tr1.append(td5);
		tr1.append(td6);
		tr1.append(td7);

		table.append(tr1);

	}

	div.append(table);

	main.append(div);

}

function registration() {
    var name = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("userEmail").value;
    var password = document.getElementById("userPassword").value;
    var confPassword = document.getElementById("userConfirmPassword").value;
    var role = document.getElementById("RoleOptions").value;

    if (password === confPassword) {
        var url = 'http://localhost:8083/api/user?name='+name+'&lastName='+lastName+'&email='+email+'&password='+password+'&role='+role;
        var http = new XMLHttpRequest();

        var json = JSON.stringify();

        http.open("POST", url,true);
        http.setRequestHeader('Content-Type', 'application/json');
        http.onload = function () {
            if (http.readyState === 4 && http.status === 201) {
                window.location.replace('http://localhost:8083/web/admin/index.html');
            }else{
                alert("The registration fail");
                window.location.replace('http://localhost:8083/web/admin/registration.html');
            }
        }
        http.send(json);
    } else {
        window.location.replace('http://localhost:8083/web/admin/update.');
    }
}

function buttonEdit(id) {
	sessionStorage.setItem("userId", id);
	window.location.replace('http://localhost:8083/web/admin/update.html');
}

function buttonDelete(id) {
	sessionStorage.setItem("userId", id);
	window.location.replace();
}