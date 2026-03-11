const cards = document.querySelector('#cards');
const path = "data/members.json";

let data;

async function getCompanyData() {
    const response = await fetch(path);
    data = await response.json();

    displayGridData(data.companies);
}

const displayGridData = (companies) => {
    cards.className = "grid";
    companies.forEach(company => {
        

        let card = document.createElement('section');
        let name = document.createElement('h2');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let url = document.createElement('a');
        let membership = document.createElement('p');
        let logo = document.createElement('img');

        name.textContent = `${company.name}`;
        address.textContent = `${company.address}`;
        phone.textContent = `${company.phone}`;
        membership.textContent = `Membership rating: ${company.membership}`;

        url.href = company.url;
        url.textContent = company.url;

        logo.setAttribute('src', company.image);
        logo.setAttribute('alt', `${company.name} logo`);
        logo.setAttribute('loading', 'lazy');
        
        card.appendChild(logo);
        card.appendChild(name);
        card.appendChild(phone);
        card.appendChild(address);
        card.appendChild(url);
        card.appendChild(membership);
        
        cards.appendChild(card);
        
    });
}

const displayListData = (companies) => {
    let table = document.createElement('table');
    let body = document.createElement('tbody');
    cards.className = "list";
    companies.forEach(company => {
        
        
        
        let name = document.createElement('td');
        let address = document.createElement('td');
        let phone = document.createElement('td');
        let url = document.createElement('a');
        let link = document.createElement('td');
        let membership = document.createElement('td');
        
        let row = document.createElement('tr');

        name.textContent = `${company.name}`;
        address.textContent = `${company.address}`;
        phone.textContent = `${company.phone}`;
        membership.textContent = `Membership rating: ${company.membership}`;

        url.href = company.url;
        url.textContent = `Visit Website`;

        link.appendChild(url);

        row.appendChild(name);
        row.appendChild(address);
        row.appendChild(phone);
        row.appendChild(membership);
        row.appendChild(link);

        body.appendChild(row);
    });
    table.appendChild(body);

    cards.appendChild(table);
}

const grid = document.getElementById('gridBtn');
const list = document.getElementById('listBtn');

grid.addEventListener('click', () => {
    grid.classList.add('active');
    list.classList.remove('active');
    cards.replaceChildren();
    displayGridData(data.companies);
})

list.addEventListener('click', () => {
    list.classList.add('active');
    grid.classList.remove('active');
    cards.replaceChildren();
    displayListData(data.companies);
})

getCompanyData();
