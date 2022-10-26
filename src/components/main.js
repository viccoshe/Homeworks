import { create } from "./create.js";

class Main{
    constructor(){
        this.main = null;      
    }

    router(){
        
        let hash = location.hash.slice(1);
        if ( !hash) hash = 'home';

        if (hash.indexOf('/') === -1){
            import(`./${hash}.js`)
                .then(module => {
                    this.main.innerHTML = '';
                    this.main.append(module.default);
                })
                .catch(error => {
                    this.main.innerHTML = `
                        <h1>404</h1>
                    `;
                })
        }else{
            let index = hash.indexOf('/');
            let id = +hash.slice(index + 1);
            import("./product.js")
                .then(module => {
                    this.main.innerHTML = '';
                    let product = new module.default(id);
                    console.log(product);
                    this.main.append(product.init())
                })
                .catch(error => {
                    this.main.innerHTML = `
                        <h1>404</h1>
                    `;
                })
        }  
    }

    init(){
        this.main = create('main', [
            ['class', 'main']
        ]);
        
        window.addEventListener('hashchange', () => {
                this.router();
        });
        
        window.addEventListener('load', ()=> {
            const a = document.querySelectorAll('a[href="/"]');
            console.log(a);
            a.forEach((link) => {
                link.addEventListener('click', (e) => {
                e.preventDefault();
                location.hash = '';
                    
                });
            
            });
            this.router()
        });
        
        return this.main; 
    }
}

export default new Main().init();