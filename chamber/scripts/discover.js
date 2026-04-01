import { places } from "../data/discover.mjs";

const page = document.querySelector('#places');

function displayCards() {
    places.forEach(place => {
        const div = document.createElement('div');
        const h2 = document.createElement('h2');
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        const address = document.createElement('address');
        const desc = document.createElement('p');
        const button = document.createElement('button');

        h2.textContent = `${place.name}`;
        address.textContent = `${place.address}`;
        desc.textContent = `${place.description}`;
        button.textContent = `Learn more...`;
        
        img.src = place.image;
        img.alt = place.name;
        img.height = 200;
        img.width = 300;

        button.classList.add('btn');
        div.classList.add('discover');

        figure.appendChild(img);

        div.appendChild(h2);
        div.appendChild(figure);
        div.appendChild(desc);
        div.appendChild(address);
        div.appendChild(button);

        page.appendChild(div);
    });
}

displayCards();

