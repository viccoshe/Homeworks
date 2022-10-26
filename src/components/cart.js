import { create } from "./create.js";
import { getCartStorage, addCartStorage } from "./API/spa.js";
import { deleteButton } from "./API/addButtonComponent.js";


class Cart{
    constructor(){
        this.widget = create('div', [
            ['class', 'widget']
        ]);
        this.cart = getCartStorage();
        this.cartContainer = create('div', [
            ['class', 'cart-container']
        ], 'Cart');

        this.addCart = this.addCart.bind(this);
        this.deleteCart = this.deleteCart.bind(this);
    }

    getTotalPrice(){
        let num = this.cart.reduce((total, item) => total + item.price, 0);
        num = Number.parseFloat(num.toFixed(2));
        return num + '$';
    }

    getWidget(){
        let counter = this.cart.length ?? 0;
        let totalPrice = this.getTotalPrice();
        console.log(totalPrice)
        this.widget.innerHTML = `
            <a href="#Cart"><div class="img"><img src="./img/cart1.png" alt="cart"></div></a>
            <div class="prod-number">${counter}</div>
            <div class="prod-sum">${totalPrice}</div>
        `;
        return this.widget;
    }

    renderWidget(){
        let counter = this.widget.querySelector('.prod-number');
        let totalPrice = this.widget.querySelector('.prod-sum');
        counter.innerHTML = this.cart.length ?? 0;
        totalPrice.innerHTML = this.getTotalPrice();
    }
    render(){

        this.cartContainer.innerHTML = '';
        console.log(this.cart);

        if (this.cart.length > 0) {
            this.cart.forEach((item) => {
                this.cartItem = create('div', [
                            ['class', 'cart-item']
                        ],`
                            <div class="img">
                                <img src="${item.image}" alt=""/>
                            </div>
                            <p class="title">${item.title}</p>
                            <p class="price">${item.price}</p>
                        `);

                        const deleteBtn = deleteButton(item);
                        this.cartItem.append(deleteBtn);

                        this.cartContainer.append(this.cartItem);

            });

           let totalPrice = this.getTotalPrice();
            const cartBtn = document.createElement('div');
            cartBtn.classList.add('button', 'button-cart');
            cartBtn.innerHTML = `
                ${totalPrice}
                <span>BUY ALL</span>
            `;
            this.cartContainer.append(cartBtn);
        }else{
            let empty = document.createElement('div');
            empty.classList.add('empty');
            empty.innerHTML = '<h1>The cart is empty</h1>';
            this.cartContainer.append(empty);
        }  
    }

    init(){
        this.render();
        return this.cartContainer;

    }

     deleteCart(obj){
        obj.counter = '';
        this.cart.pop(obj);
        addCartStorage(this.cart);
        this.render();
        this.renderWidget();
        return this.cart;

    } 

    addCart(obj){
        obj.counter = 1;
        this.cart.push(obj);
        addCartStorage(this.cart);

        console.log(this.cart);

        this.render();
        this.renderWidget();
        return this.cart;
        
    }

    getCart(){
        return this.cart;
    } 
}

let cart= new Cart;
let cartData = cart.getCart;
let addCart = cart.addCart;
let deleteCart = cart.deleteCart;
let init = cart.init();
let widget = cart.getWidget();

export default init;
export { cartData, addCart, deleteCart, widget };