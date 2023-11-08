// thanks to dbarrett: https://editor.p5js.org/dbarrett/sketches/HJhBG-LI7

WebMidi.enable()
  .then(onEnabled)
  .catch((err) => alert(err));

function onEnabled() {
  // Inputs
  WebMidi.inputs.forEach((input) =>
    console.log(input.manufacturer, input.name)
  );

  // Outputs
  WebMidi.outputs.forEach((output) =>
    console.log(output.manufacturer, output.name)
  );
}

// dial ctrl values as encoded into BeatStep firmware.
dialMap = [10, 74, 71, 76, 77, 93, 73, 75, 114, 18, 19, 16, 17, 91, 79, 72];

class BeatStep {
  constructor(type) {
    this.device = type;
    this.init(this);
    this.dials = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.notesOn = [];
    this.play = 0;
    this.record = 0;
    this.stop = 0;
    this.ff = 0;
    this.rw = 0;
    this.initDom();
  }
  updateCtrl(data) {
    let n = data[1];
    let v = data[2];
    for (let i = 0; i < 16; i++) {
      if (n == dialMap[i]) {
        this.dials[i] = v;
      }
    }
  }
  updateSeq(data) {
    let n = data[1];
    let v = data[2];
    // for (let i = 0; i < 16; i++) {
    //   if (n == Seq[i]) {
    //     this.seq[i] = v;
    //   }
    // }
  }
  initDom() {
    this.dialsDom = createP("");
    this.notes = createP("");
  }
  display() {
    this.dialsDom.html("dials = " + this.dials);
    //  this.dialsDom.html("notes on = " + this.notesOn);
  }
  init(ref) {
    WebMidi.enable(function (err) {
      //check if WebMidi.js is enabled

      if (err) {
        console.log("WebMidi could not be enabled.", err);
      } else {
        console.log("WebMidi enabled!");
      }
    })
      .then(function () {
        //name our visible MIDI input and output ports
        console.log("---");
        console.log("Inputs Ports: ");
        for (let i = 0; i < WebMidi.inputs.length; i++) {
          console.log(i + ": " + WebMidi.inputs[i].name);
        }
      })
      .then(function () {
        // take JS object argument to look for device name
        let index = WebMidi.inputs.findIndex((x) => x.name === ref.device);
        ref.inputSoftware = WebMidi.inputs[index];

        if (ref.inputSoftware) {
          console.log("connected to " + ref.device);
        } else {
          console.log("error connecting to MIDI device");
        }
      })
      .then(function () {
        // Listen to control change message on all channels
        ref.inputSoftware.addListener("controlchange", "all", function (e) {
          ref.ctrl = e;
          if (ref.print) {
            console.log(e.data);
          }
          ref.updateCtrl(e.data);
          ref.display();
        });

        // Listen to control change message on all channels
        ref.inputSoftware.addListener("noteon", "all", function (e) {
          console.log(e.note.identifier, "on", e.message.channel);
          console.log(e);
          // ref.updateSeq();
        });

        // Listen to control change message on all channels
        ref.inputSoftware.addListener("noteoff", "all", function (e) {
          console.log(e.note.identifier, "off", e.message.channel);
          // ref.updateSeq();
        });
      });

    //
    //end of MIDI setup
    //
  }
}
