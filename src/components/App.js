import { create } from "./create.js";
import header from "./header.js";
import footer from "./footer.js";
import main from "./main.js";

class App {
    constructor(){
        this.app = null;
        this.body = document.querySelector('body');
    }

    create(){
        this.app = create('div', [
            ['id', 'app']
        ]);
        this.html = create('html', [
            ['lang', 'en']
        ]);
        this.link = create('link', [
            ['rel', 'stylesheet'], ['href', './styles/style.css']
        ]);
        this.title = create('title', [], 'SPA');
        this.metaViewPort = create('meta', [
            ['name', 'viewport'], ['content', 'width=device-width, initial-scale=1.0']
        ]);
        this.metaCompat = create('meta', [
            ['http-equiv', 'X-UA-Compatible'], ['content', 'IE=edge']
        ]);
        this.metaUtf8 = create('meta', [
            ['charset', 'UTF-8']
        ]);

        let head = document.querySelector('head');
        head.append(this.metaViewPort, this.metaCompat, this.metaUtf8, this.link, this.title)
        this.body.prepend(this.app);

        this.render(header,  main, footer);

    }

    render(...elems){
        elems.forEach(elem => this.app.append(elem));

    }

    init(){
        this.create();
        return this.app;
    }
}

export default new App().init();