loadStudents();

function loadStudents(){

const studentsContainer =
document.getElementById("students");

studentsContainer.innerHTML = "";

const user =
JSON.parse(localStorage.getItem("user"));

if(!user){

studentsContainer.innerHTML = `

<div class="card">
<h2>No Students Found</h2>
<p>No registered students available.</p>
</div>
`;

return;

}

studentsContainer.innerHTML = `

<div class="card">

<h2>👤 ${user.name}</h2>

<p><strong>📧 Email :</strong> ${user.email}</p>

<p><strong>🏫 Department :</strong> ${user.department}</p>

<p><strong>🎓 Year :</strong> ${user.year}</p>

<p><strong>📱 Phone :</strong> ${user.phone}</p>

</div>

`;

}

function searchStudent(){

const text =
document.getElementById("search")
.value
.toLowerCase();

const cards =
document.querySelectorAll(".card");

cards.forEach(card=>{

if(card.innerText.toLowerCase().includes(text)){

card.style.display="block";

}

else{

card.style.display="none";

}

});

}
