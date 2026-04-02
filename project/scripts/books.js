import { displayBookInfo } from "./modal.js";

const bookElement = document.querySelector("#bookCards");
const path = "data/books.json";

let data;

async function getBookData() {
    try {
        const response = await fetch(path);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        displayData(data.books);

    } catch (error) {
        console.error("Error fetching book data:", error);
        bookElement.innerHTML = "<p>Sorry, we couldn't load the books right now.</p>";
    }
}

const displayData = (books) => {
    books.forEach(book => {
        let card = document.createElement('section');
        let name = document.createElement('h2');
        let author = document.createElement('p');
        let genre = document.createElement('p');
        let img = document.createElement('img');
        let button = document.createElement('button');

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

        card.appendChild(name);
        card.appendChild(author);
        card.appendChild(genre);
        card.appendChild(img);
        card.appendChild(button);

        bookElement.appendChild(card);
    });
}

getBookData();


