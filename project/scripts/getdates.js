document.getElementById("lastModified").innerHTML = document.lastModified;

const year = document.querySelector("#currentyear");
const today = new Date();

year.innerHTML = `${today.getFullYear()}`;

// document.querySelector('.form').addEventListener('submit', setTimestamp);
// document.querySelector('.form').addEventListener('submit', setFinalPrice);

// function setTimestamp() {
//   var now = new Date();
//   document.getElementById('submission_time').value = now.toDateString();
// }

// function setFinalPrice() {
//     var runningTotal = document.querySelector('#runningTotal').textContent;
//     document.getElementById('finalTotal').value = runningTotal;
// }