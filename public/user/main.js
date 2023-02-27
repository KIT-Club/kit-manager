

//show popup add user
let overLay = document.querySelector('.overlay')

overLay.style.display = 'none'
let addUser = document.querySelector('.add-user-button');
addUser.onclick = function() {
    overLay.style.display = 'flex'
}

//close popup add user

let closeIcon = document.querySelector('.close-icon');
closeIcon.onclick = function() {
    overLay.style.display = 'none'
}

let denyBtn = document.querySelector('.deny-btn')
denyBtn.onclick = function() {
    overLay.style.display = 'none'
}


var overLay2 = document.querySelector('.overlay2')
overLay2.style.display = 'none'




// get api


var currentPage = 1;
var numberPages;
var rowPerPage = 3;



var memberApi = `http://localhost:3000/member` 
var tableMember = document.querySelector('#table-member')
var creatBtn = document.querySelector('.agree-btn')


async function startApps() {
    await getMemberApi() 
    creatForm() 
}
startApps() 





// creat page-split
function createPageSplit() {
    const template = `<p class="page{{select}}" id="pageNum{{id}}" onclick=loadMemberApi({{id}})>{{id}}</p>`
    numberPages = Math.ceil(count / rowPerPage)
    var html = ""

    html += micromustache.render(template, {
        id: 1,
        select: currentPage == 1 ? " select" : ""
    })

    if(numberPages > 7){
        if(currentPage <= 3){
            for(let i = 2; i <= 5; i++) {
                html += micromustache.render(template, {
                    id: i,
                    select: currentPage == i ? " select" : ""
                })
            }
            html += `<p class="page">...</p>`
        }
    
        if(currentPage >= 4 && currentPage <= numberPages - 3){ 
            if(currentPage != 4){
                html += `<p class="page">...</p>`
            }
            for(let i = currentPage - 2; i <= currentPage + 2; i++) {
                html += micromustache.render(template, {
                    id: i,
                    select: currentPage == i ? " select" : ""
                })
            }
            if(currentPage != numberPages - 3){
                html += `<p class="page">...</p>`
            }
        }
    
        if(currentPage >= numberPages - 2){
            html += `<p class="page">...</p>`
            for(let i = numberPages - 4; i <= numberPages - 1; i++) {
                html += micromustache.render(template, {
                    id: i,
                    select: currentPage == i ? " select" : ""
                })
            }
        }
    }
    else {
        for(let i = 2; i <= numberPages - 1; i++) {
            html += micromustache.render(template, {
                id: i,
                select: currentPage == i ? " select" : ""
            })
        }
    }



    html += micromustache.render(template, {
        id: numberPages,
        select: currentPage == numberPages ? " select" : ""
    })
    document.getElementById("pageNumber").innerHTML = html

}


function loadMemberApi(page) { //1
    currentPage = page
    var start = (page - 1) * rowPerPage
    var limit = rowPerPage
    getMemberApi(start, limit) //2
}
//
document.getElementById("button_previousPage").addEventListener("click", () => {
    if(currentPage > 1){
        loadMemberApi(currentPage - 1)
    }
    else{
        loadMemberApi(numberPages)
    }
})
document.getElementById("button_nextPage").addEventListener("click", () => {
    if(currentPage < numberPages){
        loadMemberApi(currentPage + 1)
    }
    else{
        loadMemberApi(1)
    }

})



//function rest api
async function getMemberApi(start = 0, limit = rowPerPage) {

 

    const response = await fetch(memberApi + `?_start=${start}&_limit=${limit}`)
    const data = await response.json()
    if(response.headers.get("x-total-count")){
        count = response.headers.get("x-total-count")
    } else {
        count = data.length
    }
    renderMemberApi(data)


    createPageSplit() //3
}

//render api

function renderMemberApi(members) {
    window.members = members
    var htmls = members.map(function(member) {
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
                `
    })
    tableMember.innerHTML = "" +
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




    
    



// add member
function addMemberApi(data,callback) {
    var object = {
        method: 'POST',
        headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    }
    fetch(memberApi,object)
    .then(function(res) {
        return res.json()
    })
    .then(callback)
}

function creatForm() {
    creatBtn.onclick = function() {
        overLay.style.display = 'none'
        var avt = document.querySelector('input[name="avt"]').value;
        var msv = document.querySelector('input[name="msv"]').value;
        var name = document.querySelector('input[name="name"]').value;
        var classer = document.querySelector('input[name="class"]').value;
        var ban = document.querySelector('input[name="ban"]').value;
        var role = document.querySelector('input[name="role"]').value;

        if (avt == "" || msv == "" || name == "" || classer == "" || ban == "" || role == "" ) {
            alert("Vui lòng nhập đầy đủ thông tin");
        }

        else {

        var dataForm = {
            avt : avt,
            msv : msv,
            name : name,
            class : classer,
            ban : ban,
            role : role,
        }

        addMemberApi(dataForm,function() {
            getMemberApi(renderMemberApi)
        })

    }

        
    }
}

// delete member 

function handleDeleteMember(id) {
    var object = {
        method: 'DELETE',
        headers: {
      'Content-Type': 'application/json'
    },
    }

    fetch(memberApi + '/' + id,object)
    .then(function(data) {
        return data.json();
    })
    .then(function() {
        getMemberApi(renderMemberApi)
    }) 

}

// update members

var overLay3 = document.querySelector('.overlay3')
overLay3.style.display = 'none'

var optionPopupUpdate = document.querySelector('.ques-operation')

function handleUpdateMember(id) {
    overLay3.style.display = "flex"
    document.querySelector('input[name="avtnew"]')

    document.querySelector('input[name="avtnew"]').value = members.find(u => u.id == id).avt
    document.querySelector('input[name="msvnew"]').value = members.find(u => u.id == id).msv
    document.querySelector('input[name="namenew"]').value = members.find(u => u.id == id).name
    document.querySelector('input[name="classnew"]').value = members.find(u => u.id == id).class
    document.querySelector('input[name="bannew"]').value = members.find(u => u.id == id).ban
    document.querySelector('input[name="rolenew"]').value = members.find(u => u.id == id).role

    var htmls = `
    
        <h4>Bạn có chắc chắn muốn thay đổi?</h4>
        <button class="deny-btn-update" onclick = "updateApi(${id})">Đồng ý</button>
        <button class="close-btn-update" onclick="closePopupUpdate()">Hủy</button>
   `

    optionPopupUpdate.innerHTML = htmls
}


function updateApi(id) {

    var dataUpdate = {
        avt : document.querySelector('input[name="avtnew"]').value,
        msv : document.querySelector('input[name="msvnew"]').value,
        name : document.querySelector('input[name="namenew"]').value,
        class : document.querySelector('input[name="classnew"]').value,
        ban : document.querySelector('input[name="bannew"]').value,
        role : document.querySelector('input[name="rolenew"]').value
    }

    var object = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataUpdate),
    }

    fetch(memberApi + '/' +id, object)
        .then(function(response) {
            return response.json()
        })
        .then((data) => {
            const member = data
            document.getElementById("memberID" + id).innerHTML = "" + 
                `<td><img src="${member.avt}"/></td>
                <td>${member.msv}</td>
                <td>${member.name}</td>
                <td>${member.class}</td>
                <td>${member.ban}</td>
                <td>${member.role}</td>
                <td>
                <div onclick="handleUpdateMember(${member.id})" class="update-button" id="update-item-${member.id}"><span><svg class='line' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><g transform='translate(3.500000, 3.500000)'><line x1='9.8352' y1='16.0078' x2='16.2122' y2='16.0078'></line><path d='M12.5578,1.3589 L12.5578,1.3589 C11.2138,0.3509 9.3078,0.6229 8.2998,1.9659 C8.2998,1.9659 3.2868,8.6439 1.5478,10.9609 C-0.1912,13.2789 1.4538,16.1509 1.4538,16.1509 C1.4538,16.1509 4.6978,16.8969 6.4118,14.6119 C8.1268,12.3279 13.1638,5.6169 13.1638,5.6169 C14.1718,4.2739 13.9008,2.3669 12.5578,1.3589 Z'></path><line x1='7.0041' y1='3.7114' x2='11.8681' y2='7.3624'></line></g></svg></span>Update</div>
                <div onclick="handleDeleteMember(${member.id})" class="delete-button" id="item-${member.id}"><span><svg class='line' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><g transform='translate(3.500000, 2.000000)'><path d='M15.3891429,7.55409524 C15.3891429,15.5731429 16.5434286,19.1979048 8.77961905,19.1979048 C1.01485714,19.1979048 2.19295238,15.5731429 2.19295238,7.55409524'></path><line x1='16.8651429' y1='4.47980952' x2='0.714666667' y2='4.47980952'></line><path d='M12.2148571,4.47980952 C12.2148571,4.47980952 12.7434286,0.714095238 8.78914286,0.714095238 C4.83580952,0.714095238 5.36438095,4.47980952 5.36438095,4.47980952'></path></g></svg></span>Delete</div>
                </td>`
            var index = members.findIndex(u => u.id == id) 
            members[index] = member


        }) 



    overLay3.style.display = 'none'
 
}






function closePopupUpdate() {
    overLay3.style.display = 'none';
}



















