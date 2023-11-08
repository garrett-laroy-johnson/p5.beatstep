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

// const myInput = WebMidi.getInputByName("Arturia BeatStep");
// console.log(MyInput);

// let freshMIDI = [];
