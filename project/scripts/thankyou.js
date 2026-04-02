const myInfo = new URLSearchParams(window.location.search);

const fname = myInfo.get('fname');
const lname = myInfo.get('lname');
const email = myInfo.get('email');
const date = myInfo.get('submission_time');
const total = myInfo.get('finalTotal');

const boughtBooks = myInfo.getAll('books');

const thankYou = document.querySelector('#thanks');


const path = "data/books.json";

let data;

thankYou.innerHTML = `
<div class="thankYou">
<h2 class="thanks">Thank You!</h2>
<p>${fname} ${lname}, thank you for your order on ${date}</p>
<p>We will send tracking info to ${email}</p>
<p><br></p>
<p>Books Ordered:</p>
<ul id="orderedBooksList"></ul>
<p><br></p>
<p>Your final total is: $${total}</p>
</div>
`;

async function getBookData() {
    try {
        const response = await fetch(path);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        data = await response.json();
        getOrderedBooks(data.books);

    } catch (error) {
        console.error("Error fetching book data:", error);
            thankYou.innerHTML = "<p>Sorry, we couldn't load the books right now.</p>";
    }
}


function getOrderedBooks(books) {
    books.forEach(book => {
        if (boughtBooks.includes(book.id)){
            const li = document.createElement("li");
            li.textContent = book.title;
            orderedBooksList.appendChild(li);
        }

    });
}

getBookData();
