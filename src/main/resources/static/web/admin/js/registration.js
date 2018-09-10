function registration() {
    var name = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("userEmail").value;
    var password = document.getElementById("userPassword").value;
    var role = document.getElementById("RoleOptions").value;

    var url = 'http://localhost:8083/api/user?name='+name+'&lastName='+lastName+'&email='+email+'&password='+password+'&role='+role;
    var http = new XMLHttpRequest();

    var json = JSON.stringify();

    http.open("POST", url,true);
    http.setRequestHeader('Content-Type', 'application/json');
    http.onload = function () {
        if (http.readyState === 4 && http.status === 200) {
            window.location.replace('http://localhost:8083/web/admin/index.html');
        }else{
            window.location.replace('http://localhost:8083/web/registration.html');
        }
    }
    http.send(json);
}