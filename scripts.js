//hw 7
/*
console.log('HW #10: Калькулятор' + '\n')

let Calc = function() {

    this.on = function() {
        this.switch = confirm('Вы хотите включить калькулятор?');
        if(this.switch) this.get();
    };

    this.get = function(){
      if (this.switch) {
                  this.a = +prompt('Введите число a');
                  this.b = +prompt('Введите число b');
                  this.sign = prompt('Введите знак: +, -, *, /');
                  this.operation();
      }
    };


    this.operation = function() {
        switch(this.sign) {
            case '+':
                this.result = this.a + this.b;
            break; 
            case '-':
                this.result = this.a - this.b;
            break;
            case '*':
                this.result = this.a * this.b;
            break;
            case '/':
                this.result = this.a / this.b;
            break;
            default: this.result = 0;
        }
        this.show();
    };
    this.show = function() {
        alert(this.a + ' ' + this.sign + ' ' + this.b + ' = ' + this.result)
    };
};

let calc = new Calc();
//calc.on();
//console.log(calc);
*/

//hw 10
/*
console.log('HW #10' + '\n')

let Calc2 = function() {
  Calc.apply(this, arguments);

  let parentOperation = this.operation;
  let parentOn = this.on;

    this.get = function(){
      if (this.switch) {
                  this.a = +prompt('Введите число a');
                  this.b = +prompt('Введите число b');
                  this.sign = prompt('Введите знак: +, -, *, /, %');
                  this.operation(this.sign);
      }
    };
  
  this.operation = function(sign){
    if(this.sign === '%') {
      this.result = this.a * (this.b / 100);
    }else{
      parentOperation.call(this);
    };
    
    this.show();
  };
};

let calc2 = new Calc2();
//calc2.on();
console.log(calc2);
*/
//дополнительное задание
console.log('дополнительное задание' + '\n')


let body = document.querySelector('body');

let CreateElement = function(element){
  this.elem = element;
}; 

CreateElement.prototype.create = function(tagName){
    this.elem = document.createElement(tagName);
    //this.attr();
    return this.elem;
}

CreateElement.prototype.attr = function(element, attributes = []){
  if(attributes.length > 0){
    attributes.forEach(attr => {
      element.setAttribute(attr[0], attr[1]);
    });
  }      
      return this.elem
}

CreateElement.prototype.html = function(element, value){
    console.log(element);
    if(value){
      element.innerHTML += value;
      this.elem = element;
      return this.elem
    }else{
      return this.elem;
    } 
  }
/*
CreateElement.prototype.search = function(element, selector){
    this.elems = this.document.querySelectorAll(selector);
    return this.elems;
  }
*/


CreateElement.prototype.addClass = function(element, className) {
    this.elem = element.classList.add(className);
    return this.elem;
  }

CreateElement.prototype.removeClass = function(element, className){
    this.elem = element.classList.remove(className);
    return this.elem;
  }


CreateElement.prototype.toggleClass = function(element, className) {
    this.elem = element.classList.toggle(className);
    return this.elem;
  }

CreateElement.prototype.hasClass = function(element, className) {
    this.elem = element.classList.contains(className);
    if(this.elem) console.log("The element has got the class '" + className + "'.");
    else ("The element hasn't got the class '" + className + "'.")
    return this.elem;
  }

CreateElement.prototype.append = function(element, newElement, beforeElement){
    if(beforeElement) {
      this.elem = element.before(newElement);
      return this.elem;
    }else{
      this.elem = element.appendChild(newElement);
      return this.elem;
    } 
  }

CreateElement.prototype.on = function(element, eventName, funcName){
    element.addEventListener(eventName, funcName);
  }



let createElement = new CreateElement();

let div = 'div';
let newElem = createElement.create(div);
console.log(newElem);


let attr = [['id', 'block']];
createElement.attr(newElem, attr);

let value = 'Some inner text';
createElement.html(newElem, value);

let className = 'promo__block';
createElement.addClass(newElem, className);
createElement.hasClass(newElem, className);
console.log(newElem);


createElement.append(body, newElem);

const funcName = function(){
  console.log('it works');
};
createElement.on(newElem, 'click', funcName);


