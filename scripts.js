class User {

    constructor(data){
        if(data.name.length > 0) this._data = data;
    }

    get data (){
        return this._data;
    }

    set data (data) {
        Object.assign(this._data, data);
    }
}


class Contacts {
    #contacts;
    constructor(){
        this.#contacts = [];
    }

    add(obj) {
        if(!obj.name || !obj.phone) return;

        let user = new User(obj);
        let id = this.getRandomId();
        user.data = {id};
        console.log(user.data);
        console.log(user);
        this.#contacts.push(user);
        return this;
    }

    getRandomId(){
        let id = Math.floor(Math.random() * 1000000);
        if(this.#contacts.length === 0) return id;

        let flag = this.#contacts.some(contact => contact.data.id === id);
        if(flag){
            return this.getRandomId();
        }else{
            return id;
        }
    }

    remove(id){
        this.#contacts = this.#contacts.filter(contact => contact.data.id !== id);
        return this;
    }

    edit(id, data){
        this.#contacts.forEach(contact => {
            if (contact.data.id === id){
                contact.data = data;
            }
        });
        return this;
    }

    get contacts(){
        return this.#contacts;
    }
}

const contacts = new Contacts();

class ContactsApp extends Contacts {
    constructor(selector) {
        super();
        this.app = null;
        this.contactsContainer = null;
        this.init(selector);
    }

    init(selector){

        this.app = document.querySelector(selector); 

        let formContainer = this.createElement('form');
        let nameInput = this.createElement('input', [
            ['type', 'text'],
            ['placeholder', 'Имя Фамилия'], 
            ['class', 'name']
        ]);
        let emailInput = this.createElement('input', [
            ['type', 'text'],
            ['placeholder', 'Email'], 
            ['class', 'email']
        ]);
        let addressInput = this.createElement('input', [
            ['type', 'text'],
            ['placeholder', 'Адрес'], 
            ['class', 'address']
        ]);
        let phoneInput = this.createElement('input', [
            ['type', 'text'],
            ['placeholder', 'Телефон'], 
            ['class', 'phone']
        ]);
        let btnAdd = this.createElement('button', [
            ['type', 'submit'], 
            ['class', 'add']
        ], 'Add');


        formContainer.append(nameInput, emailInput, addressInput, phoneInput, btnAdd);
        formContainer.addEventListener('submit', (e) => {
            e.preventDefault();
            let data = {
                name: nameInput.value,
                email: emailInput.value,
                address: addressInput.value,
                phone: phoneInput.value,
            }
            console.log(data);

            this.add(data);
            this.render();
            this.storage = this.contacts;

            nameInput.value = '';
            emailInput.value = '';
            addressInput.value = '';
            phoneInput.value = '';
        });

        this.contactsContainer = this.createElement('div',[
            ['class', 'contact-container']
        ]);

        this.app.append(formContainer, this.contactsContainer);

        if (this.storage){ 
            let data = this.storage;
            data.forEach(contact => { 
                Object.keys(contact).forEach(key => this.add(contact[key])); 

            });
        
            this.render();
            
        }
    }

    render(){
        this.contactsContainer.innerHTML = '';
        this.contacts.forEach(contact => {
            let contactElem = this.createElement('div',[
                ['class', 'contact_elem']
            ]);
            let contactName = this.createElement('h2',[
                ['class', 'name']
            ], contact.data.name);
            let contactEmail = this.createElement('p',[
                ['class', 'email']
            ], contact.data.email);
            let contactAddress = this.createElement('p',[
                ['class', 'address']
            ], contact.data.address);
            let contactPhone = this.createElement('p',[
                ['class', 'phone']
            ], contact.data.phone); 
            let delButton = this.createElement('button',[
                ['class', 'delete']
            ], 'Delete');
            let editButton = this.createElement('button',[
                ['class', 'edit']
            ], 'Edit'); 
        
            delButton.addEventListener('click', () => { 
                this.remove(contact.data.id);
                this.render();
                this.storage = this.contacts;
            });

            let flag = true;
            editButton.addEventListener('click', () =>{
                if(flag){
                    contactName.contentEditable = true;
                    contactEmail.contentEditable = true;
                    contactAddress.contentEditable = true;
                    contactPhone.contentEditable = true;
                    editButton.innerText = 'Save';
                    flag = !flag;  
                }else{
                   contactName.contentEditable = false;
                    contactEmail.contentEditable = false;
                    contactAddress.contentEditable = false;
                    contactPhone.contentEditable = false;
                    editButton.innerText = 'Edit';
                    flag = !flag;
                    
                    let data = {
                        name: contactName.innerText,
                        email: contactEmail.innerText,
                        address: contactAddress.innerText,
                        phone: contactPhone.innerText,
                    } 
                    this.edit(contact.data.id, data);
                    this.storage = this.contacts; 
                    console.log(this.contacts);
                }
                
            });

            contactElem.append(contactName, contactEmail, contactAddress, contactPhone, editButton, delButton);
            this.contactsContainer.append(contactElem);
        });
        
    }

    createElement(elem, attributes = [], content = null) {
        let element = document.createElement(elem);
        if (attributes.length > 0){
            attributes.forEach(attr => {
                element.setAttribute(attr[0], attr[1]);
            });
        }
        if(content) {
            element.innerHTML = content;
        }
        return element;
    }



    get storage() { 
        
            if(!localStorage.getItem('contacts')) return false; 

            
            if (!this.storageExpiration) {
                localStorage.removeItem('contacts');
                return false;
            }

            let data = localStorage.getItem('contacts'); 
            data = JSON.parse(data);
            return data;
        }



    set storage (data) { 
        let dataJson = JSON.stringify(data); 
        localStorage.setItem('contacts', dataJson); 
        this.storageExpiration = 864000; 
    }

    get storageExpiration() { 
        let name = 'notes'
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches || false; 

    }

   set storageExpiration(time) {
        let name = 'contacts';
        let value = 'contacts';
        let options = {
            path: '/',
            secure: true,
            'max-age': time
        };

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }
        document.cookie = updatedCookie;

        }
}

let contactsApp = new  ContactsApp('.contacts-app');

    