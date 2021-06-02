const DOMAIN = "https://create-server-by-van.herokuapp.com";
// Hàm chức năng vẽ giao diện và nội dung
function loadDocJQuery() {
  $.ajax(DOMAIN + "/users", {
    method: "GET"
  }).done(function (users) {
    let content = "";

    for (let i = 0; i < users.length; i++) {
      const user = users[i];

      content += `<tr id="${user.id}">
                    <td>${user.firstName} ${user.lastName}</td>
                    <td>${user.birthday}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}
                    <span>
                      <a class="edit-btn" href="./chinh-sua-hoc-vien.html?id=${user.id}")"><i class="fas fa-edit icon"></i>Chỉnh
                        sửa</a>
                      | 
                      <button class="del-btn" onclick="del(${user.id})" data-bs-toggle="modal" data-bs-target="#exampleModal"><i
                            class="fas fa-trash-alt icon"></i>Xóa</button>
                    </span>
        </td>
    </tr>`;
    };

    $("#table-users").html(content);
  });
};

$(function () {
  loadDocJQuery();
});
//-----------------------------

// Hàm chức năng xóa
function del(id) {
  $('.modal-content').css('visibility', 'visible');
  $('.btn-primary').click(function () {
    $.ajax(DOMAIN + `/users/${id}`, {
      method: "DELETE"
    }).done(function () {
      $('.modal-content').css('visibility', 'hidden');
      setTimeout(() => {
        alert('Đã xóa thành công');
        $('.modal').modal('hide');
        $(`#${id}`).remove();
      }, 100);
    });
  });
}
//-----------------------------