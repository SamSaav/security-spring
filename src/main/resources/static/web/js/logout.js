function logout() {
    'use strict';
    var url = "http://localhost:8083/api/logout";
    var http = new XMLHttpRequest();

    http.open("GET", url, true);
    http.responseType = 'json';
    http.send();

    http.onload = function () {
        if (http.readyState === 4 && http.status === 200){
            window.location.replace('http://localhost:8083/web/login.html');
        } else {
            alert('Log out Fail');
        }
    }
}