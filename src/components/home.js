import { create } from "./create.js";

class Home{
    constructor(){
        this.home = null;
    }

    create(){
        this.catalogue = create('div', [
            ['class', 'home-block']
        ], `
            <h2>Lorem ipsum dolor sit iusmod tempor</h2>
            <h3>Home page</h3>
            <p>Orem ipsum dolor sit amet, consectetur</p> 

            <a href="#About"><div class="button">KNOW MORE</div><a>
        `);

    }

    init(){
        this.create();
        return this.catalogue;
    }
}

export default new Home().init();