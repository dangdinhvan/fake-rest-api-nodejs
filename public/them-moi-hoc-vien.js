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

// Hàm chức năng thêm học viên
$('#save-btn').click(function () {
    if ($('#name').val() !== '' && $('#birthday').val() !== '' && $('#email').val() !== '' && $('#phone').val() !== '') {
        $.ajax({
            type: 'POST',
            url: "https://create-server-by-van.herokuapp.com/users",
            data: {
                "firstName": '',
                "lastName": $('#name').val(),
                "birthday": $('#birthday').val(),
                "email": $('#email').val(),
                "phone": $('#phone').val()
            },
            dataType: 'json'
        }).done(function () {
            alert('Thêm mới thành công');
            window.location="./danh-sach-hoc-vien.html";
        });
    }
});
//-----------------------------