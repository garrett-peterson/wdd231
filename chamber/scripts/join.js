document.querySelector('.form').addEventListener('submit', setTimestamp);

function setTimestamp() {
  var now = new Date();
  document.getElementById('submission_time').value = now.toDateString();
}

function displayGoldInfo() {
  goldModal.innerHTML = "";
  goldModal.innerHTML = `
    <h2>Gold Membership</h2>
    <p>Benefits</p>
    <ul>
      <li>Homepage Spotlight</li>
      <li>Event Parking</li>
      <li>Event Ticket Discounts</li>
      <li>Manager Training Sessions</li>
      <li>Flyer Advertisements</li>
    </ul>
    <p>Monthly Cost: $75</p>
    <button id="goldCloseModal">❌</button>
    `;
    goldModal.showModal();

    goldCloseModal.addEventListener("click", () => {
        goldModal.close();
    });
  
}

function displaySilverInfo() {
  silverModal.innerHTML = "";
  silverModal.innerHTML = `
    <h2>Silver Membership</h2>
    <p>Benefits</p>
    <ul>
      <li>Homepage Spotlight</li>
      <li>Event Parking</li>
      <li>Event Ticket Discounts</li>
      <li>Flyer Advertisements</li>
    </ul>
    <p>Monthly Cost: $50</p>
    <button id="silverCloseModal">❌</button>
    `;
    silverModal.showModal();

    silverCloseModal.addEventListener("click", () => {
        silverModal.close();
    });

}

function displayBronzeInfo() {
  bronzeModal.innerHTML = "";
  bronzeModal.innerHTML = `
    <h2>Bronze Membership</h2>
    <p>Benefits</p>
    <ul>
      <li>Event Ticket Discounts</li>
      <li>Manager Training Sessions</li>
    </ul>
    <p>Monthly Cost: $25</p>
    <button id="bronzeCloseModal">❌</button>
    `;
    bronzeModal.showModal();

    bronzeCloseModal.addEventListener("click", () => {
        bronzeModal.close();
    });

}

function displayNPInfo() {
  npModal.innerHTML = "";
  npModal.innerHTML = `
    <h2>NP Membership</h2>
    <p>Benefits</p>
    <ul>
      <li>Event Parking</li>
      <li>Event Ticket Discounts</li>
      <li>Manager Training Sessions</li>
    </ul>
    <p>Monthly Cost: Waived</p>
    <button class="modalBTN" id="npCloseModal">❌</button>
    `;
    npModal.showModal();

    npCloseModal.addEventListener("click", () => {
        npModal.close();
    });
}

document.querySelector('#gold').addEventListener('click', displayGoldInfo);
document.querySelector('#silver').addEventListener('click', displaySilverInfo);
document.querySelector('#bronze').addEventListener('click', displayBronzeInfo);
document.querySelector('#np').addEventListener('click', displayNPInfo);

const goldModal = document.querySelector('#gold-details');
const silverModal = document.querySelector('#silver-details');
const bronzeModal = document.querySelector('#bronze-details');
const npModal = document.querySelector('#np-details');