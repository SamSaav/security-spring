function valuesEmployee(){

    var employee = {name:document.getElementById("firstName").value, lastName:document.getElementById("lastName").value, 
    enterpriseID:document.getElementById("enterpriseId").value, resourceNumber:document.getElementById("resourceNumber").value, 
    gender:document.getElementById("Gender").value, resourceRole : document.getElementById("ResourceRole").value, 
    englishLevel : document.getElementById("EnglishLevel").value, 
    officeLocation : document.getElementById("OfficeLocation").value, 
    client : document.getElementById("client").value, 
    project : document.getElementById("project").value};
    return employee;

}

function valuesUsers(){
    var user = {name: document.getElementById("firstName").value, lastName: document.getElementById("lastName").value, 
    email: document.getElementById("userEmail").value, 
    password: document.getElementById("userPassword").value, 
    confPassword: document.getElementById("userConfirmPassword").value, 
    role: document.getElementById("RoleOptions").value};
    return user;

}

function validateControl(e) {
  if(!e.checkValidity()) {
    if(e.classList.contains('valid')) {
      e.classList.remove('valid');
    }
    e.classList.add('invalid');
  } else {
    if(e.classList.contains('invalid')) {
      e.classList.remove('invalid');
    }
    e.classList.add('valid');
  }
}

function registrationEmployee() {
   if(!document.querySelector('form').checkValidity()) {
      alert('El formulario tiene errores');
   }

   else{
    var employee = valuesEmployee();

    var url = "http://localhost:8083/api/admin/createEmployee";
    var http = new XMLHttpRequest();
    var json = JSON.stringify(employee);
    http.open("POST", url, true);
    http.setRequestHeader('Content-Type', 'application/json');
    http.onload = function () {
            if (http.readyState === 4 && http.status === 201) {
                window.location.replace('http://localhost:8083/web/admin/index.html');
            } 
            else if(http.status===406){
                alert ("Resource Number o Enterprise Id ya existe");
                window.location.replace('http://localhost:8083/web/admin/registrationEmployee.html');
            }
            else {
                alert("The registration fail");
                window.location.replace('http://localhost:8083/web/admin/registrationEmployee.html');
            }
        }
        http.send(json);


   }

}


function registration() {

    var user = valuesUsers();

    if (user.password === user.confPassword) {
        var url = 'http://localhost:8083/api/user?name=' + user.name + '&lastName=' + user.lastName + '&email=' + user.email + '&password=' + user.password + '&role=' + user.role;
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

function buttonEditEmployee(id) {
    sessionStorage.setItem("employeeId", id);
    window.location.replace('http://localhost:8083/web/admin/employeesUpdate.html');
}



function buttonDelete(id) {
    var url = "http://localhost:8083/api/admin/delete/" + id;
    var http = new XMLHttpRequest();

    http.open("DELETE", url, true);
    http.onload = function () {
        if (http.readyState === 4 && http.status === 200) {
            window.location.replace('http://localhost:8083/web/admin/usersInactive.html');
        } else {
            alert('Fail');
            window.location.replace('http://localhost:8083/web/admin/usersActive.html');
        }
    }

    http.send();
}

function buttonDeleteEmployee(id) {
    var url = "http://localhost:8083/api/deleteEmployee/"+id;
    var http = new XMLHttpRequest();

    http.open("DELETE", url, true);
    http.onload = function () {
        if (http.readyState === 4 && http.status === 200) {
            window.location.replace('http://localhost:8083/web/admin/employeesInactive.html');
        } else {
            alert('Fail');
            window.location.replace('http://localhost:8083/web/admin/employeesActive.html');
        }
    }

    http.send();
}

function buttonAbsolutDelete(id) {
    var url = "http://localhost:8083/api/admin/permanentDelete/" + id;
    var http = new XMLHttpRequest();

    http.open("DELETE", url, true);
    http.onload = function () {
        if (http.readyState === 4 && http.status === 200) {
            window.location.replace('http://localhost:8083/web/admin/usersInactive.html');
        } else {
            alert('Fail');
            window.location.replace('http://localhost:8083/web/admin/usersActive.html');
        }
    }

    http.send();
}
function buttonAbsolutDeleteEmployee(id) {
    var url = "http://localhost:8083/api/permanentDelete/"+id;
    var http = new XMLHttpRequest();

    http.open("DELETE", url, true);
    http.onload = function () {
        if (http.readyState === 4 && http.status === 200) {
            window.location.replace('http://localhost:8083/web/admin/employeesInactive.html');
        } else {
            alert('Fail');
            window.location.replace('http://localhost:8083/web/admin/employeesActive.html');
        }
    }

    http.send();
}

function movePage (page) {
    window.location.replace('http://localhost:8083/web/admin/' + page + '.html');
}

function update() {
    'use strict';
    var id = sessionStorage.getItem("userId");
    var user =  valuesUsers();
    
    if (user.name === "") {
        user.name = null;
    }
    if (user.lastName === "") {
        user.lastName = null;
    }
    if (user.email === "") {
        user.email = null;
    }
    if (user.password === "") {
        user.password = null;
    }
    if (user.confPassword === "") {
        user.password = null;
    }
    if (user.role === "--") {
        user.role = null;
    }

    if (password === null) {
        var url = 'http://localhost:8083/api/admin/update/' + id;
        var http = new XMLHttpRequest();
       

        var json = JSON.stringify(user);

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
        var url = 'http://localhost:8083/api/admin/update/' + id;
        var http = new XMLHttpRequest();


        var json = JSON.stringify(user);

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

function updateEmployee() {
    'use strict';
    var id = sessionStorage.getItem("employeeId");
    var employee =  valuesEmployee();

    var url = 'http://localhost:8083/updateEmployee/' + id;
    var http = new XMLHttpRequest();

    var json = JSON.stringify(employee);

    http.open("PUT", url, true);
    http.setRequestHeader('Content-Type', 'application/json');
    http.onload = function () {
        if (http.readyState === 4 && http.status === 200) {
            sessionStorage.removeItem("employeeId");
            window.location.replace('http://localhost:8083/web/admin/employeesActive.html');
        } else {
            alert("The update fail");
            window.location.replace('http://localhost:8083/web/admin/employeesUpdate.html');
        }
    }
        http.send(json);
}
