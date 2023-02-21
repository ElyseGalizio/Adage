fetch('https://api.quotable.io/random')
  .then(response => response.json())
  .then(quotes => {
    // document.getElementById("quote").innerHTML = quotes.content;
    // document.getElementById("author").innerHTML = quotes.author;
  })



// Initialize an empty array to store quotes
const favoriteQuotes = [];

function addtoFavorites() {
  
  const quote = document.getElementById("quote").innerText;
  const author = document.getElementById("author").innerText;

  const quoteObject = {
    quote: quote,
    author: author
  }

  favoriteQuotes.push(quoteObject);
  console.log(favoriteQuotes);

}

function generateFavoriteQuoteCard(quote, author) {
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

// create function to add quote to array
// Create a function which injects each quote into favorites page
// when favorites page loads, call function which injects each quote into favorites page