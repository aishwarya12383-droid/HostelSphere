const students=
JSON.parse(
localStorage.getItem("students")
)||[];


const complaints=
JSON.parse(
localStorage.getItem("complaints")
)||[];


const meals=
JSON.parse(
localStorage.getItem("meals")
)||[];



document.getElementById("students").innerHTML=
students.length;


document.getElementById("complaints").innerHTML=
complaints.length;


document.getElementById("meals").innerHTML=
meals.length;



const activities=
document.getElementById("activities");



activities.innerHTML="";



complaints.forEach(c=>{

activities.innerHTML+=`

<p>

📩 ${c.title}

</p>

`;

});


meals.forEach(m=>{

activities.innerHTML+=`

<p>

🍽 ${m.type}

Booked

</p>

`;

});




function logout(){

sessionStorage.clear();

alert(
"Logged Out Successfully 👋"
);

window.location.href=
"login.html";

}