var activesBody = document.getElementById('activesBody');
var inactivesBody = document.getElementById('inactivesBody');
var url = 'http://localhost:8083/api/veedor/employees';
var http = new XMLHttpRequest();

http.open("GET", url, true);
http.responseType = 'json';
http.send();
http.onload = function () {
    if (http.readyState === 4 && http.status === 200) {
        'use strict';
        var employees = http.response;
        getEmployees(employees);
    }
};

function getEmployees(jsonObj) {
    'use strict';

    var employees = jsonObj.employee;

	for (var i = 0; i < employees.length; i++) {
		if (activesBody != null) {
			if (employees[i].statusEmpleado){
				activesBody.append(createTheTableEmployee(employees[i]));
			}
		} else if (inactivesBody != null) {
			if (!(employees[i].statusEmpleado)) {
				inactivesBody.append(createTheTableEmployee(employees[i]));
			}
		} else {
			alert('ERROR');
        	window.location.replace('http://localhost:8083/web/admin/index.html');
		}		
    }
}

function createTheTableEmployee(jsonObj) {
	var employee = jsonObj;
	var tr1 = document.createElement('tr');
	var td1 = document.createElement('td');
	td1.setAttribute('class', 'col-xs-2');
	var td2 = document.createElement('td');
	td2.setAttribute('class', 'col-xs-2');
	var td3 = document.createElement('td');
	td3.setAttribute('class', 'col-xs-2');
	var td4 = document.createElement('td');
	td4.setAttribute('class', 'col-xs-1');
	var td5 = document.createElement('td');
	td5.setAttribute('class', 'col-xs-1');
	var td6 = document.createElement('td');
	td6.setAttribute('class', 'col-xs-1');
	var td7 = document.createElement('td');
	td7.setAttribute('class', 'col-xs-1');
	var td8 = document.createElement('td');
	td8.setAttribute('class', 'col-xs-1');
	var td9 = document.createElement('td');
	td9.setAttribute('class', 'col-xs-1');
	var td10 = document.createElement('td');
	td10.setAttribute('class', 'col-xs-1');
	var td11 = document.createElement('td');
	td11.setAttribute('class', 'col-xs-1');
	var td12 = document.createElement('td');
	td12.setAttribute('class', 'col-xs-3 modificaciones');
	var button1 = document.createElement('button');
	button1.setAttribute('type', 'button');
	button1.setAttribute('onclick', 'buttonEditEmployee('+employee.id+')');
	button1.setAttribute('value', 'Edit');
	button1.setAttribute('class', 'btn btn-dark btn-lg');
	var span1 = document.createElement('span');
	span1.setAttribute('class', 'glyphicon glyphicon-edit');
	span1.setAttribute('aria-hidden', 'true');
	var button2 = document.createElement('button');
	button2.setAttribute('type', 'button');
	button2.setAttribute('onclick', 'buttonDeleteEmployee('+employee.id+')');
	button2.setAttribute('value', 'Delete');
	if (activesBody !== null) {
		button2.setAttribute('class', 'btn btn-danger btn-lg');
		var span2 = document.createElement('span');
		span2.setAttribute('class', 'glyphicon glyphicon-remove');
		span2.setAttribute('aria-hidden', 'true');
	} else if (inactivesBody !== null) {
		button2.setAttribute('class', 'btn btn-success btn-lg');
		var span2 = document.createElement('span');
		span2.setAttribute('class', 'glyphicon glyphicon-ok');
		span2.setAttribute('aria-hidden', 'true');
		var button3 = document.createElement('button');
		button3.setAttribute('type', 'button');
		button3.setAttribute('onclick', 'buttonAbsolutDeleteEmployee('+employee.id+')');
		button3.setAttribute('value', 'Delete');
		button3.setAttribute('class', 'btn btn-danger btn-lg');
		var span3 = document.createElement('span');
		span3.setAttribute('class', 'glyphicon glyphicon-trash');
		span3.setAttribute('aria-hidden', 'true');
	}

	td1.textContent = employee.name;
	td2.textContent = employee.lastName;
	td3.textContent = employee.enterpriseID;
	td4.textContent = employee.resourceNumber;
	td5.textContent = employee.gender;
	td6.textContent = employee.resourceRole;
	td7.textContent = employee.englishLevel;
	td8.textContent = employee.officeLocation;
	td9.textContent = employee.client;
	td10.textContent = employee.project;
	td11.textContent = employee.statusEmpleado;
	button1.append(span1);
	button2.append(span2);
	td12.append(button1);
	td12.append(button2);
	if (inactivesBody !== null) {
		button3.append(span3);
		td12.append(button3);
	}

	tr1.append(td1);
	tr1.append(td2);
	tr1.append(td3);
	tr1.append(td4);
	tr1.append(td5);
	tr1.append(td6);
	tr1.append(td7);
	tr1.append(td8);
	tr1.append(td9);
	tr1.append(td10);
	tr1.append(td11);
	tr1.append(td12);


	return tr1;
}