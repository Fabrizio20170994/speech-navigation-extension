import queryFocusable from "ally.js/src/query/focusable";
import focus from "ally.js/src/element/focus";

const focusableElements = queryFocusable();

let currentFocused = 0;

focus(focusableElements[currentFocused]);

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  console.log("Su navegador soporta reconocimiento de voz");
} else {
  console.log("Su navegador no soporta reconocimiento de voz");
}

const recognition = new SpeechRecognition();
recognition.lang = "es-PE";

recognition.addEventListener("start", startSpeechRecognition);

function startSpeechRecognition() {
  console.log("Speech Recognition Active");
}

recognition.addEventListener("end", endSpeechRecognition);

function endSpeechRecognition() {
  console.log("Speech Recognition Disconnected");
}

recognition.addEventListener("result", resultOfSpeechRecognition);
function resultOfSpeechRecognition(event) {
  const transcript = event.results[0][0].transcript;
  switch (transcript) {
    case "Siguiente.":
      handleNextElement();
      break;
    case "Anterior.":
      handlePreviousElement();
      break;
    default:
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
