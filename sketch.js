//color of a square
var squareColor;

//text to be displayed
var displayText;

// declare a varible that is going to hold our KorgNano object.
let b;

let c1; //will hold color1
let c2; // will hold color2

let c3; //will hold color3
let c4; // will hold color4

let x;
let y;

let r = 30;

let angle = 0.0;

let speed = 0.01;

let sqr;

function setup() {
  b = new KorgNano("nanoKONTROL2");
  sqr = new GradientSquare();

  //400 by 400 pixel canvas
  createCanvas(400, 400);

  //starting background color
  bgColor = color(220, 220, 200);

  //starting square color
  squareColor = color(100);

  //starting text
  displayText = "Nothing received";

  // assign colors to p5 color objects
  c1 = color("#40c9ff");
  console.log(c1);
  c2 = color("#e81cff");
  c3 = color("#bf0fff");
  c4 = color("#cbff49");

  x = width / 2;
  y = height / 2;
}

function draw() {
  // access faders by using dot notation, then the array name faders, then their position in the array.

  let xfade1 = b.faders[0] / 127; // remember MIDI values always default to 0-127, so we need to scale. lerpColor() will expect a floating point value 0-1.
  let xfade2 = b.faders[1] / 127;
  // these scaled variables drive interpolation between one color of the gradient.
  let c5 = lerpColor(c1, c2, xfade1);
  let c6 = lerpColor(c3, c4, xfade2);

  // draw gradient;
  for (let x = 0; x < width; x++) {
    let interp = x / width;
    let c7 = lerpColor(c5, c6, interp);
    stroke(c7);
    line(x, 0, x, height);
  }

  //Drawing a rectangle, with no outline,
  //Middle of the screen (width and height divided by two)
  //Changes
  fill(squareColor);
  noStroke();

  rect(x, y, width / 2, height / 2);

  x = sin(angle) * r;
  y = cos(angle) * r;

  angle += speed;

  // update r and speed according to midi fader controls
  r = faders[0];
  speed = faders[1] * 0.001;

  //Displaying text
  //Little bit under the box above
  //Changes the text when a number 64 MIDI note is on and off
  fill(0);
  textAlign(CENTER);
  textSize(20);
  text(displayText, width / 2, 350);
}

class GradientSquare {
  constructor() {
    this.x = x; // left most line
    this.y = y; // topmost line
    this.w = w; // width of rect
    this.c1; //
    this.c2;
  }
  update(c1, c2) {
    this.c1 = c1;
    this.c2 = c2;
  }
  display() {
    for (let x = 0; x < this.w; x++) {
      let col = lerpColor(this.c2, this.c1, x);
      stroke(col);
      line(this.x + x, this.y, this.x + x, this.y + this.w);
    }
  }
}
