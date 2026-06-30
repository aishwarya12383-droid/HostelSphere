loadVisitors();

function submitVisitor(){

const visitor={
name:document.getElementById("visitorName").value,
relation:document.getElementById("relation").value,
date:document.getElementById("date").value,
time:document.getElementById("time").value,
purpose:document.getElementById("purpose").value,
status:"Pending"
};

if(
visitor.name===""||
visitor.relation===""||
visitor.date===""||
visitor.time===""||
visitor.purpose===""){
alert("Please fill all fields");
return;
}

let visitors=JSON.parse(localStorage.getItem("visitors"))||[];

visitors.push(visitor);

localStorage.setItem("visitors",JSON.stringify(visitors));

alert("Visitor Request Submitted Successfully");

document.getElementById("visitorName").value="";
document.getElementById("relation").value="";
document.getElementById("date").value="";
document.getElementById("time").value="";
document.getElementById("purpose").value="";

loadVisitors();

}

function loadVisitors(){

const container=document.getElementById("visitorList");

const visitors=JSON.parse(localStorage.getItem("visitors"))||[];

container.innerHTML="";

if(visitors.length===0){

container.innerHTML="<p>No Visitor Requests Yet.</p>";
return;

}

visitors.forEach(v=>{

container.innerHTML+=`

<div class="request">

<h3>👤 ${v.name}</h3>

<p><b>Relation:</b> ${v.relation}</p>

<p><b>Date:</b> ${v.date}</p>

<p><b>Time:</b> ${v.time}</p>

<p><b>Purpose:</b> ${v.purpose}</p>

<p><b>Status:</b> 🟡 ${v.status}</p>

</div>

`;

});

}