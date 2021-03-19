import axios from 'axios'

// let messageObj = new SpeechSynthesisUtterance()
var voices = window.speechSynthesis.getVoices();
export function textToSpeech(message) {
  let messageObj = new SpeechSynthesisUtterance();
  messageObj.voice = voices[2];
  messageObj.lang = "en-US";
  messageObj.volume = 1;
  messageObj.rate = 0.9;
  messageObj.pitch = 1;
  messageObj.text = message;
  return [window.speechSynthesis.speak(messageObj)];
}

export const dbAPI = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  headers: { 'Content-Type': 'application/json' },
})
