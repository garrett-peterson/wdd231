const myInfo = new URLSearchParams(window.location.search);

const fname = myInfo.get('fname');
const lname = myInfo.get('lname');
const email = myInfo.get('email');
const phone = myInfo.get('phone');
const bname = myInfo.get('bname');
const date = myInfo.get('submission_time');

document.querySelector('#thanks').innerHTML = `
<h2 class="thanks">Thank You!</h2>

<div class="thankYou">
<p>${fname} ${lname}, you submitted a join request on ${date} for ${bname}</p>
<p>We will send a follow up email to ${email}</p>
<p>Or call you at ${phone}</p>
</div>
`;