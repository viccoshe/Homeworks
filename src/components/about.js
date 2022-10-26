import { create } from "./create.js";

class About{
    constructor(){
        this.about = null;
    }

    create(){
        this.about = create('div', [
            ['class', 'about']
        ], `
        <h2>About us</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.</p>
        
        <div class="about_container">

            

        <div class="about_item">
            <div class="img"><img src="./img/stat_ico.png" alt=""></div>
            <p class="title">Title goes here</p>
            <div class="about_text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error, quis?</div>
        </div>

            <div class="about_item">
                <div class="img"><img src="./img/stat_ico.png" alt=""></div>
            <p class="title">Title goes here</p>
            <div class="about_text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error, quis?</div>
            </div>
    

            <div class="about_item">
                <div class="img"><img src="./img/about_globe_ico.png" alt=""></div>
            <p class="title">Title goes here</p>
            <div class="about_text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error, quis?</div>
            </div>

            <div class="about_item">
                <div class="img"><img src="./img/find_ico.png" alt=""></div>
            <p class="title">Title goes here</p>
            <div class="about_text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error, quis?</div>
            </div>

    </div>
        
        `);
    }

    init(){
        this.create();
        return this.about;
    }
}

export default new About().init();