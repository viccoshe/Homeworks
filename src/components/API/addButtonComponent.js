import { addCartStorage, getStorageData } from "./spa.js";
import { cartData } from "../cart.js";
import { addCart } from "../cart.js";
import { deleteCart } from "../cart.js";



function addButtonComponent(obj){

    let addBtn = document.createElement('div');
    addBtn.classList.add('button', 'button-add');
    addBtn.innerHTML = 'ADD';
    addBtn.addEventListener('click', (e) => {
        if( !e.target.classList.contains('button-add')) return;
    addCart(obj);
    });
  
    return addBtn;
} 

 function deleteButton(obj){
    let deleteBtn = document.createElement('div');
    deleteBtn.classList.add('button', 'button-delete');
    deleteBtn.innerHTML = 'DELETE';
    deleteBtn.addEventListener('click', (e) => {
        if( !e.target.classList.contains('button-delete')) return;
    deleteCart(obj);
    });
    return deleteBtn;
} 

export { addButtonComponent, deleteButton }

