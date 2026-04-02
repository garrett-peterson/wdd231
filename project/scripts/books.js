import { displayBookInfo } from "./modal.js";

const bookElement = document.querySelector("#bookCards");
const wishlistDisplay = document.querySelector('#wishlistDisplay');

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
        img.alt = "Book Cover";
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

getWishlist();
getBookData();

if (bookElement) {
    bookElement.addEventListener('click', handleStarClick);
}