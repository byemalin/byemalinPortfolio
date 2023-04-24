//setting some global variables:
let angle = 0.0;

let slider;

let waveArray = [];

let radialLoop = 600;





//DYNAMIC CONTROLS DOM

//fill and stroke toggles
fillSwitch = document.getElementById('fillSwitch');
randomFillSwitch = document.getElementById('randomFillSwitch');

strokeSwitch = document.getElementById('strokeSwitch');
randomStrokeSwitch = document.getElementById('randomStrokeSwitch');

strokeSwitch.checked = true; //starting with stroke on


//stroke weight
strokeWeightRange = document.getElementById('strokeWeightRange');
strokeWeightRange.value = 1;

//Terrain Controls
//wave radius
waveRadiusRange = document.getElementById('waveRadiusRange');
waveRadiusRange.value = 600;
//waveStrength
waveStrengthRange = document.getElementById('waveStrengthRange');
waveStrengthRange.value = 200;
//waveSpeed
terrainSpeedRange = document.getElementById('terrainSpeedRange');
terrainSpeedRange.value = 1;


function setup() {

    //Create Canvas and Set BG Colour
    const canvasFrame = document.getElementById('terrainCenter');

    const canvasWidth = canvasFrame.offsetWidth * 0.9;
    const canvasHeight = canvasFrame.offsetHeight * 0.9;
    createCanvas(canvasWidth, canvasHeight);

  appendCanvasToFrame(); //function to put canvas in right place in the DOM


  //set initial bg color:
  background(color("#FFFFFF"));

  //Create Colour Pickers
  fillColorPicker = createColorPicker("#FFD25A");
  strokeColorPicker = createColorPicker("#191919");
  
  BGColorPicker = createColorPicker("#FFFFFF");

  appendColorPickers();


  //t for time for loops in draw.value incremented in draw
  t = 0;
  //for random gradual color change over time
  colorIncrement = 0;

  
}



function draw() {
    
    keyPressed(); //calling keyPressed within draw so that it continually loops

  //background(color(BGColorPicker.color()));

  strokeWeight(strokeWeightRange.value);

  //setting stroke and fill
  if (randomFillSwitch.checked) {
    var r = 255 * noise(colorIncrement + 10);
    var g = 255 * noise(colorIncrement + 15);
    var b = 255 * noise(colorIncrement + 20);
    fill(r, g, b);
  } else if(fillSwitch.checked){
    fill(fillColorPicker.color());
  } else {
    noFill();
  }

  if (randomStrokeSwitch.checked) {
    var r = 255 * noise(colorIncrement + 20);
    var g = 255 * noise(colorIncrement + 15);
    var b = 255 * noise(colorIncrement + 10);
    stroke(r, g, b);
  } else if(strokeSwitch.checked){
    stroke(strokeColorPicker.color());
  } else {
    noStroke();
  }
  
  


  let mouseInCanvas = mouseX > 0 && mouseX < width;


  //TERRAIN TOOL

  /*
  There is an expansion to be made with the terrain tool. 
  I think each loop of the shape should be stored in an array
  This can then be converted and exported as an svg
  */

  if (terrain.toggleState == true && mouseIsPressed == true && mouseInCanvas) {
    radialLoop = waveRadiusRange.value;
    waveStrength = waveStrengthRange.value;
    terrainSpeed = terrainSpeedRange.value;
    //move to mouse location
    translate(mouseX, mouseY);

    //shape funtion:
    beginShape();

    //main loop for terrain
    for (var i = 0; i < waveStrength; i++) {
      var ang = map(i, 0, waveStrength, 0, TWO_PI);
      var rad = radialLoop * noise(i * 0.01, t * 0.005); //radius
      var x = rad * cos(ang);
      var y = rad * sin(ang);

      
      curveVertex(x, y);
    }
    endShape(CLOSE);

    //incrementing time and colorIncrement
    // console.log(terrainSpeed); For some reason when I add this it breaks no idea why
    t += 1;


    // keyPressed();

  }


  

  //SPIRAL TOOL

  if (spiral.toggleState == true && mouseIsPressed && mouseInCanvas) {

    //set slider value to local variable
    // let slider_val = slider.value();

    //this is to be repalaced with actual slider values
    let slider_val = 50;

    //move drawing starting point to mouse
    translate(mouseX, mouseY);
    rotate(angle); //rotate each loop of the draw function

    rect(-1 * slider_val, -1 * slider_val, slider_val * 2, slider_val * 2);
    angle += 0.1;

  }



  //WAVES TOOL
  if (waves.toggleState == true && mouseIsPressed && mouseInCanvas) {

    translate(mouseX-width/2, mouseY-height/2)

    

    var x1 = width * noise(t + 15);
    var x2 = width * noise(t + 25);
    var x3 = width * noise(t + 35);
    var x4 = width * noise(t + 45);
    var y1 = height * noise(t + 55);
    var y2 = height * noise(t + 65);
    var y3 = height * noise(t + 75);
    var y4 = height * noise(t + 85);


    // waveArray.push([x1, y1, x2, y2, x3, y3, x4, y4]);

    // for(let i = 0; i < waveArray.length; i++){
    //   bezier(
    //     waveArray[i][0],
    //     waveArray[i][1],
    //     waveArray[i][2],
    //     waveArray[i][3],
    //     waveArray[i][4],
    //     waveArray[i][5],
    //     waveArray[i][6],
    //     waveArray[i][7], )
    // }

    bezier(x1, y1, x2, y2, x3, y3, x4, y4);

    t += 0.005;
  }

  //PENCIL TOOL
  if (pencil.toggleState == true && mouseIsPressed == true && mouseInCanvas) {
    stroke(strokeColorPicker.color()); 
    line(mouseX, mouseY, pmouseX, pmouseY);
  }

  colorIncrement += 0.001 //used at top of draw for gradual color change
}//end of draw function



function keyPressed(){
    if(keyIsPressed){
        if(keyCode === DOWN_ARROW && radialLoop>0){
            console.log("DOWN");
            radialLoop -= 3;
            waveRadiusRange.value = radialLoop;
        } else if(keyCode === UP_ARROW){
            radialLoop += 3;
            waveRadiusRange.value = radialLoop;
        }
    }
    
}



//WORKING WITH THE DOM:

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







//TOGGLE TOOLS

//objects for each tool with state and button node
const terrain = {
    toggleState: true,
    buttonNode: terrainButton
};

const spiral = {
    toggleState: false,
    buttonNode: spiralButton
};

const waves = {
    toggleState: false,
    buttonNode: wavesButton
}

const pencil = {
    toggleState: false,
    buttonNode: pencilButton
}

//array of all tool objects
const terrainTools = [terrain, spiral, waves, pencil];

function toggleToolState(tool){

    //set all tool states to false and passive color
    for(let i = 0; i<4; i++){
        terrainTools[i]['toggleState'] = false;
        terrainTools[i]['buttonNode'].style.backgroundColor='#F4F7FA';
    }
    //set chosen tool to true and active color
    tool['toggleState'] = true;
    tool['buttonNode'].style.backgroundColor='#3F68D1';
}

//setting the starting tool to terrain
toggleToolState(terrain);










//Button Event Listeners:


//tools

terrainButton = document.getElementById('terrainButton')
terrainButton.onclick = terrainFile;

spiralButton = document.getElementById('spiralButton')
spiralButton.onclick = spiralFile;

wavesButton = document.getElementById('wavesButton')
wavesButton.onclick = wavesFile;

pencilButton = document.getElementById('pencilButton')
pencilButton.onclick = pencilFile;


//save and clear:
downloadPNG = document.getElementById('downloadPNG')
downloadPNG.onclick = saveToFile;

transparentBG = document.getElementById('transparentBG')
transparentBG.onclick = clearFile;

//bg
randomBG = document.getElementById('randomBG')
randomBG.onclick = randomBGFile;

//resize canvas
resizeOK = document.getElementById('resizeOK')
resizeOK.onclick = resizeArtboard;



//FUNCTIONS FOR BUTTONS:

//tools:

function terrainFile() {
    toggleToolState(terrain);
}
    
function spiralFile() {
    toggleToolState(spiral);
}

function wavesFile() {
    toggleToolState(waves);
}

function pencilFile() {
    toggleToolState(pencil);
}

//save, clear, background:

function saveToFile() {
    saveCanvas('Terrain_byemalin', 'png')
}
  
function clearFile() {
    clear();
}

function randomBGFile() {
background(color(random(255), random(255), random(255)));
}

//resize artboard

function resizeArtboard(){
    const newHeight = document.getElementById('artboardHeight').value;
    const newWidth = document.getElementById('artboardWidth').value;

    resizeCanvas(newWidth, newHeight);
}
