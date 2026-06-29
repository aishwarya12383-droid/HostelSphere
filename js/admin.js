const students =
JSON.parse(localStorage.getItem("students")) || [];

const complaints =
JSON.parse(localStorage.getItem("complaints")) || [];

const meals =
JSON.parse(localStorage.getItem("meals")) || [];

const notices =
JSON.parse(localStorage.getItem("notices")) || [];

document.getElementById("students").innerHTML =
students.length;

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

document.getElementById("breakfastCount").innerHTML =
breakfast;

document.getElementById("lunchCount").innerHTML =
lunch;

document.getElementById("dinnerCount").innerHTML =
dinner;

document.getElementById("saved").innerHTML =
(skipped * 0.25).toFixed(2) + " KG";

const date =
document.getElementById("currentDate");

if(date){

date.innerHTML =
new Date().toDateString();

}

const complaintList =
document.getElementById("complaintList");

complaintList.innerHTML = "";

if(complaints.length===0){

complaintList.innerHTML =
"<p>No complaints submitted.</p>";

}

else{

complaints.forEach((c,index)=>{

complaintList.innerHTML += `

<div class="complaintCard">

<h3>👤 ${c.student || "Student"}</h3>

<p><b>Title:</b> ${c.title || "-"}</p>

<p><b>Description:</b> ${c.description}</p>

<p><b>Priority:</b> ${c.priority || "Medium"}</p>

<p>

<b>Status:</b>

<select onchange="updateStatus(${index},this.value)">

<option value="Pending" ${c.status==="Pending"?"selected":""}>Pending</option>

<option value="In Progress" ${c.status==="In Progress"?"selected":""}>In Progress</option>

<option value="Resolved" ${c.status==="Resolved"?"selected":""}>Resolved</option>

</select>

</p>

</div>

`;

});

}

const noticeList =
document.getElementById("noticeList");

if(noticeList){

if(notices.length===0){

noticeList.innerHTML =
"<p>No notices available.</p>";

}

else{

noticeList.innerHTML = "";

notices.forEach(n=>{

noticeList.innerHTML += `

<p>📢 ${n.title}</p>

`;

});

}

}

function updateStatus(index,status){

complaints[index].status = status;

localStorage.setItem(

"complaints",

JSON.stringify(complaints)

);

}

function logout(){

sessionStorage.clear();

alert("Logged Out Successfully 👋");

window.location.href="login.html";

}
