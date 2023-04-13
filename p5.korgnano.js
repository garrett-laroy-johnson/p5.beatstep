// thanks to dbarrett: https://editor.p5js.org/dbarrett/sketches/HJhBG-LI7

class KorgNano {
  constructor(type) {
    this.device = type;
    this.init(this);
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

      console.log(ref.device);
      //Choose an input port
      let index = WebMidi.inputs.findIndex((x) => x.name === ref.device);
      let inputSoftware = WebMidi.inputs[index];
      //The 0 value is the first value in the array
      //Meaning that we are going to use the first MIDI input we see
      //This can be changed to a different number,
      //or given a string to select a specific port

      // Listen to control change message on all channels
      inputSoftware.addListener("controlchange", "all", function (e) {
        console.log("Received 'controlchange' message.", e.value);
        console.log(e.controller.number);
      });

      //
      //end of MIDI setup
      //
    });
  }
}
