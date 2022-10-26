export const create  = function(name, attributes = [], content) {
    let elem = name;

    if (name != 'html') {
        elem = document.createElement(name);
    }else{
        elem = document.querySelector(name);
    }

    attributes.forEach(attr => elem.setAttribute(attr[0], attr[1]));

    if (content) {
        elem.innerHTML = content;
    }
    return elem;
}
