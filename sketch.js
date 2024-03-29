let s = 0;
let abs;

function setup() {
  createCanvas(600, 150);
  noStroke();
  abs = new BeatStep("Arturia BeatStep");
}
function draw() {
  background("black");
  s = height / 2;
  let i = 0;
  for (let y = 0; y < 2; y++) {
    for (let x = 0; x < 8; x++) {
      let val = map(abs.dials[i], 0, 127, 0, s); // 127 is MIDI range
      circle(s / 2 + x * s, s / 2 + y * s, val);
      i++;
    }
  }
}
