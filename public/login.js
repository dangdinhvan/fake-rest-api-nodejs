$(function () {
    $.ajax("https://create-server-by-van.herokuapp.com/users", {
        method: "GET"
    });
});

// hàm gọi yêu cầu đăng nhập
function login() {
    if ($('#user').val() === '' || $('#password').val() === '') {
        if($('#user').val() === ''){
            $('#result').html('Bạn cần nhập tên đăng nhập').css('color', 'red').css('font-size', '15px');
        }
        else if($('#password').val() === ''){
            $('#result').html('Bạn cần nhập mật khẩu').css('color', 'red').css('font-size', '15px');
        }
    }
    else {
        $.ajax("https://create-server-by-van.herokuapp.com/login", {
            method: "POST",
            data: {
                "username": $('#user').val(),
                "password": $('#password').val()
            }
        }).done(function () {
            $('#result').html('Đăng nhập thành công').css('color', 'green').css('font-size', '17px');
            setTimeout(() => {
                window.location = "./danh-sach-hoc-vien.html";
            }, 1200);
        }).fail(function () {
            $('#result').html('Tài khoản hoặc mật khẩu không chính xác').css('color', 'red').css('font-size', '14px');
        });
    }
};

// thêm chức nămg enter cho button
$("#login-box").keyup(function (event) {
    if (event.keyCode === 13) {
        login();
    }
});


