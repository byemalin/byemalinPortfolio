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
