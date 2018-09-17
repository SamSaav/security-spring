var url = 'http://localhost:8083/api/employeesActive';
var http = new XMLHttpRequest();

http.open("GET", url, true);
http.responseType = 'json';
http.send();
http.onload = function () {
    if (http.readyState === 4 && http.status === 200) {
        'use strict';
        var employees = http.response;
        tabla(employees);
    }
};

function tabla(jsonObj) {
    'use strict';

    var employees = jsonObj.employee;

    var bodyEmployee = document.getElementById('bodyEmployee');

    var num;

    if (5 > employees.length) {
        num = employees.length;
    } else {
        num = 5;
    }

    for (var i = 0; i < num; i++) {
        var tr = document.createElement('tr');
        var td2 = document.createElement('td');
        td2.setAttribute('class', 'col-xs-1 col-md-1');
        var td3 = document.createElement('td');
        td3.setAttribute('class', 'col-xs-1 col-md-1');
        var td4 = document.createElement('td');
        td4.setAttribute('class', 'col-xs-2 col-md-2');
        var td5 = document.createElement('td');
        td5.setAttribute('class', 'col-xs-1 col-md-1');
        var td6 = document.createElement('td');
        td6.setAttribute('class', 'col-xs-2 col-md-2');
        var td7 = document.createElement('td');
        td7.setAttribute('class', 'col-xs-1 col-md-1');
        var td8 = document.createElement('td');
        td8.setAttribute('class', 'col-xs-2 col-md-2');

        td2.textContent = employees[i].name;
        td3.textContent = employees[i].lastName;
        td4.textContent = employees[i].enterpriseID;
        td5.textContent = employees[i].phoneNumber;
        td6.textContent = employees[i].resourceRole;
        td7.textContent = employees[i].englishLevel;
        td8.textContent = employees[i].officeLocation;

        tr.append(td2);
        tr.append(td3);
        tr.append(td4);
        tr.append(td5);
        tr.append(td6);
        tr.append(td7);
        tr.append(td8);

        bodyEmployee.append(tr);

    }

}