//import { appendCanvasToFrame, appendColorPickers } from "./terrainUtilities/appendToDOM.js";


//setting some global variables:
let angle = 0.0;


let radialLoop = 600;



let terrainShapes = [];




//DYNAMIC CONTROLS DOM

//fill and stroke toggles
const fillSwitch = document.getElementById('fillSwitch');
const randomFillSwitch = document.getElementById('randomFillSwitch');

const strokeSwitch = document.getElementById('strokeSwitch');
const randomStrokeSwitch = document.getElementById('randomStrokeSwitch');

strokeSwitch.checked = true; //starting with stroke on


//stroke weight
const strokeWeightRange = document.getElementById('strokeWeightRange');
strokeWeightRange.value = 1;

//Terrain Controls
//wave radius
const waveRadiusRange = document.getElementById('waveRadiusRange');
waveRadiusRange.value = 600;
//waveStrength
const waveStrengthRange = document.getElementById('waveStrengthRange');
waveStrengthRange.value = 200;
//waveSpeed
const terrainSpeedRange = document.getElementById('terrainSpeedRange');
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
  terrainSpeed = 0;
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

  
 
  if (terrain.toggleState == true && mouseIsPressed == true && mouseInCanvas) {
    radialLoop = waveRadiusRange.value;
    waveStrength = waveStrengthRange.value;
    terrainSpeed = terrainSpeedRange.value;
    //move to mouse location
    translate(mouseX, mouseY);

    let currentTerrainShape = [];

    //shape funtion:
    beginShape();

    //main loop for terrain
    for (var i = 0; i < waveStrength; i++) {
      var ang = map(i, 0, waveStrength, 0, TWO_PI);
      var rad = radialLoop * noise(i * 0.01, t * 0.005); //radius
      var x = rad * cos(ang);
      var y = rad * sin(ang);

      
      // Add the current point to the shape
      curveVertex(x, y);
      currentTerrainShape.push([x, y]); // Store the current point in the currentShape array

    }
    endShape(CLOSE);

    // Add the current shape to the shapes array
    terrainShapes.push(currentTerrainShape);

    //incrementing time

    t += Number(terrainSpeed); //terrain speed value seems to start as a string not sure why. Used number here to convert it into a number.

    


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



// //WORKING WITH THE DOM:

// //these appending functions could possibly be transferred to a seperate file as modules to import

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




















//Button Event Listeners:


//tools

const terrainButton = document.getElementById('terrainButton')
terrainButton.onclick = terrainFile;

const spiralButton = document.getElementById('spiralButton')
spiralButton.onclick = spiralFile;

const wavesButton = document.getElementById('wavesButton')
wavesButton.onclick = wavesFile;

const pencilButton = document.getElementById('pencilButton')
pencilButton.onclick = pencilFile;


//save and clear:
const downloadPNG = document.getElementById('downloadPNG')
downloadPNG.onclick = savePNG;

const downloadSVG = document.getElementById('downloadSVG')
downloadSVG.onclick = terrainSaveSvg;

const transparentBG = document.getElementById('transparentBG')
transparentBG.onclick = clearFile;



//bg
const randomBG = document.getElementById('randomBG')
randomBG.onclick = randomBGFile;

//resize canvas
const resizeOK = document.getElementById('resizeOK')
resizeOK.onclick = resizeArtboard;



//FUNCTIONS FOR BUTTONS:

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

function savePNG() {
    saveCanvas('Terrain_byemalin', 'png')
}
  
function clearFile() {
    clear();
    terrainShapes = [];
}

function randomBGFile() {
  background(color(random(255), random(255), random(255)));
  terrainShapes = [];
}

//resize artboard

function resizeArtboard(){
    const newHeight = document.getElementById('artboardHeight').value;
    const newWidth = document.getElementById('artboardWidth').value;

    resizeCanvas(newWidth, newHeight);
}


//terrain save as SVG

function terrainSaveSvg() {
  console.log('Terrain Save Fired');
  // Create a new graphics object and draw each shape in the shapes array
  let g = createGraphics(width, height, SVG);
  g.background(255);
  g.strokeWeight(0.5);
  g.noFill();
  for (let i = 0; i < terrainShapes.length; i++) {
    let shape = terrainShapes[i];
    g.beginShape();
    for (let j = 0; j < shape.length; j++) {
      g.curveVertex(shape[j][0], shape[j][1]);
    }
    g.endShape(CLOSE);
  }
  
  // Use the save() function to download the graphics object as an SVG file
  save(g, 'byemalin.svg');
}

