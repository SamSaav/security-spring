function login(){
    'use strict';
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var role;

    var GETurl = 'http://localhost:8083/api/userEmail?email='+email;
    var request = new XMLHttpRequest();
    request.open("GET", GETurl, true);
    request.responseType = 'json';
    request.onload = function () {
        if (request.readyState === 4 && request.status === 200) {
            'use strict';
            var user = request.response;
            role = user.role.role;
        } else {
            role = 'INVALID';
        }

    }
    request.send()


    var dto = {"email": email, "password": password};
    var json = JSON.stringify(dto);
    var POSTurl = 'http://localhost:8083/api/login?email='+email+'&password='+password;
    var http = new XMLHttpRequest();

    http.open("POST", POSTurl, true);
    http.setRequestHeader('Content-Type', 'application/json');
    http.onload = function () {
        if (http.readyState === 4 && http.status === 200) {
            //var role = getUserRole(email);
            if (role === 'ADMIN'){
                window.location.replace('http://localhost:8083/web/admin/index.html');
            } else if (role === 'VEEDOR'){
                window.location.replace('http://localhost:8083/web/veedor/index.html');
            } else {
                return 'ERROR';
            }
        }else{
            window.location.replace('http://localhost:8083/web/login.html');
        }
    }
    http.send(json);
}


