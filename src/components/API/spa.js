import { setCookie, getCookie } from "./cookie.js";

 async function getStorageData(id) {
    if( !getCookie('catalogue')){
        localStorage.removeItem('catalogue');
    }

    if( !localStorage.getItem('catalogue')) {
        if(id){
            let data = await getApiItem(id);
            return data;
        }else{
            let data = await getApiData();
            localStorage.setItem('catalogue', JSON.stringify(data));
            setCookie('catalogue', JSON.stringify(data), {secure: true, 'max-age': 2000});
            return data;
        }
    }else{
        let data = localStorage.getItem('catalogue');
        data = JSON.parse(data);
        if (id){
            data = data.find(item => item.id === id);
            return data;
        }
        return data;
    }
} 

/* function deleteCartStorage(data){
    localStorage.removeItem('cart', JSON.stringify(data));
    setCookie('cart', '', {secure: true, 'max-age': -1});
    console.log(document.cookie);
} */


function addCartStorage(data){
    localStorage.setItem('cart', JSON.stringify(data));
    setCookie('cart', '', {secure: true, 'max-age': 5000});
}

function getCartStorage(){
    if(!getCookie('cart')){
    localStorage.removeItem('cart');
    return [];
    }
    let data = localStorage.getItem('cart');
    return JSON.parse(data);
}

async function getApiData(){
    let resp = await fetch ('https://fakestoreapi.com/products');
    return await resp.json();
}

async function getApiItem(id){
    let resp = await fetch (`https://fakestoreapi.com/products/${id}`);
    return await resp.json();
}

export { getStorageData, addCartStorage, getCartStorage };