// function run(run) {
//     document.getElementById('output').textContent = run.value;
//   };

  console.log("hello from the script!");
  const synth = window.speechSynthesis;


document.querySelector("#myRange").onclick = () => {
	speak("sick");
};

// document.querySelector("#door1").onclick = () => {
// 	speak("sick");
// };

  // function speak(text) {} --> this is the same as below
const speak = (text) => {
	if (synth.speaking) {
		console.error("it's speaking already");
		return;
	}

	let utterThis = new SpeechSynthesisUtterance(text);
	synth.speak(utterThis);
};
