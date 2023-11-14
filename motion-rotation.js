let abs;

let a = 0;
function setup() {
  createCanvas(600, 400);
  noStroke();
  abs = new BeatStep("Arturia BeatStep");
}
function draw() {
  background("black");

  translate(300, 200);

  let speed = abs.dials[0] / 127;
  a += speed;
  rotate(a);
  circle(100, 100, 50);
}
