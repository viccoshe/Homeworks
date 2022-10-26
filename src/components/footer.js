import { create } from "./create.js";

class Footer{
    constructor(){
        this.footer = null;
    }

    init(){
        this.footer = create('footer', [
            ['class', 'footer footer-full'],
        ]);

        this.p = create('p', [],
            `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
            distinctio earum repellat quaerat voluptatibus placeat nam,
            commodi optio pariatur est quia magnam eum harum corrupti dicta,
            aliquam sequi voluptate quas.`
        );

        this.footerNav = create('div', [
            ['class', 'footer_nav'],
        ], 
        `
            <h5>Links</h5>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="#Catalogue">Catalogue</a></li>
                <li><a href="#About">About</a></li>
            </ul>
        `);

        this.copy = create('div', [
            ['class', 'copyright'],
        ], 
            `© 2020 Copyright:
            <a href="#">site.com</a>`
        );

        this.footer.append(this.p, this.footerNav, this.copy);

        return this.footer;
    }
}

export default new Footer().init();