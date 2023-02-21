const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-link-list");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

const navLink = document.querySelectorAll(".nav-links");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}


// Function generate quote = API Call for the quote + store all generated quotes

// Initialize an empty array to store quotes
const generatedQuotes = [];

function generateQuote() {
  fetch('https://api.quotable.io/random')
    .then(response => response.json())
    .then(quotes => {
      // Create an object to store the quote and author
      const quoteObj = {
        content: quotes.content,
        author: quotes.author
      };
      
      // Push the quote object to the allQuotes array
      generatedQuotes.push(quoteObj);

      // Update the HTML with the new quote and author
      document.getElementById("quote-text").innerHTML = '"' + quotes.content + '"';
      document.getElementById("author").innerHTML = quotes.author;
    })
}

// Eventlister for clicking on Generate button

document.getElementById("generate-btn").addEventListener("click", generateQuote);

// Download quote as image 

// Save a 'screesnhot' of a div as an image
function takeScreenshot(){
  html2canvas(document.querySelector("#quote-container")).then(canvas => {
  saveAs(canvas.toDataURL(), 'quote.png');
});
}

// Download function

function saveAs(uri, filename) {

var link = document.createElement('a');

if (typeof link.download === 'string') {

link.href = uri;
link.download = filename;

//Firefox requires the link to be in the body
document.body.appendChild(link);

//simulate click
link.click();

//remove the link when done
document.body.removeChild(link);

} else {

window.open(uri);

}
}


// Voiceover feature (not based on API, but on browser's included voiceover)

// Get the 'play' button
var button = document.getElementById('play-btn');

// Get the quote element.
var speechMsgInput = document.getElementById('quote-text');

// Get the voice select element.
var voiceSelect = document.getElementById('voices-list');


// Fetch the list of voices and populate the voice options.
function loadVoices() {
  // Fetch the available voices.
	var voices = speechSynthesis.getVoices();
  
  // Loop through each of the voices.
	voices.forEach(function(voice, i) {

    // Define a condition to select only "Karen" voice:

     if (voice.name.includes("Karen")){
     
      // Create a new option element.
      var option = document.createElement('option');
      
      // Set the options value and text.
      option.value = voice.name;
      option.innerHTML = voice.name;
        
      // Add the option to the voice selector.
      voiceSelect.appendChild(option);
     } 
      
	});
}

// Execute loadVoices.
loadVoices();

// Chrome loads voices asynchronously.
window.speechSynthesis.onvoiceschanged = function(e) {
  loadVoices();
};


// Create a new utterance for the specified text and add it to
// the queue.
function speak(text) {
  // Create a new instance of SpeechSynthesisUtterance.
	var msg = new SpeechSynthesisUtterance();
  
  // Set the text.
	msg.text = text;
  
  // If a voice has been selected, find the voice and set the
  // utterance instance's voice attribute.
	if (voiceSelect.value) {
		msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == voiceSelect.value; })[0];
	}
  
  // Queue this utterance.
	window.speechSynthesis.speak(msg);
}


// Set up an event listener for when the 'speak' button is clicked.
button.addEventListener('click', function(e) {
	if (speechMsgInput.innerHTML.length > 0) {
		speak(speechMsgInput.innerHTML);
	}
});




