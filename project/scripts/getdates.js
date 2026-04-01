document.getElementById("lastModified").innerHTML = document.lastModified;

const year = document.querySelector("#currentyear");
const today = new Date();

year.innerHTML = `${today.getFullYear()}`;