let colorPal = [
  "#60efff",
  "#00ff87",
  "#0061ff",
  "#45caff",
  "#ff930f",
  "#f89b29",
  "#ff0f7b",
  "#595cff",
  "#ffa585",
  "#ef709b",
  "#f9b16e",
  "#fbe9d7",
  "#e9b7ce",
  "#439cfb",
];

let colors = [];

let x = [];
let y = [];

let speeds = []; // speeds of circles
let xDirs = []; // directions of circles, -1 or 1

let yDirs = [];

let abs;

function setup() {
  createCanvas(400, 400);
  background(0);

  abs = new BeatStep("Arturia BeatStep");

  for (let i = 0; i < 16; i++) {
    let c = random(colorPal);
    colors.push(c);

    let ex = random(width);
    x.push(ex);

    let why = random(height);
    y.push(why);

    let speed = random(0.1, 2);
    speeds.push(speed);

    let dir = random(1);
    if (dir > 0.5) {
      xDirs.push(1);
    } else {
      xDirs.push(-1);
    }

    dir = random(1);
    if (dir > 0.5) {
      yDirs.push(1);
    } else {
      yDirs.push(-1);
    }
  }
}

function draw() {
  console.log(abs.pads);
  background(0);

  for (let i = 0; i < 16; i++) {
    let spd = map(abs.pads[i], 0, 127, 0, 20);

    x[i] += spd * xDirs[i];
    if (x[i] > width || x[i] < 0) {
      xDirs[i] *= -1;
    }

    y[i] += spd * yDirs[i];
    if (y[i] > width || y[i] < 0) {
      yDirs[i] *= -1;
    }

    fill(colors[i]);
    circle(x[i], y[i], 20);
  }
}
