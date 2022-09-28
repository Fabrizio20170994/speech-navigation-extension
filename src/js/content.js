import queryFocusable from "ally.js/src/query/focusable";
import focus from "ally.js/src/element/focus";
import "../css/content.css";

const focusableElements = queryFocusable();

let currentFocused = 0;
let mic;

const micURL =
	"https://img.icons8.com/fluency-systems-filled/96/000000/microphone.png";
const muteURL =
	"https://img.icons8.com/fluency-systems-filled/96/000000/no-microphone.png";

window.onload = () => {
	const micDiv = document.createElement("div");
	let micIcon =
		'<img id="micIcon" src="https://img.icons8.com/fluency-systems-filled/96/000000/no-microphone.png"/>';
	document.body.appendChild(micDiv);
	micDiv.classList.add("speech-mic-div");
	micDiv.innerHTML += micIcon;
	mic = document.getElementById("micIcon");
};

focus(focusableElements[currentFocused]);

const SpeechRecognition =
	window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
	console.log("Su navegador soporta reconocimiento de voz");
} else {
	console.log("Su navegador no soporta reconocimiento de voz");
}

const recognition = new SpeechRecognition();
const textInputs = ["input", "textarea"];
recognition.lang = "es-PE";

recognition.addEventListener("start", startSpeechRecognition);

function startSpeechRecognition() {
	console.log("Speech Recognition Active");
	mic.src = micURL;
}

recognition.addEventListener("end", endSpeechRecognition);

function endSpeechRecognition() {
	console.log("Speech Recognition Disconnected");
	mic.src = muteURL;
}

recognition.addEventListener("result", resultOfSpeechRecognition);
function resultOfSpeechRecognition(event) {
	const transcript = event.results[0][0].transcript;
	console.log(transcript);
	switch (transcript) {
		case "Siguiente.":
			handleNextElement();
			break;
		case "Anterior.":
			handlePreviousElement();
			break;
		case "Clic.":
		case "Click.":
		case "Clip.":
			document.activeElement.click();
			break;
		default:
			console.log(document.activeElement);
			if (
				document.activeElement &&
				textInputs.indexOf(document.activeElement.tagName.toLowerCase()) !== -1
			) {
				console.log(document.activeElement);
				document.activeElement.value = transcript;
			}
			console.log(transcript);
	}
}

document.addEventListener("keyup", function (event) {
	if (event.keyCode === 189) {
		// key "-"
		// document.activeElement.previousElementSibling.focus();
		recognition.start();
	}
});

function handleNextElement() {
	if (currentFocused === focusableElements.length - 1) {
		focus(focusableElements[0]);
		currentFocused = 0;
	} else {
		focus(focusableElements[currentFocused + 1]);
		currentFocused = currentFocused + 1;
	}
}

function handlePreviousElement() {
	if (currentFocused == 0) {
		focus(focusableElements[focusableElements.length - 1]);
		currentFocused = focusableElements.length - 1;
	} else {
		focus(focusableElements[currentFocused - 1]);
		currentFocused = currentFocused - 1;
	}
}
