function login() {
    'use strict';
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var role;

    var GETurl = 'http://localhost:8083/api/userEmail?email=' + email;
    var request = new XMLHttpRequest();
    request.open("GET", GETurl, true);
    request.responseType = 'json';
    request.onload = function () {
        if (request.readyState === 4 && request.status === 200) {
            'use strict';
            var user = request.response;
            role = user.role.role;
            accessLogin(email, password, role);
        } else {
            role = 'INVALID';
        }

    }
    request.send()

}

function accessLogin(email, password, role) {
    var url = 'http://localhost:8083/api/login?email=' + email + '&password=' + password;
    var http = new XMLHttpRequest();

    http.open("POST", url, true);
    http.setRequestHeader('Content-Type', 'application/json');
    http.onload = function () {
        if (http.readyState === 4 && http.status === 200) {
            if (role === 'ADMIN') {
                window.location.replace('http://localhost:8083/web/admin/index.html');
            } else if (role === 'VEEDOR') {
                window.location.replace('http://localhost:8083/web/veedor/index.html');
            } else {
                return 'ERROR';
            }
        } else {
            window.location.replace('http://localhost:8083/web/login.html');
        }
    }
    http.send();
}

function logout() {
    'use strict';
    var url = "http://localhost:8083/api/logout";
    var http = new XMLHttpRequest();

    http.open("GET", url, true);
    http.responseType = 'json';
    http.send();

    http.onload = function () {
        if (http.readyState === 4 && http.status === 200) {
            window.location.replace('http://localhost:8083/web/login.html');
        } else {
            alert('Log out Fail');
        }
    }
}


