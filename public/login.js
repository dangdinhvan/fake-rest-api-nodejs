$.ajax("https://create-server-by-van.herokuapp.com/users", {
        method: "GET"
    });
$('#submit-button').click(function () {
    $.ajax("https://create-server-by-van.herokuapp.com/login", {
        method: "POST",
        data: {
            "username": $('#user').val(),
            "password": $('#password').val()
        }
    }).done(function () {
        location.href="./danh-sach-hoc-vien.html";
    }).fail(function () {
            console.log('Username or password is incorrect!')
    })
});


