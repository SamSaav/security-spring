function login(){
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var dto = {"email": email, "password": password};
    var json = JSON.stringify(dto);
        var url = 'http://localhost:8083/api/login?email='+email+'&password='+password;
        var http = new XMLHttpRequest();

        http.open("POST", url, true);
        http.setRequestHeader('Content-Type', 'application/json');
        http.onload = function () {
            if (http.readyState === 4 && http.status === 200) {
                window.location.replace('http://localhost:8083/web/admin/index.html');
            }else{
                window.location.replace('http://localhost:8083/web/login.html');
            }
        }
        http.send(json);
}

