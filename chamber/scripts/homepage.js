const cards = document.querySelector('#spotlights');
const path = "data/members.json";

let data;

async function getCompanyData() {
    const response = await fetch(path);
    data = await response.json();

    displayData(data.companies);
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

const displayData = (companies) => {

    const silverGold = [];

    companies.forEach(company => {
        if(company.membership === "Gold" || company.membership === "Silver") {
            silverGold.push(company);
        }
    });

    const filteredComp = chooseRandom(silverGold, 3);

    filteredComp.forEach(company => {

        
        let card = document.createElement('section');

        let row = document.createElement('div');
        row.classList.add("row");

        let textContainer = document.createElement('div');

        let name = document.createElement('h2');
        let membership = document.createElement('p');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let url = document.createElement('a');

        let logo = document.createElement('img');

        membership.textContent = `Membership rating: ${company.membership}`;
        membership.classList.add("rating");

        name.textContent = `${company.name}`;
        address.textContent = `ADDRESS: ${company.address}`;
        phone.textContent = `PHONE: ${company.phone}`;

        url.href = company.url;
        url.textContent = `${company.url}`;

        logo.setAttribute('src', company.image);
        logo.setAttribute('alt', `${company.name} logo`);
        logo.setAttribute('loading', 'lazy');
        
        card.appendChild(name);
        card.appendChild(membership)

        row.appendChild(logo);
        textContainer.appendChild(phone);
        textContainer.appendChild(address);
        textContainer.appendChild(url);

        row.appendChild(textContainer);
        card.appendChild(row);

        cards.appendChild(card);
        
    });
}

getCompanyData();


