let abs;
let oldVals = [];
let images = []; // an array that holds my images
let imgIndex = 0; // index that keeps track of which image we are showing

function preload() {
  images[0] = loadImage("img/taco1.jpg");
  images[1] = loadImage("img/taco2.jpg");
  images[2] = loadImage("img/taco3.jpg");
}

function setup() {
  createCanvas(400, 400);
  abs = new BeatStep("Arturia BeatStep");
  image(images[0], 0, 0, width, height);
}
function draw() {
  circle(mouseX, mouseY, 20);
  console.log(abs.pads);
  let event = false;
  // checck to see if history of values are the same incoming values. if they are different, pass that on as a new width information
  for (let i = 0; i < 16; i++) {
    if (oldVals[i] !== abs.pads[i]) {
      event = true;
    }
    oldVals[i] = abs.pads[i];
  }
  if (event) {
    image(images[imgIndex], 0, 0, width, height);
    imgIndex++;
    if (imgIndex >= images.length) {
      imgIndex = 0;
    }
  }
}
