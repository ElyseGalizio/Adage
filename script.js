fetch('https://api.quotable.io/random')
  .then(response => response.json())
  .then(quotes => {
    document.getElementById("quote").innerHTML = quotes.content;
    document.getElementById("author").innerHTML = quotes.author;
  })

  function toggleNavbar() {
    const navLinks = document.getElementsByClassName("nav-link-list");
    if (navLinks.style.display === "none") {
      navLinks.style.display = "block";
    } else {
      navLinks.style.display = "none";
    }
  } 