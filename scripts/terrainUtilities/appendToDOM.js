//WORKING WITH THE DOM:

//Exporting and importing these functions into main app did not work
// This is because p5 does not support being in a script with module type attribute 

//these appending functions could possibly be transferred to a seperate file as modules to import

function appendCanvasToFrame(){
    const canvasFrame = document.getElementById('terrainCenter');
  
    const nodeOfCanvas = document.querySelector('canvas');
  
    canvasFrame.appendChild(nodeOfCanvas);
  }
  
  
function appendColorPickers(){
    const colorPickerFrame = document.getElementById('terrainColors');
  
    const colorPickers = document.querySelectorAll('input[type=color]');
  
    //labelling color pickers
    for(let i = 0; i<colorPickers.length; i++){
      const currentPicker = colorPickers[i];
  
      currentPicker.classList.add("terrainColor");
  
      colorPickerFrame.appendChild(currentPicker);
  
      currentPicker.id = 'colorPicker' + i;
  
  
      const colorLabel = document.createElement('label');
  
      switch (i){
          case 0:
              colorLabel.innerHTML = 'Fill';
              break;
          case 1:
              colorLabel.innerHTML = 'Stroke';
              break;
          case 2:
              colorLabel.innerHTML = 'BG';
              break;
          default:
              throw new Error('Color label assignment error');
      }
  
      colorLabel.htmlFor = 'colorPicker' + i;
      colorPickerFrame.appendChild(colorLabel);
    }
  
  }


  //export {appendCanvasToFrame,appendColorPickers};