let slide; // var where my sound will be held;
// something that runs BEFORE setup. usually where we load images and other medialike sound
let abs;

let oldVals = [];
function preload() {
  slide = loadSound("slide.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  abs = new BeatStep("Arturia BeatStep");
}

function draw() {
  background("purple");

  let event = false;
  // checck to see if history of values are the same incoming values. if they are different, pass that on as a new width information
  for (let i = 0; i < 16; i++) {
    if (oldVals[i] !== abs.pads[i]) {
      event = true;
    }
    oldVals[i] = abs.pads[i];
  }

  if (event == true) {
    slide.play();
  }
}
