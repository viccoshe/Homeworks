import {addButtonComponent} from "./API/addButtonComponent.js";
import { create } from "./create.js";
import { getStorageData } from "./API/spa.js";



class Product{
    constructor(id){
        this.id = id;
        this.product = create('div', [
            ['class', 'product']
        ]);
    }

    async render(){

        let item = await getStorageData(this.id);
        console.log(item);
        const {id, title, price, description: desc, category: cat, image, rating: { rate } } = item;
        this.product.innerHTML = `
            <div class="img"><img src="${image}" alt=""></div>
            <span class="category">${cat}</span>
            <h2 class="title">${title}</h2>
            <p class="description">${desc}</p>
            <span class="rating">Rating: ${rate}</span>
            <span class="price">Price: ${price}</span>
        `;

        /* this.addBtn = document.createElement('div');
        this.addBtn.classList.add('button', 'button-add');
        this.addBtn.innerHTML = 'ADD';

        this.addBtn.addEventListener('click', add(id));

        this.product.append(addBtn); */ 
        const addBtn = addButtonComponent(item);
        this.product.append(addBtn);
    }

    init(){
        this.render();
        return this.product;
    }
}

export default Product;