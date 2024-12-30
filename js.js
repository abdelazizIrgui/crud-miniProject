let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let mood='create';
let temp;

function getTotal(){
    if(price.value !=''){
        let result=(+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML=result;
        total.style.background='green';
        total.style.color='white'
    }else{
        total.style.background='red';
        total.innerHTML=' ';
    }
}
let dataPro;
if(localStorage.product != null){
    dataPro=JSON.parse(localStorage.product)
}else{
    dataPro=[];
}

submit.onclick=function(){
    let newPro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(title.value!='' && price.value!='' && category.value!=''&& newPro.count < 200 && price.value <10000){
          if(mood == 'create'){
             if(newPro.count>1){
                 for(let i=0;i<newPro.count;i++){
                dataPro.push(newPro);
                 }
             }else{
                 dataPro.push(newPro);
        }
         }else{
             dataPro[temp]=newPro;
             mood='create';
        count.style.display='block';
        submit.innerHTML='create'; 
         }
    
    }
    //save in localstroge
    localStorage.setItem('product',JSON.stringify(dataPro));
    showData();
    clearData();

}
function showData(){
    getTotal();
    let table='';
    for(let i=0;i<dataPro.length;i++){
        table += `
           <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}$</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})">update</button></td>
                    <td><button onclick="deleteData(${i})">delete</button></td>

            </tr>
        `
    }

    document.getElementById('tbody').innerHTML=table;
    btnDeleteAll=document.getElementById('deleteAll');
    if(dataPro.length>1){
        btnDeleteAll.innerHTML=`
        <button onclick="deleteALLs()">Dellete All (${dataPro.length})</button>
        `
    }else{
        btnDeleteAll.innerHTML=' ';
    }
    
}
showData();

//clear data

function clearData(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.value='';
    count.value='';
    category.value='';
}

function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product=JSON.stringify(dataPro)
    showData();
}
function deleteALLs(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

function updateData(i){
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    discount.value=dataPro[i].discount;
    getTotal();
    count.style.display='none';
    category.value=dataPro[i].category;
    submit.innerHTML='update';
    mood='update';
    temp=i;//i devient global
    scroll({
        top:0,
        behavior:'smooth',
    });
}

//search data

let searchMood='title';
function searchData(id){
    let search=document.getElementById('search');
    if(id=='searchTitle'){
        searchMood='title';
        search.placeholder='search by title';
    }else{
        searchMood='category';
        search.placeholder='search by category';
    }
search.focus();
search.value='';    

}

function searchValue(value){
    let table=' ';
    if(searchMood=='title'){
        for(let i=0;i<dataPro.length;i++){
            if(dataPro[i].title.includes(value)){
               
                table += `
                      <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})">update</button></td>
                    <td><button onclick="deleteData(${i})">delete</button></td>

                </tr>
                `
            }
        }
    }else{
        for(let i=0;i<dataPro.length;i++){
            if(dataPro[i].category.includes(value)){
                table +=`
                      <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})">update</button></td>
                    <td><button onclick="deleteData(${i})">delete</button></td>
    
                </tr>
                `
            }
        }
    }
    
    document.getElementById('tbody').innerHTML=table;
}