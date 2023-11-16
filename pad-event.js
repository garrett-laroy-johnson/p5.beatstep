let s = 0;
let abs;
let oldVals = []; // the previous frame of abs.pads;

let kick;
let snare;
let hihat;

function preload() {
  kick = loadSound("dry-short-kick.wav");
  snare = loadSound("snare.wav");
  hihat = loadSound("hi-hat.wav");
}

function setup() {
  createCanvas(600, 600);
  noStroke();
  background(0);
  abs = new BeatStep("Arturia BeatStep");
}

function draw() {
  let vol; // hold the volume information
  let pad; // hold the index of the pad that trigger the event
  let event = false; // our flag that indicates if we have a new value. true or false. by default it's false!
  // our ffor loop looks at our oldVals array and compares each item to the new incoming values from the midi device
  for (let i = 0; i < 16; i++) {
    if (oldVals[i] !== abs.pads[i]) {
      event = true; // if there is a difference, it sets the flag to true.
      vol = abs.pads[i] / 127;
      pad = i;
    }
    oldVals[i] = abs.pads[i];
  }

  if (event == true) {
    let x = random(width);
    let y = random(height);
    let w = random(100);
    circle(x, y, w);
    // attach our vol variable to the sound play function

    if (pad == 0) {
      kick.setVolume(vol);
      kick.play();
    }
    if (pad == 2) {
      hihat.setVolume(vol);
      hihat.play();
    }
    if (pad == 9) {
      snare.setVolume(vol);
      snare.play();
    }
  }
}

function mousePressed() {
  //   let x = random(width);
  //   let y = random(height);
  //   let w = random(100);
  //   circle(x, y, w);
}
