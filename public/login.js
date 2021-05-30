$(function () {
    $.ajax("https://create-server-by-van.herokuapp.com/users", {
        method: "GET"
    });
});

$(function () {
    $("input[name=username]")[0].oninvalid = function () {
        this.setCustomValidity("Bạn cần nhập tên đăng nhập");
    };
});

$(function () {
    $("input[name=username]")[0].oninput = function () {
        this.setCustomValidity("");
    };
});

$(function () {
    $("input[name=password]")[0].oninvalid = function () {
        this.setCustomValidity("Bạn cần nhập mật khẩu");
    };
});

$(function () {
    $("input[name=password]")[0].oninput = function () {
        this.setCustomValidity("");
    };
});

$('#submit-button').click(function () {
    if ($('#user').val() !== '' && $('#password').val() !== '') {
        $.ajax("https://create-server-by-van.herokuapp.com/login", {
            method: "POST",
            data: {
                "username": $('#user').val(),
                "password": $('#password').val()
            }
        }).done(function () {
            $('#result').html('Đăng nhập thành công!').css('color', 'green');
            
            window.location = "./danh-sach-hoc-vien.html";

        }).fail(function () {
            $('#result').html('Tài khoản hoặc mật khẩu không chính xác!').css('color', 'red');
        });
    }
});


