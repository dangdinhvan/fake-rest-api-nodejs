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

// ham check validate email
function validateEmail() {
  const email = $("#email").val();
  const regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

// Hàm chức năng thêm học viên
$("#save-btn").click(function () {
  if (
    $("#firstName").val() !== "" &&
    $("#lastName").val() !== "" &&
    $("#birthday").val() !== "" &&
    $("#email").val() !== "" &&
    $("#phone").val() !== "" &&
    validateEmail() === true
  ) {
    $.ajax({
      type: "POST",
      url: "https://create-server-by-van.herokuapp.com/users",
      data: {
        firstName: $("#firstName").val(),
        lastName: $("#lastName").val(),
        birthday: $("#birthday").val(),
        email: $("#email").val(),
        phone: $("#phone").val(),
      },
      dataType: "json",
    }).done(function () {
      alert("Thêm mới thành công");
      location.href = "/danh-sach-hoc-vien.html";
    });
  }
});
//-----------------------------
