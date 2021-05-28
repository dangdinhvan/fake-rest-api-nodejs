// Hàm chức năng thêm học viên
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
            type: 'POST',
            url: "http://localhost:3000/users",
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
            window.history.back();
        });
    }
});
//-----------------------------