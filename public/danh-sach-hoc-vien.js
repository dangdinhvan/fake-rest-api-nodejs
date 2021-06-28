const DOMAIN = "https://create-server-by-van.herokuapp.com";
const limitOnePage = 2;

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
    });
  });
}
//-----------------------------

// Hàm chức năng tìm kiếm
function search() {
  if ($('#search-box').val() === "") {
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
      if(content===""){
        $("#alert-for-no-result-search").html('Không có kết quả phù hợp');
      }
      $("#table-users").html(content);
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
  $.ajax(DOMAIN + '/users?_page=1&_limit=' + limitOnePage + "&_sort=id&_order=desc", {
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
    $(`.btn-1`).css('background-color', 'black').css('color','white');
  })
}
paginate();

//-----------------------------------------

// Bấm vào số trang để hiện trang tương ứng
function pagiNation(pageNumber, totalPage) {
  $.ajax(DOMAIN + `/users?_page=${pageNumber}&_limit=` + limitOnePage + "&_sort=id&_order=desc", {
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
    $(`.btn-${pageNumber}`).css('background-color', 'black').css('color','white');
    for(let i=1;i<=totalPage;i++){
      if(i!==pageNumber){
        $(`.btn-${i}`).css('background-color', 'white').css('color','black');
      }
    }
  });
}
//-----------------------------------

// Hàm Sort
function sort() {
}
//--------------------------------------