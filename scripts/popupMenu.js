let greeting = document.getElementById('greetingContainer');
let popup = document.querySelector('.popupMenuContainer');
let closeIcon = document.querySelector('.closeIcon');

greeting.onclick = displayPopup;
closeIcon.onclick = hidePopup;

function displayPopup(){
    popup.style.width='50vw';
}

function hidePopup(){
    popup.style.width='0px';
}