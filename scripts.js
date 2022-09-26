class Contacts {
  constructor(data) {
      this.id = 0;
      this.contacts = [];
      
  }

  add(data) {
      if(!data.name || !data.phone) return;
      this.contact = new User(data);
      this.data = data;
      
      let id = this.id++;
      Object.assign(this.data, this.id);
      this.contacts.push(this.contact);
  }

  edit(id, contact) {
      this.contacts.forEach(contact => {
          if (contact.id === id) {
              Object.assign(this.data, contact);
          }
      });
          

  }

  remove(id) {
      console.log(this.contacts);
      this.contacts= this.contacts.filter(contact => contact.id !== id);
  }

  get() {}
}



class User extends Contacts {
  constructor(data) {
      super(data);
      this.id = data.id;
      this.name = data.name,
      this.email = data.email,
      this.address = data.address,
      this.phone = data.phone
     
  }
  

  edit(data) { 
      Object.assign(this.data, data);
  }
      
  get(){
      return this.data;
  }
}





class ContactsApp extends Contacts {

  init(){
      let contElemContainer = null;
      let contactContainer = this.createElement('div',[['class', 'contact-container']]);
      let body = document.querySelector('body');
      body.appendChild(contactContainer);

      let formContainer = this.createElement('form');
      let nameInput = this.createElement('input', [['type', 'text'],
      ['placeholder', 'name'], ['class', 'name']]);
      let emailInput = this.createElement('input', [['type', 'text'],
      ['placeholder', 'email'], ['class', 'email']]);
      let addressInput = this.createElement('input', [['type', 'text'],
      ['placeholder', 'address'], ['class', 'address']]);
      let phoneInput = this.createElement('input', [['type', 'text'],
      ['placeholder', 'phone'], ['class', 'phone']]);
      let btnAdd = this.createElement('button', [['type', 'submit'], ['class', 'add']], 'Add');
      this.contElemContainer = this.createElement('div',[['class', 'contacts']]);

      formContainer.addEventListener('submit', event => {
          event.preventDefault();
          this.data = {
              id: 0,
              name: nameInput.value,
              email: emailInput.value,
              address: addressInput.value,
              phone: phoneInput.value,
          }
          console.log(this.data);
          
          super.add(this.data);
          nameInput.value = '';
          emailInput.value = '';
          addressInput.value = '';
          phoneInput.value = '';

          console.log(this.data);

          this.onAdd(this.data);
      });

      contactContainer.append(formContainer, this.contElemContainer);
      formContainer.append(nameInput, emailInput, addressInput, phoneInput, btnAdd);
      body.append(contactContainer);
  }
      
  createElement(elem, attributes = [], content = null) {
      let element = document.createElement(elem);
      if (attributes.length > 0){
          attributes.forEach(attr =>{
              element.setAttribute(attr[0], attr[1]);
          });
      }
      if(content !== null) {
          element.innerText = content;
      }
      return element;
  }

  onAdd(data) {
      this.contElemContainer.innerHTML ='';   
      this.contacts.forEach(contact => {
          let contactElem = this.createElement('div',[['class', 'contact_elem']]);
          let contactName = this.createElement('h2',[['class', 'name']], contact.name);
          let contactEmail = this.createElement('p',[['class', 'email']], contact.email);
          let contactAddress = this.createElement('p',[['class', 'address']], contact.address);
          let contactPhone = this.createElement('p',[['class', 'phone']], contact.phone); 

          let delButton = this.createElement('button',[['class', 'delete']], 'Delete');
          let editButton = this.createElement('button',[['class', 'edit']], 'Edit'); 

                      
          delButton.addEventListener('click', () => { 
              super.remove(contact.id);
              this.onAdd();
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
                  super.edit(this.data.id, data);
              }
              console.log(this.notes);
          });

          contactElem.append(contactName, contactEmail, contactAddress, contactPhone, editButton, delButton);
          this.contElemContainer.append(contactElem);
      })
      
  }

  onEdit(data) {
      Object.assign(this.data, data);
  }
  
  onRemove() {}

  get() {
      return this.data;
  }
   }  

let contact = new ContactsApp();
contact.init();



