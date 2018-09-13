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


function update() {
    'use strict';
    var id = sessionStorage.getItem("userId");
    var name = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("userEmail").value;
    var password = document.getElementById("userPassword").value;
    var confPassword = document.getElementById("userConfirmPassword").value;
    var role = document.getElementById("RoleOptions").value;

    if (name === "") {
        name = null;
    }
    if (lastName === "") {
        lastName = null;
    }
    if (email === "") {
        email = null;
    }
    if (password === "") {
        password = null;
    }
    if (role === "--") {
        role = null;
    }

    if (password === null) {
        var url = 'http://localhost:8083/api/user/' + id;
        var http = new XMLHttpRequest();

        var dto = {"name": name, "lastName": lastName, "email": email, "password": password, "role": role};

        var json = JSON.stringify(dto);

        http.open("POST", url, true);
        http.setRequestHeader('Content-Type', 'application/json');
        http.onload = function () {
            if (http.readyState === 4 && http.status === 200) {
                sessionStorage.removeItem("userId");
                window.location.replace('http://localhost:8083/web/admin/index.html');
            } else {
                alert("The update fail");
                window.location.replace('http://localhost:8083/web/admin/userUpdate.html');
            }
        }
        http.send(json);
    } else if (password === confPassword) {
        var url = 'http://localhost:8083/api/user/' + id;
        var http = new XMLHttpRequest();

        var dto = {"name": name, "lastName": lastName, "email": email, "password": password, "role": role};

        var json = JSON.stringify(dto);

        http.open("POST", url, true);
        http.setRequestHeader('Content-Type', 'application/json');
        http.onload = function () {
            if (http.readyState === 4 && http.status === 200) {
                sessionStorage.removeItem("userId");
                window.location.replace('http://localhost:8083/web/admin/index.html');
            } else {
                alert("The registration fail");
                window.location.replace('http://localhost:8083/web/admin/userUpdate.html');
            }
        }
        http.send(json);
    } else {
        window.location.replace('http://localhost:8083/web/admin/userUpdate.html');
    }
}