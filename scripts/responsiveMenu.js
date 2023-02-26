let responsivePopup = document.querySelector('.popupMenuContainer');
let responsiveCloseIcon = document.querySelector('.closeIcon');

let burger = document.querySelector('.burgerContainer');

let body = document.querySelector('body');


burger.onclick = displayPopup;
responsiveCloseIcon.onclick = hidePopup;


function displayPopup(){
    responsivePopup.style.width='100vw';

    body.style.height='100px';
    body.style.overflow = 'hidden';
}

function hidePopup(){
    responsivePopup.style.width='0px';

    body.style.height='100%';
    body.style.overflow = 'visible';
}


//LOGO hover Feature:

let logoBox = document.querySelector('.headerLogoContainer');
let logoPaths = logoBox.getElementsByTagName('path');

logoBox.addEventListener('mouseover', changeColor);


function changeColor(){

    console.log('hovered');

    console.log(logoPaths);

    let r = random255();
    let g = random255();
    let b = random255();

    for(i=0; i<logoPaths.length; i++){
        logoPaths[i].style.fill = `rgb(${r},${g},${b})`
    }

}

function random255(){
    return (Math.floor(Math.random()*255));
}