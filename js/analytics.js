const user =
JSON.parse(localStorage.getItem("user"));

const complaints =
JSON.parse(localStorage.getItem("complaints")) || [];

const meals =
JSON.parse(localStorage.getItem("meals")) || [];

document.getElementById("students").innerHTML =
user ? 1 : 0;

document.getElementById("complaints").innerHTML =
complaints.length;

document.getElementById("meals").innerHTML =
meals.length;

let breakfast = 0;
let lunch = 0;
let dinner = 0;
let skipped = 0;

meals.forEach(m=>{

if(m.meal==="Breakfast")
breakfast++;

if(m.meal==="Lunch")
lunch++;

if(m.meal==="Dinner")
dinner++;

if(m.status==="Skipped")
skipped++;

});

document.getElementById("breakfast").innerHTML =
breakfast;

document.getElementById("lunch").innerHTML =
lunch;

document.getElementById("dinner").innerHTML =
dinner;

document.getElementById("saved").innerHTML =
(skipped * 0.25).toFixed(2) + " KG";
