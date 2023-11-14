let abs;
let x = 0;

function setup() {
  createCanvas(600, 400);
  noStroke();
  abs = new BeatStep("Arturia BeatStep");
}
function draw() {
  background("black");

  circle(x, 200, 50);

  speed = abs.dials[0] / 64;

  x += speed;

  if (x > width) {
    x = 0;
  }
}
