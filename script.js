function generateQuote() {
  fetch('https://api.quotable.io/random')
  .then(response => response.json())
  .then(quotes => {
    document.getElementById("quote").innerHTML = quotes.content;
    document.getElementById("author").innerHTML = quotes.author;
  })
}


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