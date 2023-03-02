import Image from "next/image";
import * as micromustache from "micromustache";

// show popup add user
let overLay: any = document.querySelector(".overlay");
overLay.style.display = "none";

let addUser: any = document.querySelector(".add-user-button");
addUser.onclick = function () {
  overLay.style.display = "flex";
};

// close popup add user
let closeIcon: any = document.querySelector(".close-icon");
closeIcon.onclick = function () {
  overLay.style.display = "none";
};

let denyBtn: any = document.querySelector(".deny-btn");
denyBtn.onclick = function () {
  overLay.style.display = "none";
};

var overLay2: any = document.querySelector(".overlay2");
overLay2.style.display = "none";

// get api
var currentPage = 1;
var numberPages: any;
var rowPerPage = 3;

var memberApi = `http://localhost:3000/member`;
var tableMember: any = document.querySelector("#table-member");
var creatBtn: HTMLButtonElement | null = document.querySelector(".agree-btn");

const button_previousPage = document.getElementById("button_previousPage");
const button_nextPage = document.getElementById("button_nextPage");

let count: any;

async function startApps() {
  await getMemberApi();
  creatForm();
}
startApps();

// creat page-split
function createPageSplit() {
  const template = `<p class="page{{select}}" id="pageNum{{id}}" onclick=loadMemberApi({{id}})>{{id}}</p>`;
  numberPages = Math.ceil(count / rowPerPage);
  var html = "";

  html += micromustache.render(template, {
    id: 1,
    select: currentPage == 1 ? " select" : "",
  });

  if (numberPages > 7) {
    if (currentPage <= 3) {
      for (let i = 2; i <= 5; i++) {
        html += micromustache.render(template, {
          id: i,
          select: currentPage == i ? " select" : "",
        });
      }
      html += `<p class="page">...</p>`;
    }

    if (currentPage >= 4 && currentPage <= numberPages - 3) {
      if (currentPage != 4) {
        html += `<p class="page">...</p>`;
      }
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        html += micromustache.render(template, {
          id: i,
          select: currentPage == i ? " select" : "",
        });
      }
      if (currentPage != numberPages - 3) {
        html += `<p class="page">...</p>`;
      }
    }

    if (currentPage >= numberPages - 2) {
      html += `<p class="page">...</p>`;
      for (let i = numberPages - 4; i <= numberPages - 1; i++) {
        html += micromustache.render(template, {
          id: i,
          select: currentPage == i ? " select" : "",
        });
      }
    }
  } else {
    for (let i = 2; i <= numberPages - 1; i++) {
      html += micromustache.render(template, {
        id: i,
        select: currentPage == i ? " select" : "",
      });
    }
  }

  html += micromustache.render(template, {
    id: numberPages,
    select: currentPage == numberPages ? " select" : "",
  });
  const pageNumber = document.getElementById("pageNumber");
  if (pageNumber) pageNumber.innerHTML = html;
}

function loadMemberApi(page: any) {
  //1
  currentPage = page;
  var start = (page - 1) * rowPerPage;
  var limit = rowPerPage;
  getMemberApi(start, limit); //2
}
//
button_previousPage?.addEventListener("click", () => {
  if (currentPage > 1) {
    loadMemberApi(currentPage - 1);
  } else {
    loadMemberApi(numberPages);
  }
});
button_nextPage?.addEventListener("click", () => {
  if (currentPage < numberPages) {
    loadMemberApi(currentPage + 1);
  } else {
    loadMemberApi(1);
  }
});

function renderMemberApi(members: any) {
  window.members = members;
  var htmls = members.map(function (member: any) {
    return `
                <tr class="data-user" id="memberID${member.id}">
                    <td><img src="${member.avt}"/></td>
                    <td>${member.msv}</td>
                    <td>${member.name}</td>
                    <td>${member.class}</td>
                    <td>${member.ban}</td>
                    <td>${member.role}</td>
                    <td>
                    <div onclick="handleUpdateMember(${member.id})" class="update-button" id="update-item-${member.id}"><span><svg class='line' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><g transform='translate(3.500000, 3.500000)'><line x1='9.8352' y1='16.0078' x2='16.2122' y2='16.0078'></line><path d='M12.5578,1.3589 L12.5578,1.3589 C11.2138,0.3509 9.3078,0.6229 8.2998,1.9659 C8.2998,1.9659 3.2868,8.6439 1.5478,10.9609 C-0.1912,13.2789 1.4538,16.1509 1.4538,16.1509 C1.4538,16.1509 4.6978,16.8969 6.4118,14.6119 C8.1268,12.3279 13.1638,5.6169 13.1638,5.6169 C14.1718,4.2739 13.9008,2.3669 12.5578,1.3589 Z'></path><line x1='7.0041' y1='3.7114' x2='11.8681' y2='7.3624'></line></g></svg></span>Update</div>
                    <div onclick="handleDeleteMember(${member.id})" class="delete-button" id="item-${member.id}"><span><svg class='line' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><g transform='translate(3.500000, 2.000000)'><path d='M15.3891429,7.55409524 C15.3891429,15.5731429 16.5434286,19.1979048 8.77961905,19.1979048 C1.01485714,19.1979048 2.19295238,15.5731429 2.19295238,7.55409524'></path><line x1='16.8651429' y1='4.47980952' x2='0.714666667' y2='4.47980952'></line><path d='M12.2148571,4.47980952 C12.2148571,4.47980952 12.7434286,0.714095238 8.78914286,0.714095238 C4.83580952,0.714095238 5.36438095,4.47980952 5.36438095,4.47980952'></path></g></svg></span>Delete</div>
                    </td>
                </tr>
                `;
  });
  tableMember.innerHTML =
    "" +
    `<tr class="head-table">
            <th>AVT</th>
            <th>MSV</th>
            <th>Họ và Tên</th>
            <th>Lớp</th>
            <th>Ban</th>
            <th>Role</th>
            <th>Orther</th>
        </tr>` +
    htmls.join("");
}

//function rest api
async function getMemberApi(start = 0, limit = rowPerPage) {
  const response = await fetch(memberApi + `?_start=${start}&_limit=${limit}`);
  const data = await response.json();
  if (response.headers.get("x-total-count")) {
    count = response.headers.get("x-total-count");
  } else {
    count = data.length;
  }
  renderMemberApi(data);

  createPageSplit(); //3
}

//render api

// add member
function addMemberApi(data: any, callback: any) {
  var object = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(memberApi, object)
    .then(function (res) {
      return res.json();
    })
    .then(callback);
}

function creatForm() {
  if (creatBtn) {
    creatBtn.onclick = function () {
      overLay.style.display = "none";
      var avt = (
        document.querySelector('input[name="avt"]') as HTMLInputElement
      ).value;
      var msv = (
        document.querySelector('input[name="msv"]') as HTMLInputElement
      ).value;
      var name = (
        document.querySelector('input[name="name"]') as HTMLInputElement
      ).value;
      var classer = (
        document.querySelector('input[name="class"]') as HTMLInputElement
      ).value;
      var ban = (
        document.querySelector('input[name="ban"]') as HTMLInputElement
      ).value;
      var role = (
        document.querySelector('input[name="role"]') as HTMLInputElement
      ).value;

      if (
        avt == "" ||
        msv == "" ||
        name == "" ||
        classer == "" ||
        ban == "" ||
        role == ""
      ) {
        alert("Vui lòng nhập đầy đủ thông tin");
      } else {
        var dataForm = {
          avt: avt,
          msv: msv,
          name: name,
          class: classer,
          ban: ban,
          role: role,
        };

        addMemberApi(dataForm, function () {
          getMemberApi(renderMemberApi);
        });
      }
    };
  }
}

// delete member

function handleDeleteMember(id: any) {
  var object = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(memberApi + "/" + id, object)
    .then(function (data) {
      return data.json();
    })
    .then(function () {
      getMemberApi(renderMemberApi);
    });
}

// update members

var overLay3: any = document.querySelector(".overlay3");
overLay3.style.display = "none";

var optionPopupUpdate = document.querySelector(".ques-operation");

function handleUpdateMember(id: any) {
  overLay3.style.display = "flex";
  document.querySelector('input[name="avtnew"]');

  (document.querySelector('input[name="avtnew"]') as HTMLInputElement).value =
    members.find((u: any) => u.id == id).avt;
  (document.querySelector('input[name="msvnew"]') as HTMLInputElement).value =
    members.find((u: any) => u.id == id).msv;
  (document.querySelector('input[name="namenew"]') as HTMLInputElement).value =
    members.find((u: any) => u.id == id).name;
  (document.querySelector('input[name="classnew"]') as HTMLInputElement).value =
    members.find((u: any) => u.id == id).class;
  (document.querySelector('input[name="bannew"]') as HTMLInputElement).value =
    members.find((u: any) => u.id == id).ban;
  (document.querySelector('input[name="rolenew"]') as HTMLInputElement).value =
    members.find((u: any) => u.id == id).role;

  var htmls = `

        <h4>Bạn có chắc chắn muốn thay đổi?</h4>
        <button class="deny-btn-update" onclick = "updateApi(${id})">Đồng ý</button>
        <button class="close-btn-update" onclick="closePopupUpdate()">Hủy</button>
   `;

  if (optionPopupUpdate) optionPopupUpdate.innerHTML = htmls;
}

function updateApi(id: any) {
  var dataUpdate = {
    avt: (document.querySelector('input[name="avtnew"]') as HTMLInputElement)
      ?.value,
    msv: (document.querySelector('input[name="msvnew"]') as HTMLInputElement)
      ?.value,
    name: (document.querySelector('input[name="namenew"]') as HTMLInputElement)
      ?.value,
    class: (
      document.querySelector('input[name="classnew"]') as HTMLInputElement
    )?.value,
    ban: (document.querySelector('input[name="bannew"]') as HTMLInputElement)
      ?.value,
    role: (document.querySelector('input[name="rolenew"]') as HTMLInputElement)
      ?.value,
  };

  var object = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataUpdate),
  };

  fetch(memberApi + "/" + id, object)
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      const member = data;
      const memberEl = document.getElementById("memberID" + id);
      if (memberEl) {
        memberEl.innerHTML =
          "" +
          `<td><img src="${member.avt}"/></td>
                <td>${member.msv}</td>
                <td>${member.name}</td>
                <td>${member.class}</td>
                <td>${member.ban}</td>
                <td>${member.role}</td>
                <td>
                <div onclick="handleUpdateMember(${member.id})" class="update-button" id="update-item-${member.id}"><span><svg class='line' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><g transform='translate(3.500000, 3.500000)'><line x1='9.8352' y1='16.0078' x2='16.2122' y2='16.0078'></line><path d='M12.5578,1.3589 L12.5578,1.3589 C11.2138,0.3509 9.3078,0.6229 8.2998,1.9659 C8.2998,1.9659 3.2868,8.6439 1.5478,10.9609 C-0.1912,13.2789 1.4538,16.1509 1.4538,16.1509 C1.4538,16.1509 4.6978,16.8969 6.4118,14.6119 C8.1268,12.3279 13.1638,5.6169 13.1638,5.6169 C14.1718,4.2739 13.9008,2.3669 12.5578,1.3589 Z'></path><line x1='7.0041' y1='3.7114' x2='11.8681' y2='7.3624'></line></g></svg></span>Update</div>
                <div onclick="handleDeleteMember(${member.id})" class="delete-button" id="item-${member.id}"><span><svg class='line' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><g transform='translate(3.500000, 2.000000)'><path d='M15.3891429,7.55409524 C15.3891429,15.5731429 16.5434286,19.1979048 8.77961905,19.1979048 C1.01485714,19.1979048 2.19295238,15.5731429 2.19295238,7.55409524'></path><line x1='16.8651429' y1='4.47980952' x2='0.714666667' y2='4.47980952'></line><path d='M12.2148571,4.47980952 C12.2148571,4.47980952 12.7434286,0.714095238 8.78914286,0.714095238 C4.83580952,0.714095238 5.36438095,4.47980952 5.36438095,4.47980952'></path></g></svg></span>Delete</div>
                </td>`;
        var index = members.findIndex((u: any) => u.id == id);
        members[index] = member;
      }
    });

  overLay3.style.display = "none";
}

function closePopupUpdate() {
  overLay3.style.display = "none";
}

export function User() {
  return (
    <>
      <div className="main-content">
        {/* [Button add user] */}
        <div className="add-user-button">
          <p>Add user</p>
          <span>
            <svg
              className="line"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g transform="translate(2.850300, 2.150000)">
                <path d="M7.072,19.6583 C3.258,19.6583 1.15463195e-13,19.0813 1.15463195e-13,16.7713 C1.15463195e-13,14.4613 3.237,12.3603 7.072,12.3603 C10.886,12.3603 14.144,14.4413 14.144,16.7503 C14.144,19.0593 10.907,19.6583 7.072,19.6583 Z" />
                <path d="M7.07200002,9.066 C9.57500002,9.066 11.605,7.036 11.605,4.533 C11.605,2.029 9.57500002,1.50990331e-14 7.07200002,1.50990331e-14 C4.56900002,1.50990331e-14 2.53897,2.029 2.53897,4.533 C2.53000002,7.027 4.54600002,9.057 7.04000002,9.066 L7.07200002,9.066 Z" />
                <line x1="16.281" y1="5.9791" x2="16.281" y2="9.9891" />
                <line x1="18.3273" y1="7.9839" x2="14.2373" y2="7.9839" />
              </g>
            </svg>
          </span>
        </div>
        {/* [Bảng thông tin user ] */}
        <div className="user-table">
          <div>
            <div style={{ height: 50 }} />
            <div className="title-table">
              <p>Thông tin thành viên</p>
            </div>
            <table id="table-member"></table>
          </div>
        </div>
        {/* [Phân trang-] */}
        <div className="page-split">
          <div className="back-button" id="button_previousPage">
            <svg
              className="line"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g transform="translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) translate(5.000000, 8.500000)">
                <path d="M14,0 C14,0 9.856,7 7,7 C4.145,7 0,0 0,0" />
              </g>
            </svg>
          </div>
          <div className="page-number" id="pageNumber">
            {/*[Data-mẫu]*/}
            <p className="page select">1</p>
            {/* <p class="page">2</p>
  <p class="page">3</p>
  <p class="page">4</p> */}
          </div>
          <div className="next-button" id="button_nextPage">
            <svg
              className="line"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000) translate(5.000000, 8.500000)">
                <path d="M14,0 C14,0 9.856,7 7,7 C4.145,7 0,0 0,0" />
              </g>
            </svg>
          </div>
        </div>
        <div className="footer">
          <p>From KIT Club with love</p>
          <span>
            <svg
              className="line"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g transform="translate(2.550170, 3.550158)">
                <path d="M0.371729633,8.89614246 C-0.701270367,5.54614246 0.553729633,1.38114246 4.07072963,0.249142462 C5.92072963,-0.347857538 8.20372963,0.150142462 9.50072963,1.93914246 C10.7237296,0.0841424625 13.0727296,-0.343857538 14.9207296,0.249142462 C18.4367296,1.38114246 19.6987296,5.54614246 18.6267296,8.89614246 C16.9567296,14.2061425 11.1297296,16.9721425 9.50072963,16.9721425 C7.87272963,16.9721425 2.09772963,14.2681425 0.371729633,8.89614246 Z" />
                <path d="M13.23843,4.013842 C14.44543,4.137842 15.20043,5.094842 15.15543,6.435842" />
              </g>
            </svg>
          </span>
        </div>
      </div>
      <div className="overlay">
        <div className="win-add-user">
          <div className="close-icon">
            <Image src="svg-icon/x.svg" alt="" />
          </div>
          <div className="form-add-user">
            <h4>Nhập dữ liệu user</h4>
            <div className="form">
              <label>Link avt</label>
              <input type="text" name="avt" />
              <br />
              <br />
              <label>Mã sinh viên</label>
              <input type="text" name="msv" />
              <br />
              <br />
              <label>Họ và tên</label>
              <input type="text" name="name" />
              <br />
              <br />
              <label>Lớp</label>
              <input type="text" name="class" />
              <br />
              <br />
              <label>Ban</label>
              <input type="text" name="ban" />
              <br />
              <br />
              <label>Role</label>
              <input type="text" name="role" />
              <br />
              <br />
              <button className="agree-btn">Thêm user</button>
              <button className="deny-btn">Hủy</button>
            </div>
          </div>
        </div>
      </div>
      <div className="overlay2">
        <div className="popup-update-user" />
      </div>
      <div className="overlay3">
        <div className="popup-update-member">
          <div className="form-update">
            <label htmlFor="">Link ảnh</label>
            <input type="text" name="avtnew" />
            <br />
            <br />
            <label htmlFor="">MSV</label>
            <input type="text" name="msvnew" />
            <br />
            <br />
            <label>Tên</label>
            <input type="text" name="namenew" />
            <br />
            <br />
            <label htmlFor="">Lớp</label>
            <input type="text" name="classnew" />
            <br />
            <br />
            <label htmlFor="">Ban</label>
            <input type="text" name="bannew" />
            <br />
            <br />
            <label htmlFor="">Role</label>
            <input type="text" name="rolenew" />
          </div>
          <div className="ques-operation"></div>
        </div>
      </div>
    </>
  );
}
