let abs;
//let polySynth;
let density = 10;
let spacing;
let noiseScale = 0.003;
let w = 4;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //polySynth = new p5.PolySynth();
  abs = new BeatStep("Arturia BeatStep");
  abs.avg = 33; // number of frames over which to average MIDI input. higher = smoother, lower = more sudden
  strokeWeight(4);
  //frameRate(10);
  noStroke();
}

function draw() {
  background(30);
  fill(100);
  abs.avgCtrl();

  w = abs.dialsAvg[3];

  density = abs.encoder;
  spacing = width / density;
  let mult = map(abs.dialsAvg[2], 0, 127, 0, 100);

  let xScale = map(abs.dialsAvg[1], 0, 127, 0.001, 0.01);
  let yScale = map(abs.dialsAvg[9], 0, 127, 0.001, 0.01);
  let tScale = map(abs.dialsAvg[10], 0, 127, 0.001, 0.01);
  for (let x = spacing; x < width; x += spacing) {
    for (let y = 0; y < height; y++) {
      let n = noise(x * xScale, y * yScale, frameCount * tScale);
      theta = map(n, 0, 1, -PI, PI);
      theta *= mult;

      let offX = sin(theta) * abs.dialsAvg[0];
      let offY = cos(theta) * abs.dialsAvg[8];
      circle(offX + x, offY + y, w);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
