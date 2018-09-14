function registration() {
    var name = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("userEmail").value;
    var password = document.getElementById("userPassword").value;
    var confPassword = document.getElementById("userConfirmPassword").value;
    var role = document.getElementById("RoleOptions").value;

    if (password === confPassword) {
        var url = 'http://localhost:8083/api/user?name=' + name + '&lastName=' + lastName + '&email=' + email + '&password=' + password + '&role=' + role;
        var http = new XMLHttpRequest();

        var json = JSON.stringify();

        http.open("POST", url, true);
        http.setRequestHeader('Content-Type', 'application/json');
        http.onload = function () {
            if (http.readyState === 4 && http.status === 201) {
                window.location.replace('http://localhost:8083/web/admin/index.html');
            } else {
                alert("The registration fail");
                window.location.replace('http://localhost:8083/web/admin/registration.html');
            }
        }
        http.send(json);
    } else {
        window.location.replace('http://localhost:8083/web/admin/registration.html');
    }
}

function buttonEdit(id) {
    sessionStorage.setItem("userId", id);
    window.location.replace('http://localhost:8083/web/admin/userUpdate.html');
}

function buttonDelete(id) {
    var url = "http://localhost:8083/api/user/"+id+"/delete";
    var http = new XMLHttpRequest();

    http.open("DELETE", url, true);
    http.onload = function () {
        if (http.readyState === 4 && http.status === 200) {
            window.location.replace('http://localhost:8083/web/admin/usersActive.html');
        } else {
            alert('Fail');
            window.location.replace('http://localhost:8083/web/admin/usersActive.html');
        }
    }

    http.send();
}

function buttonAbsolutDelete(id) {
    var url = "http://localhost:8083/api/user/"+id+"/permanentDelete";
    var http = new XMLHttpRequest();

    http.open("DELETE", url, true);
    http.onload = function () {
        if (http.readyState === 4 && http.status === 200) {
            window.location.replace('http://localhost:8083/web/admin/usersActive.html');
        } else {
            alert('Fail');
            window.location.replace('http://localhost:8083/web/admin/usersActive.html');
        }
    }

    http.send();
}

function movePage (page) {
    window.location.replace('http://localhost:8083/web/admin/'+page+'.html');
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

        http.open("PUT", url, true);
        http.setRequestHeader('Content-Type', 'application/json');
        http.onload = function () {
            if (http.readyState === 4 && http.status === 200) {
                sessionStorage.removeItem("userId");
                window.location.replace('http://localhost:8083/web/admin/usersActive.html');
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

        http.open("PUT", url, true);
        http.setRequestHeader('Content-Type', 'application/json');
        http.onload = function () {
            if (http.readyState === 4 && http.status === 200) {
                sessionStorage.removeItem("userId");
                window.location.replace('http://localhost:8083/web/admin/usersActive.html');
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