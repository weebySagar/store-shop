const productForm = document.querySelector('#productForm');
const table=document.querySelector('#tableBody');
const buyBtn = document.querySelector('#buyBtn');

// add event listening
productForm.addEventListener('submit',addProduct);
table.addEventListener('click',buyProduct)

// product obj
const product={
    name:null,
    description:null,
    price:null,
    quantity:null,

}

document.addEventListener('DOMContentLoaded',fetchAllProducts)

// functions related to products
function addProduct(e){
    e.preventDefault();
    product.name=e.target.itemName.value;
    product.description=e.target.description.value;
    product.price=e.target.price.value;
    product.quantity= e.target.quantity.value;

    addProductAPI(product)

}


function addProductToList(productObj){
    // buy button
    const div = document.createElement('div');
    div.className='d-flex';
    const input = document.createElement('input');
    input.type='number';
    
    input.className='form-control flex-fill'
    const buyBtn = document.createElement('button');
    buyBtn.innerHTML="Buy in Qty"
    buyBtn.className='btn btn-success btn-sm mx-2 flex-fill buy';
    buyBtn.id='buyBtn'

    div.appendChild(input);
    div.appendChild(buyBtn);
    
    const newRow = table.insertRow(table.rows.length);
    newRow.setAttribute('id',productObj._id)
    newRow.insertCell(0).innerHTML= productObj.name;
    newRow.insertCell(1).innerHTML= productObj.description;
    newRow.insertCell(2).innerHTML= productObj.price;
    newRow.insertCell(3).innerHTML= productObj.quantity;
    newRow.insertCell(4).appendChild(div);


    
    
}

function buyProduct(e){
if(e.target.classList.contains('buy')){
    const td=     e.target.parentElement.parentElement.parentElement.childNodes;
    product.name=td[0].innerText;
    product.description=td[1].innerText;
    product.price=td[2].innerText;
    product.quantity=td[3].innerText;


    

    const id= e.target.parentElement.parentElement.parentElement.getAttribute('id');
    const qty = e.target.previousSibling.value
    

    if(!qty){
        alert('please enter quantity');
    }
    else if(qty<1 || qty>product.quantity){
        alert('please enter valid quanity')
    }
    else{
        product.quantity= product.quantity-qty;
        updateProduct(id,product)
    }
}
}




//  APIS FOR PRODUCT

// for adding product
const baseURL='https://crudcrud.com/api/5ad37127cd504987b0a8e49dd2820dd1/product';
async function addProductAPI(productObj){
    try {
        const {data} =await axios.post(baseURL,productObj);
        addProductToList(data);
    } catch (error) {
        console.log(error);
    }
}


//  fetching all  products
async function fetchAllProducts(){
try {
    const {data}= await axios.get(baseURL);
    for(let item of data){
        addProductToList(item)
    }
    // let tr = Array.from(table.children);
    // for(let val of tr){
    //     deleteProduct(val.id)
    // }
} catch (error) {
    console.log(error);
}
}


// updating products
async function updateProduct(id,product){
    try {
        await axios.put(`${baseURL}/${id}`,product);
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}

async function deleteProduct(id){
    try {
        await axios.delete(`${baseURL}/${id}`)
    } catch (error) {
        console.log(console.log(error));
    }
}

