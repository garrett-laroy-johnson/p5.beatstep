let abs;

let x = 200;
let y = 200;
let angles = [0.4, 1.0, 3.0];

let oldVals = [];

let clusters = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  abs = new BeatStep("Arturia BeatStep");
}
function draw() {
  background("white");

  for (let i = 0; i < clusters.length; i++) {
    clusters[i].update();
    clusters[i].show();
  }

  let event = false;
  // checck to see if history of values are the same incoming values. if they are different, pass that on as a new width information
  for (let i = 0; i < 16; i++) {
    if (oldVals[i] !== abs.pads[i]) {
      // w[i] = abs.pads[i];
      event = true;
    }
    oldVals[i] = abs.pads[i];
  }
  if (event == true) {
    let b = new Cluster();
    clusters.push(b);
  }
}

// the object declaration
function Cluster() {
  this.x = random(width);
  this.y = random(height);
  this.speeds = [random(-0.1, 0.1), random(-0.1, 0.1), random(-0.1, 0.1)];
  this.angles = [random(PI), random(PI), random(PI)];
  this.update = function () {
    for (let i = 0; i < 3; i++) {
      this.angles[i] += this.speeds[i];
    }
  };
  this.show = function () {
    for (let i = 0; i < 3; i++) {
      let x1 = this.x + sin(this.angles[i]) * 20;
      let y1 = this.y + cos(this.angles[i]) * 20;
      line(this.x, this.y, x1, y1);
    }
  };
}
