var userId = sessionStorage.getItem("userId");
var url = 'http://localhost:8083/api/user/' + userId;
var http = new XMLHttpRequest();

http.open("GET", url, true);
http.responseType = 'json';
http.send();
http.onload = function () {
    if (http.readyState === 4 && http.status === 200) {
        'use strict';
        var user = http.response;
        placeholders(user);
    }
};

function placeholders(jsonObj) {
    var user = jsonObj;
    var name = document.getElementById("firstName");
    name.setAttribute('placeholder', user.name);
    var lastName = document.getElementById("lastName");
    lastName.setAttribute('placeholder', user.lastName);
    var email = document.getElementById("userEmail");
    email.setAttribute('placeholder', user.email);
    var role = document.getElementById("RoleOptions");
    role.setAttribute('placeholder', user.role.role);
}