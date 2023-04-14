// thanks to dbarrett: https://editor.p5js.org/dbarrett/sketches/HJhBG-LI7

let freshMIDI = [];

class KorgNano {
  constructor(type) {
    this.device = type;
    this.init(this);
    this.faders = [0, 0, 0, 0, 0, 0, 0, 0];
    this.dials = [0, 0, 0, 0, 0, 0, 0, 0];
    this.m = [0, 0, 0, 0, 0, 0, 0, 0];
    this.s = [0, 0, 0, 0, 0, 0, 0, 0];
    this.r = [0, 0, 0, 0, 0, 0, 0, 0];
    this.track = [0, 0];
    this.cycle = 0;
    this.marker = [0, 0, 0];
    this.play = 0;
    this.record = 0;
    this.stop = 0;
    this.ff = 0;
    this.rw = 0;
  }
  update() {
    let n = freshMIDI[0];
    let v = freshMIDI[1];
    if (n < 8) {
      this.faders[n] = v;
    } else if (n >= 16 && n <= 23) {
      this.dials[n - 16] = v;
    } else if (n >= 32 && n <= 39) {
      this.s[n - 32] = v;
    } else if (n == 41) {
      this.play = v;
    } else if (n == 42) {
      this.stop = v;
    } else if (n == 43) {
      this.rw = v;
    } else if (n == 44) {
      this.ff = v;
    } else if (n == 45) {
      this.stop = v;
    } else if (n == 46) {
      this.cycle = v;
    } else if (n >= 48 && n <= 55) {
      this.m[n - 48] = v;
    } else if (n >= 58 && n <= 59) {
      this.track[n - 58] = v;
    } else if (n >= 60 && n <= 62) {
      this.marker[n - 60] = v;
    } else if (n >= 64 && n <= 71) {
      this.r[n - 64] = v;
    }
    console.log(this);
  }
  init(ref) {
    WebMidi.enable(function (err) {
      //check if WebMidi.js is enabled

      if (err) {
        console.log("WebMidi could not be enabled.", err);
      } else {
        console.log("WebMidi enabled!");
      }

      //name our visible MIDI input and output ports
      console.log("---");
      console.log("Inputs Ports: ");
      for (let i = 0; i < WebMidi.inputs.length; i++) {
        console.log(i + ": " + WebMidi.inputs[i].name);
      }

      // take JS object argument to look for device name
      let index = WebMidi.inputs.findIndex((x) => x.name === ref.device);
      let inputSoftware = WebMidi.inputs[index];

      if (inputSoftware) {
        console.log("connected to " + ref.device);
      } else {
        console.log("error connecting to MIDI device");
      }

      // Listen to control change message on all channels
      inputSoftware.addListener("controlchange", "all", function (e) {
        displayText = e.data[1] + " " + e.data[2];
        freshMIDI = [e.data[1], e.data[2]];
        ref.update();
      });

      //
      //end of MIDI setup
      //
    });
  }
}
