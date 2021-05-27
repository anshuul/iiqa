import axios from "axios";

// let messageObj = new SpeechSynthesisUtterance()
var voices = window.speechSynthesis.getVoices();
export function textToSpeech(message) {
  let messageObj = new SpeechSynthesisUtterance();
  messageObj.voice = voices[2];
  messageObj.lang = "en-IN";
  messageObj.volume = 1;
  messageObj.rate = 0.9;
  messageObj.pitch = 1;
  messageObj.text = message;
  return [window.speechSynthesis.speak(messageObj)];
}

export const dbAPI = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const getHeightForMainContainer = () => {
  // const heightOfNavbarInVH = (100 * 64) / window.innerHeight;
  // return `${100 - heightOfNavbarInVH}vh`;
  const navBar = document.querySelector("nav");
  let navBarHeight = 0;
  if (navBar) navBarHeight = navBar.offsetHeight;
  console.log(navBar, navBarHeight);
  return `${window.innerHeight - navBarHeight}px`;
};

// util method for capitalize
export const capitalize = (text) => text[0].toUpperCase() + text.slice(1)
