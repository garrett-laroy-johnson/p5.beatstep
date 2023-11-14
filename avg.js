let abs;

let y = []; // holds y values

function setup() {
  createCanvas(600, 150);
  noStroke();

  abs = new BeatStep("Arturia BeatStep");
  abs.avg = 90; // number of frames over which to average MIDI input. higher = smoother, lower = more sudden
}
function draw() {
  background("black");
  abs.avgCtrl();
  console.log(abs.dialsAvg);
  for (let i = 0; i < 16; i++) {
    y[i] = map(abs.dialsAvg[i], 0, 127, 0, height); // 127 is MIDI range
    circle(20 * i, y[i], 30);
  }
}
