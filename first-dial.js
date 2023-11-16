let abs;

function setup() {
  createCanvas(400, 400);
  noStroke();
  abs = new BeatStep("Arturia BeatStep");
  rectMode(CENTER);
}
function draw() {
  background("black");
  // only get the first dials
  let val = map(abs.dials[0], 0, 127, 0, 400); // 127 is MIDI range

  if (abs.dials[0] > 64) {
    circle(200, 200, val);
  } else {
    square(200, 200, val);
  }
}
