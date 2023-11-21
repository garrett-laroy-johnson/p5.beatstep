let slide; // var where my sound will be held;
// something that runs BEFORE setup. usually where we load images and other medialike sound
let abs;

let x = [];
let y = [];
let w = 40;

let oldVals = [];
function preload() {
  slide = loadSound("slide.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  background("purple");

  abs = new BeatStep("Arturia BeatStep");

  // initialize our animation x and y values
  for (let i = 0; i < 16; i++) {
    x[i] = random(width);
    y[i] = height;
  }
}

function draw() {
  let event = false;
  background("purple");

  if (abs.pads[0] > 0) {
    console.log("test");
  }

  // checck to see if history of values are the same incoming values. if they are different, pass that on as a new width information
  for (let i = 0; i < 16; i++) {
    if (oldVals[i] !== abs.pads[i]) {
      event = true;
      y[i] = -w;
    }
    oldVals[i] = abs.pads[i];
  }

  if (event == true) {
    slide.play();
  }

  for (let i = 0; i < 16; i++) {
    y[i] += 5;
    square(x[i], y[i], w);
  }
}
