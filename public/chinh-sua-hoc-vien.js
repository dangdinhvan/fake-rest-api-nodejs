// lấy thông tin của học viên
let id = document.location.href.substring(67);
$.ajax(`https://create-server-by-van.herokuapp.com/users/${id}`, {
    method: "GET"
}).done(function (user) {
    $('#name').val(user.lastName);
    $('#birthday').val(user.birthday);
    $('#email').val(user.email);
    $('#phone').val(user.phone);
});
//-------------------------------------------

// thay đổi hộp thoại thông báo required
$(function () {
    $("input[name=name]")[0].oninvalid = function () {
        this.setCustomValidity("Bạn cần nhập họ và tên");
    };
});

$(function () {
    $("input[name=name]")[0].oninput = function () {
        this.setCustomValidity("");
    };
});
//--------------------------------------------------------
$(function () {
    $("input[name=birth-day]")[0].oninvalid = function () {
        this.setCustomValidity("Bạn cần nhập ngày tháng năm sinh");
    };
});

$(function () {
    $("input[name=birth-day]")[0].oninput = function () {
        this.setCustomValidity("");
    };
});
//--------------------------------------------------------
$(function () {
    $("input[name=email]")[0].oninvalid = function () {
        this.setCustomValidity("Bạn cần nhập email");
    };
});

$(function () {
    $("input[name=email]")[0].oninput = function () {
        this.setCustomValidity("");
    };
});
//--------------------------------------------------------
$(function () {
    $("input[name=phone]")[0].oninvalid = function () {
        this.setCustomValidity("Bạn cần nhập số điện thoại");
    };
});

$(function () {
    $("input[name=phone]")[0].oninput = function () {
        this.setCustomValidity("");
    };
});
//--------------------------------------------------------

// Hàm chức năng chỉnh sửa thông tin học viên
$('#save-btn').click(function () {
    if ($('#name').val() !== '' && $('#birthday').val() !== '' && $('#email').val() !== '' && $('#phone').val() !== '') {
        $.ajax({
            type: 'PATCH',
            url: `https://create-server-by-van.herokuapp.com/users/${id}`,
            data: {
                "firstName": '',
                "lastName": $('#name').val(),
                "birthday": $('#birthday').val(),
                "email": $('#email').val(),
                "phone": $('#phone').val()
            },
            dataType: 'json'
        }).done(function () {
            alert('Cập nhập thông tin thành công');
            window.location="./danh-sach-hoc-vien.html";
        });
    }
});
//------------------------------------------
