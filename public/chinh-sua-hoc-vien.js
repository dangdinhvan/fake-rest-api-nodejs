// lấy thông tin của học viên
const id = location.href.split("?id=")[1];
$.ajax(`https://create-server-by-van.herokuapp.com/users/${id}`, {
  method: "GET",
}).done(function (user) {
  $("#firstName").val(user.firstName);
  $("#lastName").val(user.lastName);
  $("#birthday").val(user.birthday);
  $("#email").val(user.email);
  $("#phone").val(user.phone);
});
//-------------------------------------------

// thay đổi hộp thoại thông báo required
$(function () {
  $("input[name=firstName]")[0].oninvalid = function () {
    this.setCustomValidity("Bạn cần nhập họ");
  };
});

$(function () {
  $("input[name=firstName]")[0].oninput = function () {
    this.setCustomValidity("");
  };
});
//--------------------------------------------------------

$(function () {
  $("input[name=lastName]")[0].oninvalid = function () {
    this.setCustomValidity("Bạn cần nhập tên");
  };
});

$(function () {
  $("input[name=lastName]")[0].oninput = function () {
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
$("#save-btn").click(function () {
  if (
    $("#firstName").val() !== "" &&
    $("#lastName").val() !== "" &&
    $("#birthday").val() !== "" &&
    $("#email").val() !== "" &&
    $("#phone").val() !== ""
  ) {
    $.ajax({
      url: `https://create-server-by-van.herokuapp.com/users/${id}`,
      type: "PATCH",
      data: {
        firstName: $("#firstName").val(),
        lastName: $("#lastName").val(),
        birthday: $("#birthday").val(),
        email: $("#email").val(),
        phone: $("#phone").val(),
      },
      dataType: "json",
    }).done(function () {
      alert("Cập nhập thông tin thành công");
      location.href = "/danh-sach-hoc-vien.html";
    });
  }
});
//------------------------------------------
