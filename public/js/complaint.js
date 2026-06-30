// Load complaints
loadComplaints();

// Submit Complaint
async function submitComplaint() {

    const user = JSON.parse(sessionStorage.getItem("currentUser"));

    if (!user) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const priority = document.getElementById("priority").value;
    const description = document.getElementById("description").value;

    if (!title || !description) {
        alert("Please fill all required fields.");
        return;
    }

    try {

        const response = await fetch("https://hostelsphere-backend.onrender.com/complaints", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                student: user.name,
                title,
                category,
                priority,
                description
            })

        });

        const data = await response.json();

        if (data.success) {

            alert("Complaint Submitted Successfully ✅");

            const history = document.getElementById("history");

            history.innerHTML += `
                <div class="complaint-card">
                    <h3>${title}</h3>
                    <p><b>Category:</b> ${category}</p>
                    <p><b>Priority:</b> ${priority}</p>
                    <p><b>Status:</b> Pending</p>
                </div>
            `;

            document.getElementById("title").value = "";
            document.getElementById("description").value = "";

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);
        alert("Server Error");

    }

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
