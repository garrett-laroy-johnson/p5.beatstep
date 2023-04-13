//background color variable
var bgColor;

//color of a square
var squareColor;

//text to be displayed
var displayText;

//sound to be played
var soundFX;

let b;

function setup() {
  //400 by 400 pixel canvas
  createCanvas(400, 400);

  //starting background color
  bgColor = color(220, 220, 200);

  //starting square color
  squareColor = color(100);

  //starting text
  displayText = "Nothing received";

  ////
  //Setting up MIDI
  ////
  b = new KorgNano("nanoKONTROL2");
}

function draw() {
  //Draw background with background color variable
  //Will change every time there is a note on
  background(bgColor);

  //Drawing a rectangle, with no outline,
  //Middle of the screen (width and height divided by two)
  //Changes
  fill(squareColor);
  noStroke();
  rect(100, 100, width / 2, height / 2);

  //Displaying text
  //Little bit under the box above
  //Changes the text when a number 64 MIDI note is on and off
  fill(0);
  textAlign(CENTER);
  textSize(20);
  text(displayText, width / 2, 350);
}
