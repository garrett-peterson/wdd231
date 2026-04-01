const bookElement = document.querySelector("#bookCards");
const path = "data/books.json";

let data;

async function getBookData() {
    const response = await fetch(path);
    data = await response.json();

    displayData(data.books);
}

const displayData = (books) => {
    books.forEach(book => {
        let card = document.createElement('section');
        let name = document.createElement('h2');
        let author = document.createElement('p');
        let genre = document.createElement('p');
        let button = document.createElement('button');

        name.textContent = book.title;
        author.textContent = book.author;
        genre.textContent = book.genre;

        button.classList.add('learn');
        button.textContent = "Learn More";
        button.onclick = () => displayBookInfo(book);

        card.appendChild(name);
        card.appendChild(author);
        card.appendChild(genre);
        card.appendChild(button);

        bookElement.appendChild(card);
    });
}

getBookData();

const modal = document.querySelector('#book-details');

function displayBookInfo(book) {
    modal.innerHTML = "";
    modal.innerHTML = `
    <button id="closeModal"><span style="color: #C6A85E;">&times;</span></button>
    <h2 class="center">${book.author}</h2>
    <p class="center">${book.title}</p>
    <p class="center">${book.genre}</p>
    <p><br></p>
    <p>${book.description}</p>
    <p><br></p>
    <p class="center">Published on: ${book.publishedDate}</p>
    <p class="center">Page Count: ${book.pages}</p>
    <p class="center">Price: $${book.price}</p>
    `;
    modal.showModal();

    closeModal.addEventListener("click", () => {
        modal.close();
  });

}