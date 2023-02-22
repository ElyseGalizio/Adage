
// create function to add quote to array
function addtoFavorites() {
  const quote = document.getElementById("quote").innerText;
  const author = document.getElementById("author").innerText;

  const quoteObject = {
    quote: quote,
    author: author
  }

  const favoriteQuotes = JSON.parse(window.localStorage.getItem("quote"));
  if (favoriteQuotes !== null) {
    favoriteQuotes.push(quoteObject);
    window.localStorage.setItem('quote', JSON.stringify(favoriteQuotes));
  } else {
    window.localStorage.setItem('quote', JSON.stringify([quoteObject]));
  }
}

// create a function which retrieves favorites array from local storage and injects into DOM

function generateFavoriteQuoteCard(quote, author) { 
  document.getElementById("fav-click").innerHTML = "";
  document.getElementById("favorites-container").innerHTML += `<div>
  <p class="fav-quote">${quote}</p>
  <h2 class="fav-author">${author}</h2>
  <hr>
  </div>`
}

function renderFavoriteQuotes() {
  const favQuotesLocalStorage = JSON.parse(window.localStorage.getItem("quote"));
  for (let i = 0; i < favQuotesLocalStorage.length; i++) {
    generateFavoriteQuoteCard(favQuotesLocalStorage[i].quote, favQuotesLocalStorage[i].author)
    console.log(favQuotesLocalStorage[i]);
  }
}

function clearFavorites() {
  window.localStorage.clear();
  document.getElementById("favorites-container").innerHTML = "";
  document.getElementById("fav-click").innerHTML = "Click the logo to add your favorite quotes";
}

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


// Function generate quote = API Call for the quote + store all 10 recemt generated quotes

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
      
      // Push the quote object to the generatedQuotes array
      generatedQuotes.push(quoteObj);

      // Create a new div element to represent the recent quote
      const quoteDiv = document.createElement("div");
      quoteDiv.classList.add("recent-quote");
      quoteDiv.innerHTML = `<p>"${quoteObj.content}"</p><p>- ${quoteObj.author}</p>`;

      // Get the Recent Quotes div and append the new quote div to it
      const recentQuotesDiv = document.getElementById("recent-quotes");
      recentQuotesDiv.appendChild(quoteDiv);

      // Optional: limit the number of recent quotes displayed to 10
      if (recentQuotesDiv.childElementCount > 10) {
        recentQuotesDiv.removeChild(recentQuotesDiv.firstElementChild);
      }

      // Update the HTML with the new quote and author
      document.getElementById("quote-text").innerHTML = '"' + quotes.content + '"';
      document.getElementById("author").innerHTML = quotes.author;
    });
}

// Copy quote to clipboard using clipboard API

function copyQuote() {
  const textArea = document.getElementById("text-area");
  const textToCopy = textArea.innerText;
  
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      alert("Quote copied to clipboard");
    })
    .catch((error) => {
      console.error("Failed to copy text: ", error);
    });
}




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




// Translate feature

const fromText = document.querySelector(".from-text"),
toText = document.querySelector(".to-text"),
exchageIcon = document.querySelector(".exchange"),
selectTag = document.querySelectorAll("select"),
icons = document.querySelectorAll(".row i");
translateBtn = document.getElementById("translate-btn"),


// Select language

selectTag.forEach((tag, id) => {
    for (let country_code in countries) {
        let selected = id == 0 ? country_code == "en-GB" ? "selected" : "" : country_code == "fr-FR" ? "selected" : "";
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});


// Translate to French btn

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


