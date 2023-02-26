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


let closeLines = closeIcon.getElementsByTagName('line');


closeIcon.addEventListener('mouseover', iconHover);
closeIcon.addEventListener('mouseout', iconOut);


function iconHover(){
    closeIcon.style.backgroundColor='#3C3D3E';

    for(i=0; i<2; i++){
        closeLines[i].style.stroke = '#F4F7FA';
    }
}

function iconOut(){
    closeIcon.style.backgroundColor='#F4F7FA';

    for(i=0; i<2; i++){
        closeLines[i].style.stroke = '#3C3D3E';
    }
}



