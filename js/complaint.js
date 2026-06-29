// Load complaints
loadComplaints();

// Submit Complaint
function submitComplaint(){

const currentUser =
JSON.parse(

sessionStorage.getItem(

"currentUser"

)

);

const title =
document.getElementById(

"title"

).value;

const category =
document.getElementById(

"category"

).value;

const priority =
document.getElementById(

"priority"

).value;

const description =
document.getElementById(

"description"

).value;

if(

title==="" ||

description===""

){

alert(

"Please fill all fields"

);

return;

}

const complaint={

student:

currentUser ?

currentUser.name :

"Student",

title,

category,

priority,

description,

status:"Pending",

date:

new Date()

.toLocaleString()

};

let complaints=

JSON.parse(

localStorage.getItem(

"complaints"

)

)||[];

complaints.push(

complaint

);

localStorage.setItem(

"complaints",

JSON.stringify(

complaints

)

);

alert(

"Complaint Submitted Successfully 🎉"

);

document.getElementById(

"title"

).value="";

document.getElementById(

"description"

).value="";

loadComplaints();

}

// Complaint History

function loadComplaints(){

const history=
document.getElementById(

"history"

);

const currentUser=

JSON.parse(

sessionStorage.getItem(

"currentUser"

)

);

let complaints=

JSON.parse(

localStorage.getItem(

"complaints"

)

)||[];

complaints = complaints.filter(

c=>

currentUser &&

c.student===currentUser.name

);

if(

complaints.length===0

){

history.innerHTML=`

<p>

No complaints submitted.

</p>

`;

return;

}

history.innerHTML="";

complaints.forEach(c=>{

history.innerHTML+=`

<div class="complaint">

<h3>

${c.title}

</h3>

<p>

📂 ${c.category}

</p>

<p>

⚠️ ${c.priority}

</p>

<p>

📝 ${c.description}

</p>

<p>

🕒 ${c.date}

</p>

<p>

👤 ${c.student}

</p>

<span class="badge">

${c.status}

</span>

</div>

`;

});

}
