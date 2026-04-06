import { displayBookInfo } from "./modal.js";

const bookElement = document.querySelector("#bookCards");
const wishlistDisplay = document.querySelector('#wishlistDisplay');

const allBooks = document.querySelectorAll('[name="books"]');
const runningTotal = document.querySelector('#runningTotal');

const upcomingBooks = document.querySelector('#upcoming');
const featuredBook = document.querySelector('#featured');


let currentPrice;
if (runningTotal) {
    currentPrice = parseFloat(runningTotal.textContent, 10);
}

const path = "data/books.json";

let data;

async function getBookData() {
    try {
        const response = await fetch(path);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        data = await response.json();

        if (bookElement) {
            displayData(data.books);
        }
        if (wishlistDisplay) {
            displayWishlist(data.books);
        }

        if (upcomingBooks) {
            loadUpcomingBooks(data.books);
        }

        if (featuredBook) {
            loadFeaturedBook(data.books);
        }

    } catch (error) {
        console.error("Error fetching book data:", error);
        if (bookElement) {
            bookElement.innerHTML = "<p>Sorry, we couldn't load the books right now.</p>";
}
    }
}

const displayData = (books) => {
    books.forEach(book => {

        // wishlistDisplay
        // bookElement

        let card = document.createElement('section');

        let header = document.createElement('div');

        let name = document.createElement('h2');
        let author = document.createElement('p');
        let genre = document.createElement('p');
        let img = document.createElement('img');
        let button = document.createElement('button');

        if (bookElement) {
            let star;

            let isWishlisted = wishlist.includes(book.id);
            if(isWishlisted) {
                star = "★";
            } else {
                star = "☆";
            }

            let starBTN = document.createElement('button');
            let wishlistContainer = document.createElement('div');
            let wish = document.createElement('p');

            starBTN.textContent = star;
            starBTN.classList.add('star');
            starBTN.dataset.id = book.id;

            wish.textContent = "Wishlist Now: ";
            wishlistContainer.classList.add("wishlistContainer");
            header.classList.add("cardHead");

            wishlistContainer.appendChild(wish);
            wishlistContainer.appendChild(starBTN);

            header.appendChild(name);
            header.appendChild(wishlistContainer);

        }
        else {
            header.appendChild(name);
        }

        name.textContent = book.title;
        author.textContent = book.author;
        genre.textContent = book.genre;

        img.src = `images/${book.image}`;
        img.alt = `${book.title} cover`;
        img.loading = "lazy";
        img.classList.add('cover');

        button.classList.add('learn');
        button.textContent = "Learn More";
        button.onclick = () => displayBookInfo(book);
        
        card.appendChild(header);

        card.appendChild(author);
        card.appendChild(genre);
        card.appendChild(img);
        card.appendChild(button);

        if (bookElement) {
            bookElement.appendChild(card);
        }
        if (wishlistDisplay) {
            wishlistDisplay.appendChild(card);
        }
        
    });
}

let wishlist;

function getWishlist() {
    let rawData;
    const itemKey = 'wishlist-ls';

    if (itemKey in localStorage) {
        rawData = localStorage.getItem(itemKey);
        wishlist = JSON.parse(rawData);

    } else {
        wishlist = [];
    }
}

function handleStarClick(event) {

    let clickedID = event.target.dataset.id;

    if (event.target.classList.contains('star')) {
        if (wishlist.includes(clickedID)) {
            let remove = wishlist.indexOf(clickedID);

            event.target.textContent = "☆";

            wishlist.splice(remove, 1);
            localStorage.setItem('wishlist-ls', JSON.stringify(wishlist));
        } 
        else {
            wishlist.push(clickedID);
            localStorage.setItem('wishlist-ls', JSON.stringify(wishlist));

            event.target.textContent = "★";
        }
    }
    console.log(wishlist);
}

function displayWishlist(books) {
   let filtered = new Array();

   books.forEach(book => {
    if (wishlist.includes(book.id)){
        filtered.push(book);
    }});
    displayData(filtered);
}

allBooks.forEach(book =>{
    book.addEventListener('change', (event) => {
    if (event.target.checked) {
      addTotal(event.target.value);
    } else {
      removeTotal(event.target.value);
    }
  });
});

function addTotal(book) {
    const add = data.books[book-1];
    currentPrice += add.price;
    runningTotal.textContent = currentPrice.toFixed(2);
}

function removeTotal(book) {
    const remove = data.books[book-1];
    currentPrice -= remove.price;
    if (currentPrice < 0) {
        runningTotal.textContent = 0.00;
    }
    else {
        runningTotal.textContent = currentPrice.toFixed(2);
    }
}

function loadUpcomingBooks(books) {
    const today = new Date().toISOString().split('T')[0];
    let unpublished = ``;

    books.forEach(book => {
        if (book.publishedDate > today) {
            unpublished += `
                <div class="unpublished">
                    <br>
                    <p>${book.title}</p>
                    <p>Will be published on: ${book.publishedDate}</p>
                    <p>Written by: ${book.author}</p>
                    <br>
                </div>
            `;
        }
        upcomingBooks.innerHTML = unpublished;
    });
}

function shuffled(elements) {
    const copy = [...elements];
    let m = copy.length;

    while (m) {
        const i = Math.floor(Math.random() * m--);

        [copy[m], copy[i]] = [copy[i], copy[m]];
    }

    return copy;
}


function chooseRandom(elements, n) {
     return shuffled(elements).slice(0, n);
}

function loadFeaturedBook(books) {
    const featuredBooks = [];

    books.forEach(book => {
        if(book.featured == true) {
            featuredBooks.push(book);
        }
    });

    const filteredBook = chooseRandom(featuredBooks, 1);

    console.log(filteredBook[0].title);
    featuredBook.innerHTML = `
        <br>
        <div class="highlight">
            <h3>${filteredBook[0].title}</h3>
            <p>${filteredBook[0].description}</p>
            <img src="images/${filteredBook[0].image}" alt="Cover for ${filteredBook[0].title}">
        </div>
    `;
}


getWishlist();
getBookData();

if (bookElement) {
    bookElement.addEventListener('click', handleStarClick);
}