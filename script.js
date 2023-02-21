fetch('https://api.quotable.io/random')
  .then(response => response.json())
  .then(quotes => {
    document.getElementById("quote").innerHTML = quotes.content;
    document.getElementById("author").innerHTML = quotes.author;
  })


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

