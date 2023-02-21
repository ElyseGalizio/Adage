fetch('https://api.quotable.io/random')
  .then(response => response.json())
  .then(quotes => {
    // document.getElementById("quote").innerHTML = quotes.content;
    // document.getElementById("author").innerHTML = quotes.author;
  })



// Initialize an empty array to store quotes
const favoriteQuotes = [];

// create function to add quote to array
function addtoFavorites() {
  const quote = document.getElementById("quote").innerText;
  const author = document.getElementById("author").innerText;

  const quoteObject = {
    quote: quote,
    author: author
  }

  favoriteQuotes.push(quoteObject);
  console.log(favoriteQuotes);
  
  // store in local storage
  
  window.localStorage.setItem('quote', JSON.stringify(quoteObject));
  window.localStorage.setItem('author', JSON.stringify(quoteObject));
}


// create a function which retrieves favorites array from local storage
function generateFavoriteQuoteCard(quote, author) {
  window.localStorage.getItem(quote, author);
  document.getElementById("favorites-container").innerHTML += `<div>
  <p class="quote">${quote}</p>
  <h2 class="author">${author}</h2>
  </div>`
}

function renderFavoriteQuotes() {
  for (let i = 0; i < favoriteQuotes.length; i++) {
    generateFavoriteQuoteCard(favoriteQuotes[i].quote, favoriteQuotes[i].author)
  }
  console.log(favoriteQuotes);
}

// Create a function which injects each quote into favorites page from local storage
// when favorites page loads, call function which injects each quote into favorites page