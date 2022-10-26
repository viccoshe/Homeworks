import { create } from "./create.js";
import { getStorageData } from "./API/spa.js";
import { addButtonComponent } from "./API/addButtonComponent.js";
import { addCart } from "./cart.js";

class Catalogue{
    constructor(){
        this.catalogue = null;
    }

   async render(){
        const data = await getStorageData();
        console.log(data);

        this.h2 = create('h2', [], 'Catalogue');
        this.catalogueWrap = create('div', [
            ['class', 'catalogue-wrapper']
        ]);
        
        data.forEach((item) => {
            const {id, title, price, description: desc, category: cat, image, rating: { rate } } = item;
            
            this.catalogueItem = create('div', [
                ['class', 'catalogue-item']
            ], `
                <div class="img">
                    <a href="#Product/${id}"><img src="${image}" alt=""></a>
                </div>
                
                <p class="title"><a href="">${title}</a></p>
                <p class="price"><a href="">${price}$</a></p>
                <div class="rating"><a href="">${rate}&#9734;</a></div>
            `);

         

            const addBtn = addButtonComponent(item);
            this.catalogueItem.append(addBtn);
            this.catalogueWrap.append(this.catalogueItem);
        
        });
        
    this.catalogue.append(this.h2, this.catalogueWrap);
    console.log(this.catalogue);
    }

    create(){
        this.catalogue = create('div', [
            ['class', 'catalogue']
        ]);

        this.render();

    }

    init(){
        this.create();
        return this.catalogue;
    }
}

export default new Catalogue().init();