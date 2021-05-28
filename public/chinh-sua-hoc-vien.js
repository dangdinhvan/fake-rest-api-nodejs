// Hàm chức năng chỉnh sửa thông tin học viên
let id = document.location.href.substring(67);
$.ajax(`https://create-server-by-van.herokuapp.com/users/${id}`, {
    method: "GET"
}).done(function (user) {
    $('#name').val(user.lastName);
    $('#birthday').val(user.birthday);
    $('#email').val(user.email);
    $('#phone').val(user.phone);
});

$('#save-btn').click(function () {
    if ($('#name').val() === '' || $('#birthday').val() === '' || $('#email').val() === '' || $('#phone').val() === '') {
        if ($('#name').val() === '') {
            alert('Bạn cần nhập họ tên');
        }
        else if ($('#birthday').val() === '') {
            alert('Bạn cần nhập ngày tháng năm sinh');
        }
        else if ($('#email').val() === '') {
            alert('Bạn cần nhập email');
        }
        else if ($('#phone').val() === '') {
            alert('Bạn cần nhập số điện thoại');
        }
    }
    else {
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
            window.history.back();
            $.ajax("http://localhost:3000/users", {
                method: "GET"
            });
        });
    }
});
//------------------------------------------