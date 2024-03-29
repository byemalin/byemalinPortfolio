
function projectHover(){
    for (i=1; i<=4; i++){
        let currentProject = document.getElementById('project'+i);
        let currentSS = document.getElementById('project'+i+'Screenshot');

        let openIcon = currentProject.querySelector('.openIcon');
        let openArrow = openIcon.querySelector('path');



        currentProject.addEventListener('mouseover', ScreenshotDisplay);
        currentProject.addEventListener('mouseout', ScreenshotRemove);
        currentProject.addEventListener('mousemove', ScreenshotMove )


        // Perhaps these don't need to be seperatrd into seperate functions
        // I guess I could use an interior if statement.
        // I think that mean that mouseover and mouseout just trigger the same function

        function ScreenshotDisplay(){
            currentSS.style.display='flex';

            openIcon.style.backgroundColor = '#3C3D3E';
            openArrow.style.fill= '#F4F7FA';
        }
        function ScreenshotRemove(){
            currentSS.style.display='none';

            openIcon.style.backgroundColor = '#F4F7FA';
            openArrow.style.fill= '#3C3D3E';
        }

        function ScreenshotMove(event){
            currentSS.style.left = event.pageX + 'px';
            currentSS.style.top = event.pageY + 'px';
        }
    }
}


projectHover();



