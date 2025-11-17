let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;
//get total
function getTotal() {

    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "#040";
    } else {
        total.innerHTML = "";
        total.style.background = "#a00d02";
    }
}    
//createproduct
let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product);
} else {
    datapro = [];
}



submit.onclick = function () {
    let newpro = {
        title: title.value.toLowerCase().trim(),
        price: price.value.trim(),
        taxes: taxes.value.trim(),
        ads: ads.value.trim(),
        discount: discount.value.trim(),
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase().trim(),
    };

  
    if (newpro.title !== '' ) {
        if (mood === 'create') {
            if (newpro.count > 1) {
                for (let i = 0; i < newpro.count; i++) {
                    datapro.push(newpro);
                }
            } else {
                datapro.push(newpro);
            }
        } else {
            datapro[tmp] = newpro;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }

        // save in localstorage
        localStorage.setItem("product", JSON.stringify(datapro));
        clearData();
        showData();
    } else {
        alert("please write the product details");
    }
};

        //save in localstorage
    localStorage.setItem("product",     JSON.stringify(datapro));
    clearData();
    showData();
//clear inputs
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}
//read
function showData() {
    let table = "";
    getTotal();
    for (let i = 0; i < datapro.length; i++) {  
        table += `
           <tr>
          <td>${i}</td>
          <td>${datapro[i].title}</td>
          <td>${datapro[i].price}</td>
          <td>${datapro[i].taxes}</td>
          <td>${datapro[i].ads}</td>
          <td>${datapro[i].discount}</td>
          <td>${datapro[i].total}</td>
          <td>${datapro[i].category}</td>  
          <td>
          <button onclick="updateData(${i})" id="update">update</button>
          </td>
          <td>
          <button onclick="deleteData( ${i}   )" id="delete">delete</button>
          </td>
        </tr>
        `
    }    
    document.getElementById("tbody").innerHTML = table;
    let btnDelete = document.getElementById("DeleteAll");
    if (datapro.length > 0) {
        btnDelete.innerHTML = ` 
        <button onclick = "DeleteAll()">Delete All(${datapro.length})</button>
        `
    }else{btnDelete.innerHTML = ""}
}

//delete
function deleteData(i) {
    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro);
    showData();
}


//delete all
function DeleteAll() {
    localStorage.clear();
    datapro.splice(0);
    showData();
}
//update
function updateData(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    getTotal();
    count.style.display = "none";
    category.value = datapro[i].category;
    submit.innerHTML = "Update";
    mood = "update";
    tmp = i;
    scroll({top:0, 
    behavior:"smooth"
    });

}
//search
let searchMood = 'title';

function getsearchMood(id) {
    let search = document.getElementById('search');
    if (id == 'searchtitle') {
        searchMood = 'title';
    } else {
        searchMood = 'category';
    }
    search.placeholder = 'search by ' + searchMood;
    search.focus();
    search.value = '';
    showData();
}
function searchdata(value) {
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        if (searchMood == 'title') {
            if (datapro[i].title.toLowerCase().includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>   
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
                `;
            }
        } else if (searchMood == 'category') {
            if (datapro[i].category.toLowerCase().includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>   
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
                `;
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}
showData();