let colors = [
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

let abs;

function setup() {
  createCanvas(400, 400);
  background(0);

  abs = new BeatStep("Arturia BeatStep");
  // assign colors to p5 color objects
  //  abs.print = true;
}

function draw() {
  background(0);
  if (abs.MIDIon.length > 0) {
    for (let n of abs.MIDIon) {
      circle(200, 200, n);
    }
  }
}
