let s = 0;
let abs;
//let polySynth;

let xSpacing = 15;
let ySpacing = 3;
let xMargin = 50;
let yMargin = 100;
let maxJ = 1; // the maximum vertical jitter
let maxW = 10; // the maxium possible circle width

let jits = []; // generate some jitters that can be accessed on the fly without knowing the number yet
let w = [];
let speeds = [];

function setup() {
  createCanvas(600, 600);
  //polySynth = new p5.PolySynth();
  abs = new BeatStep("Arturia BeatStep");

  for (let i = 0; i < 2000; i++) {
    let jit = random(-maxJ * i, maxJ * i);
    jits.push(jit);

    w.push(random(maxW));
  }

  //frameRate(10);
}

function draw() {
  background(220);
  maxJ = xMargin = map(abs.dials[2], 0, 127, 0, 40);

  xMargin = map(abs.dials[0], 0, 127, 0, width / 2);
  yMargin = map(abs.dials[8], 0, 127, 0, height / 2);

  ySpacing = map(abs.dials[1], 0, 127, 5, 30);
  xSpacing = map(abs.dials[9], 0, 127, 5, 30);

  for (let i = 0; i < 2000; i++) {
    jits[i] += random(-maxJ, maxJ);
  }

  let index = 0;
  for (let y = yMargin; y < height - yMargin; y += ySpacing) {
    for (let x = xMargin; x < width - xMargin; x += xSpacing) {
      let jit = jits[index % jits.length];
      circle(x, y + jit, w[index % w.length]);
      index++;
    }
  }
}
