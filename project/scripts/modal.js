const modal = document.querySelector('#book-details');

export function displayBookInfo(book) {
    modal.innerHTML = "";
    modal.innerHTML = `
    <button id="closeModal"><span style="color: #C6A85E;">&times;</span></button>
    <h2 class="center">${book.title}</h2>
    <p class="center">By: ${book.author}</p>
    <p class="center">Genre: ${book.genre}</p>
    <p><br></p>
    <p>${book.description}</p>
    <p><br></p>
    <p class="center">Published on: ${book.publishedDate}</p>
    <p class="center">Page Count: ${book.pages}</p>
    <p class="center">Price: $${book.price}</p>
    <img class="cover center" src="images/${book.image}" alt="${book.title} cover">
    `;
    modal.showModal();

    closeModal.addEventListener("click", () => {
        modal.close();
  });

}