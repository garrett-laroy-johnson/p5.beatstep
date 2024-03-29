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

let abs;

let w = [];

let oldVals = [];

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

    w.push(100);
  }
}

function draw() {
  background(0);
  let event = false;
  // checck to see if history of values are the same incoming values. if they are different, pass that on as a new width information
  for (let i = 0; i < 16; i++) {
    if (oldVals[i] !== abs.pads[i]) {
      w[i] = abs.pads[i];
      event = true;
    }
    oldVals[i] = abs.pads[i];
  }
  console.log(abs.pads);
  for (let i = 0; i < 16; i++) {
    fill(colors[i]);
    circle(x[i], y[i], w[i]);

    if (w[i] > 0) {
      w[i]--;
    }
  }
}
