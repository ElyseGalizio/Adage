// API Call for the quote

fetch('https://api.quotable.io/random')
  .then(response => response.json())
  .then(quotes => {
    document.getElementById("quote-text").innerHTML = '"' + quotes.content + '"';
    document.getElementById("author").innerHTML = quotes.author;
  })

  


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



//
// Translate feature
//

const fromText = document.querySelector(".from-text"),
toText = document.querySelector(".to-text"),
exchageIcon = document.querySelector(".exchange"),
selectTag = document.querySelectorAll("select"),
icons = document.querySelectorAll(".row i");
translateBtn = document.querySelector("button"),


// Select language

selectTag.forEach((tag, id) => {
    for (let country_code in countries) {
        let selected = id == 0 ? country_code == "en-GB" ? "selected" : "" : country_code == "fr-FR" ? "selected" : "";
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});


// Translate btn

translateBtn.addEventListener("click", () => {
    let text = speechMsgInput.innerHTML,
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
    if(!text) return;
    toText.setAttribute("placeholder", "Translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;
        data.matches.forEach(data => {
            if(data.id === 0) {
              document.getElementById("quote-text").innerHTML = data.translation;
            }
        });
        toText.setAttribute("placeholder", "Translation");
    });
});

// Write text

icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        if(!fromText.value || !toText.value) return;
        if(target.classList.contains("fa-copy")) {
            if(target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
            }
        } 
    });
});

// Replace original text by French


