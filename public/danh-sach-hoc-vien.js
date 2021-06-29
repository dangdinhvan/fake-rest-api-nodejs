const DOMAIN = "https://create-server-by-van.herokuapp.com";
const limitOnePage = 2;
let attribute = "id";
let direction = "desc";

// Hàm chức năng xóa
function del(id) {
  $('.modal-content').css('visibility', 'visible');
  $('.btn-primary').click(function () {
    $.ajax(DOMAIN + `/users/${id}`, {
      method: "DELETE"
    }).done(function () {
      $('.modal-content').css('visibility', 'hidden');
      setTimeout(() => {
        $('.modal').modal('hide');
        $(`#${id}`).remove();
      }, 100);
      paginate();
    });
  });
}
//-----------------------------

// Hàm chức năng tìm kiếm
function search() {
  if ($('#search-box').val() === "") {
    $("#table-users").html('');
    $("#alert-for-no-result-search").html('Không có kết quả phù hợp');
  }
  else {
    $.ajax(DOMAIN + `/users?q=${$('#search-box').val()}`, {
      method: "GET"
    }).done(function (users) {
      let content = "";
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        content += `<tr id="${user.id}">
                    <td>${user.firstName} ${user.lastName}</td>
                    <td>${user.birthday}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>
                        <span id="edit-del-btn">
                        <a class="edit-btn" href="./chinh-sua-hoc-vien.html?id=${user.id}")"><i class="fas fa-edit icon"></i>Chỉnh
                        sửa</a>
                        | 
                        <button class="del-btn" onclick="del(${user.id})" data-bs-toggle="modal" data-bs-target="#exampleModal"><i
                            class="fas fa-trash-alt icon"></i>Xóa</button>
                        </span>
                    </td>
                  </tr>`;
      }
      if (content === "") {
        $("#table-users").html('');
        $("#alert-for-no-result-search").html('Không có kết quả phù hợp');
      }
      else {
        $("#table-users").html(content);
        $("#alert-for-no-result-search").css('display', 'none');
      }
    });
  }
}



$("#search-box").keyup(function (event) {
  if (event.keyCode === 13) {
    search();
  }
});
//------------------------------

// Hàm chức năng phân trang
function paginate() {
  $.ajax(DOMAIN + '/users?_page=1&_limit=' + limitOnePage + `&_sort=${attribute}&_order=${direction}`, {
    method: "GET"
  }).done(function (users, textStatus, request) {
    let totalPage = Math.ceil(request.getResponseHeader('x-Total-Count') / limitOnePage);
    let content = "";
    let contentPagination = "";

    for (let i = 0; i < users.length; i++) {
      const user = users[i];

      content += `<tr id="${user.id}">
                    <td>${user.firstName} ${user.lastName}</td>
                    <td>${user.birthday}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>
                        <span id="edit-del-btn">
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

    for (let i = 1; i <= totalPage; i++) {
      contentPagination += `<button class="paginate-btn btn-${i}" onclick="pagiNation(${i},${totalPage})">${i}</button>`
    }
    $('#paginate-box').html(contentPagination);
    $(`.btn-1`).css('background-color', 'black').css('color', 'white');
  })
}
paginate();

//-----------------------------------------

// Bấm vào số trang để hiện trang tương ứng
function pagiNation(pageNumber, totalPage) {
  $.ajax(DOMAIN + `/users?_page=${pageNumber}&_limit=` + limitOnePage + `&_sort=${attribute}&_order=${direction}`, {
    method: "GET"
  }).done(function (users) {
    let content = "";
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      content += `<tr id="${user.id}">
                    <td>${user.firstName} ${user.lastName}</td>
                    <td>${user.birthday}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>
                        <span id="edit-del-btn">
                        <a class="edit-btn" href="./chinh-sua-hoc-vien.html?id=${user.id}")"><i class="fas fa-edit icon"></i>Chỉnh
                        sửa</a>
                        | 
                        <button class="del-btn" onclick="del(${user.id})" data-bs-toggle="modal" data-bs-target="#exampleModal"><i
                            class="fas fa-trash-alt icon"></i>Xóa</button>
                        </span>
                    </td>
                  </tr>`;
    }
    $("#table-users").html(content);
    $(`.btn-${pageNumber}`).css('background-color', 'black').css('color', 'white');
    for (let i = 1; i <= totalPage; i++) {
      if (i !== pageNumber) {
        $(`.btn-${i}`).css('background-color', 'white').css('color', 'black');
      }
    }
  });
}
//-----------------------------------

// Hàm Sort
let demName = 0;
let demBirthday = 0;
let demEmail = 0;
let demPhone = 0;
let tempName = true;
let tempBirthday = true;
let tempEmail = true;
let tempPhone = true;

function sortName() {
  demName++;
  if (demName % 3 === 0) {
    attribute = "id";
    direction = "desc";
    $('.caret-name-up').css('visibility', 'visible');
    $('.caret-name-down').css('visibility', 'visible');
  }
  else {
    attribute = "lastName";
    if (tempName === true) {
      direction = "asc";
      tempName = false;
      $('.caret-name-up').css('visibility', 'visible');
      $('.caret-name-down').css('visibility', 'hidden');
      $('.caret-birthday-up').css('visibility', 'visible');
      $('.caret-birthday-down').css('visibility', 'visible');
      $('.caret-email-up').css('visibility', 'visible');
      $('.caret-email-down').css('visibility', 'visible');
      $('.caret-phone-up').css('visibility', 'visible');
      $('.caret-phone-down').css('visibility', 'visible');
    }
    else {
      direction = "desc";
      tempName = true;
      $('.caret-name-up').css('visibility', 'hidden');
      $('.caret-name-down').css('visibility', 'visible');
      $('.caret-birthday-up').css('visibility', 'visible');
      $('.caret-birthday-down').css('visibility', 'visible');
      $('.caret-email-up').css('visibility', 'visible');
      $('.caret-email-down').css('visibility', 'visible');
      $('.caret-phone-up').css('visibility', 'visible');
      $('.caret-phone-down').css('visibility', 'visible');
    }
  }
  $.ajax(DOMAIN + '/users?_page=1&_limit=' + limitOnePage + `&_sort=${attribute}&_order=${direction}`, {
    method: "GET"
  }).done(paginate())
}

function sortBirthday() {
  demBirthday++;
  if (demBirthday % 3 === 0) {
    attribute = "id";
    direction = "desc";
    $('.caret-birthday-up').css('visibility', 'visible');
    $('.caret-birthday-down').css('visibility', 'visible');
  }
  else {
    attribute = "birthday";
    if (tempBirthday === true) {
      direction = "asc";
      tempBirthday = false;
      $('.caret-birthday-up').css('visibility', 'visible');
      $('.caret-birthday-down').css('visibility', 'hidden');
      $('.caret-name-up').css('visibility', 'visible');
      $('.caret-name-down').css('visibility', 'visible');
      $('.caret-email-up').css('visibility', 'visible');
      $('.caret-email-down').css('visibility', 'visible');
      $('.caret-phone-up').css('visibility', 'visible');
      $('.caret-phone-down').css('visibility', 'visible');
    }
    else {
      direction = "desc";
      tempBirthday = true;
      $('.caret-birthday-up').css('visibility', 'hidden');
      $('.caret-birthday-down').css('visibility', 'visible');
      $('.caret-name-up').css('visibility', 'visible');
      $('.caret-name-down').css('visibility', 'visible');
      $('.caret-email-up').css('visibility', 'visible');
      $('.caret-email-down').css('visibility', 'visible');
      $('.caret-phone-up').css('visibility', 'visible');
      $('.caret-phone-down').css('visibility', 'visible');
    }
  }
  $.ajax(DOMAIN + '/users?_page=1&_limit=' + limitOnePage + `&_sort=${attribute}&_order=${direction}`, {
    method: "GET"
  }).done(paginate())
}

function sortEmail() {
  demEmail++;
  if (demEmail % 3 === 0) {
    attribute = "id";
    direction = "desc";
    $('.caret-email-up').css('visibility', 'visible');
    $('.caret-email-down').css('visibility', 'visible');
  }
  else {
    attribute = "email";
    if (tempEmail === true) {
      direction = "asc";
      tempEmail = false;
      $('.caret-email-up').css('visibility', 'visible');
      $('.caret-email-down').css('visibility', 'hidden');
      $('.caret-name-up').css('visibility', 'visible');
      $('.caret-name-down').css('visibility', 'visible');
      $('.caret-birthday-up').css('visibility', 'visible');
      $('.caret-birthday-down').css('visibility', 'visible');
      $('.caret-phone-up').css('visibility', 'visible');
      $('.caret-phone-down').css('visibility', 'visible');
    }
    else {
      direction = "desc";
      tempEmail = true;
      $('.caret-email-up').css('visibility', 'hidden');
      $('.caret-email-down').css('visibility', 'visible');
      $('.caret-name-up').css('visibility', 'visible');
      $('.caret-name-down').css('visibility', 'visible');
      $('.caret-birthday-up').css('visibility', 'visible');
      $('.caret-birthday-down').css('visibility', 'visible');
      $('.caret-phone-up').css('visibility', 'visible');
      $('.caret-phone-down').css('visibility', 'visible');
    }
  }
  $.ajax(DOMAIN + '/users?_page=1&_limit=' + limitOnePage + `&_sort=${attribute}&_order=${direction}`, {
    method: "GET"
  }).done(paginate())
}

function sortPhone() {
  demPhone++;
  if (demPhone % 3 === 0) {
    attribute = "id";
    direction = "desc";
    $('.caret-phone-up').css('visibility', 'visible');
    $('.caret-phone-down').css('visibility', 'visible');
  }
  else {
    attribute = "phone";
    if (tempPhone === true) {
      direction = "asc";
      tempPhone = false;
      $('.caret-phone-up').css('visibility', 'visible');
      $('.caret-phone-down').css('visibility', 'hidden');
      $('.caret-name-up').css('visibility', 'visible');
      $('.caret-name-down').css('visibility', 'visible');
      $('.caret-birthday-up').css('visibility', 'visible');
      $('.caret-birthday-down').css('visibility', 'visible');
      $('.caret-email-up').css('visibility', 'visible');
      $('.caret-email-down').css('visibility', 'visible');
    }
    else {
      direction = "desc";
      tempPhone = true;
      $('.caret-phone-up').css('visibility', 'hidden');
      $('.caret-phone-down').css('visibility', 'visible');
      $('.caret-name-up').css('visibility', 'visible');
      $('.caret-name-down').css('visibility', 'visible');
      $('.caret-birthday-up').css('visibility', 'visible');
      $('.caret-birthday-down').css('visibility', 'visible');
      $('.caret-email-up').css('visibility', 'visible');
      $('.caret-email-down').css('visibility', 'visible');
    }
  }
  $.ajax(DOMAIN + '/users?_page=1&_limit=' + limitOnePage + `&_sort=${attribute}&_order=${direction}`, {
    method: "GET"
  }).done(paginate())
}
//--------------------------------------