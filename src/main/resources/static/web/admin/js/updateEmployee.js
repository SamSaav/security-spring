var employeeId = sessionStorage.getItem("employeeId");

var url = 'http://localhost:8083/api/veedor/employees/' + employeeId;
var http = new XMLHttpRequest();

http.open("GET", url, true);
http.responseType = 'json';
http.send();
http.onload = function () {
    if (http.readyState === 4 && http.status === 200) {
        'use strict';
        var employee = http.response;
        placeholdersEmployee(employee);
    }
};



function placeholdersEmployee(jsonObj) {
    var employee = jsonObj.employee;
    var firstName = document.getElementById("firstName");
    firstName.setAttribute('placeholder', employee.name);
    var lastName = document.getElementById("lastName");
    lastName.setAttribute('placeholder', employee.lastName);
    var enterpriseId = document.getElementById("enterpriseId");
    enterpriseId.setAttribute('placeholder', employee.enterpriseID);
    var resourceNumber = document.getElementById("resourceNumber");
    resourceNumber.setAttribute('placeholder', employee.resourceNumber);
    document.getElementById("Gender").value = employee.gender;
    document.getElementById("ResourceRole").value = employee.resourceRole;
    document.getElementById("EnglishLevel").value = employee.englishLevel;
    document.getElementById("OfficeLocation").value = employee.officeLocation;
    var project = document.getElementById("project");
    project.setAttribute('placeholder', employee.project);
    var client = document.getElementById("client");
    client.setAttribute('placeholder', employee.client);

}

