let abs;
//let polySynth;
let colorPal = ["#0f5e9c", "#2389da", "#1ca3ec", "#5abcd8", "#74ccf4"];

let colors = [];

let y = []; // holds y values

let x = []; // holds x values

let speed = []; // hold speed values

let numDrops = 5000; // 1000 rain drops

function setup() {
  createCanvas(1000, 800);
  noStroke();
  //polySynth = new p5.PolySynth();
  abs = new BeatStep("Arturia BeatStep");
  abs.avg = 90; // number of frames over which to average MIDI input. higher = smoother, lower = more sudden
  // initialize x,y, and color values for each rain drop
  for (let i = 0; i < numDrops; i++) {
    let c = random(colorPal);
    colors.push(c);

    let ex = random(width);
    x.push(ex);

    let why = random(height);
    y.push(why);

    let s = random(4, 7);
    speed.push(s);
  }
  console.log(colors);
}
function draw() {
  ``;
  background("black");
  abs.avgCtrl();

  let num = map(abs.dialsAvg[0], 0, 127, 0, numDrops); // big dial in top left, abs encoder goes from 0-127

  for (let i = 0; i < num; i++) {
    fill(colors[i]);
    ellipse(x[i], y[i], 4 / speed[i], 40 / speed[i]);
    y[i] += speed[i];

    if (y[i] > height) {
      y[i] = -40;
    }
  }
}
