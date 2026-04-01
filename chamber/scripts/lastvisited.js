const messageElement = document.querySelector('#welcome');

const now = Date.now();
const lastVisit = localStorage.getItem("lastVisit");

let message;

if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
} 

else {
    const difference = now - lastVisit;
    const days = difference / (1000 * 60 * 60 * 24);

    if (days < 1) {
        message = "Back so soon! Awesome!"
    }

    else {
        const roundedDays = Math.floor(days);

        if (roundedDays === 1) {
            message = "You last visited 1 day ago."
        }
        else {
            message = `You last visited ${roundedDays} days ago.`
        }
    }

}

messageElement.className = "show";

setTimeout(function(){messageElement.className = messageElement.className.replace("show", "");}, 3000);

messageElement.textContent = message;


localStorage.setItem("lastVisit", now);