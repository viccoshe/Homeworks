import { create } from "./create.js";
import { widget } from "./cart.js";


class Header {
    constructor(){
        this.header = null;
    }

    create(){
        this.header = create('header', [
            ['class', 'header']
        ]);
        this.logo = create('p', [
            ['class', 'logo']
        ],
        ` <a href="/"><span class="get">GET</span><span class="this">.THIS<span></a>`
        );
        
        this.nav = create('nav', [
            ['class', 'nav']
        ], `
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="#Catalogue">Catalogue</a></li>
                <li><a href="#About">About</a></li>
            </ul>

        `);
        
        this.header.append(this.logo, this.nav, widget);
        return this.header;
    }


    init() {
        this.create();
        return this.header;
    }
}

export default new Header().init();