var url = 'http://localhost:8083/api/users';
var http = new XMLHttpRequest();

http.open("GET", url, true);
http.responseType = 'json';
http.send();
http.onload = function () {
    if (http.readyState === 4 && http.status === 200) {
        'use strict';
        var users = http.response;
        tabla(users);
    }
};

function tabla(jsonObj) {
    'use strict';

    var bodyUsers = document.getElementById('bodyUsers');

    var users = jsonObj.users;

	for (var i = 0; i < 5; i++) {
		var tr1 = document.createElement('tr');
		var td2 = document.createElement('td');
		td2.setAttribute('class', 'col-xs-2');
		var td3 = document.createElement('td');
		td3.setAttribute('class', 'col-xs-2');
		var td4 = document.createElement('td');
		td4.setAttribute('class', 'col-xs-2');

		td2.textContent = users[i].name;
		td3.textContent = users[i].lastName;
		td4.textContent = users[i].email;

        tr1.append(td2);
        tr1.append(td3);
        tr1.append(td4);

        bodyUsers.append(tr1);

    }

    var tr2 = document.createElement('tr');
    var button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'btn btn-dark');
    button.setAttribute('onclick', 'movePage(users)');

    button.textContent = 'See more';

    tr2.append(button);

    bodyUsers.append(tr2);

    div.append(bodyUsers);

	main.append(div1);
	main.append(div);
	main.append(div2);

}

function movePage (page) {
	window.location.replace('http://localhost:8083/web/admin/'+page+'.html');
}