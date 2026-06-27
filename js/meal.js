const today = new Date();

document.getElementById("date").innerHTML =
today.toLocaleDateString();


let saved = 18;

document.getElementById("saved").innerHTML =
saved + " KG";




// Live Clock


function updateClock(){

const now = new Date();


let h = now.getHours();

let m = now.getMinutes();

let s = now.getSeconds();



h = String(h).padStart(2,'0');
m = String(m).padStart(2,'0');
s = String(s).padStart(2,'0');



document.getElementById("clock").innerHTML =

`${h}:${m}:${s}`;


}


setInterval(updateClock,1000);

updateClock();





// Meal Booking


function bookMeal(type){


alert(

`${type} Booked Successfully 🎉`

);




saved++;



document.getElementById(

"saved"

).innerHTML =


saved+" KG";




const history = document.getElementById(

"historyContainer"

);




const p = document.createElement(

"p"

);




p.innerHTML =

`🍽️ ${type} booked on ${new Date().toLocaleString()}`;





history.appendChild(

p

);


}





// Skip Meal


function skipMeal(){



alert(

"Meal Skipped Successfully 🚫"

);




saved++;




document.getElementById(

"saved"

).innerHTML =


saved+" KG";





const history = document.getElementById(

"historyContainer"

);




const p = document.createElement(

"p"

);




p.innerHTML =


`🚫 Meal skipped on ${new Date().toLocaleString()}`;





history.appendChild(

p

);


}