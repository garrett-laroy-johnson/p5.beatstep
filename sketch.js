let korg;

let x = []; // hold 8 x values
let y = []; // hold 8 y values
let w = []; // hold 8 width values
let f = []; // hold 8 fill values

function setup() {
  createCanvas(400, 400);
  noStroke();
  korg = new KorgNano("nanoKONTROL2");

  for (let i = 0; i < 8; i++) {
    x[i] = random(width - 40);
    y[i] = random(height - 40);
  }
}

function draw() {
  background("black");

  fill(korg.faders[0]);

  for (let i = 0; i < 8; i++) {
    w[i] = map(korg.dials[i], 0, 127, 0, 400);
    f[i] = map(korg.faders[i], 0, 127, 0, 255);
    fill(f[i]);
    circle(x[i], y[i], w[i]);
  }
}
