let s = 0;
let abs;

let c1, c2;

function setup() {
  createCanvas(600, 600);
  noStroke();
  abs = new BeatStep("Arturia BeatStep");
  c1 = color("#C2E812");
  c2 = color("#8B9EB7");
  background("#91F5AD");
}
function draw() {
  s = height / 2;

  for (let i = 0; i < abs.MIDIon.length; i++) {
    let v = abs.MIDIon[i] / 127;
    let c = lerpColor(c1, c2, v);

    fill(c);
    circle(random(width), random(height), abs.MIDIon[i]);
  }
}
