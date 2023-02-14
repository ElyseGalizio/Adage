fetch('https://api.quotable.io/random')
  .then(response => response.json())
  .then(quotes => {
    document.getElementById("quote").innerHTML = quotes.content;
    document.getElementById("author").innerHTML = quotes.author;
  })

  