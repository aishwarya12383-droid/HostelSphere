let students = [];
let complaints = [];
let meals = [];
let notices = [];

async function loadDashboard() {

    try {

        const response = await fetch("https://hostelsphere-backend.onrender.com/admin/dashboard");

        const data = await response.json();

        document.getElementById("students").innerHTML = data.students;

        document.getElementById("meals").innerHTML = data.meals;

        document.getElementById("complaints").innerHTML = data.complaints;

        document.getElementById("saved").innerHTML = data.foodSaved;

    } catch (error) {

        console.log(error);

    }

}

loadDashboard();

async function loadComplaints() {

    try {

        const response = await fetch("https://hostelsphere-backend.onrender.com/complaints");

        complaints = await response.json();

        const complaintList = document.getElementById("complaintList");

        complaintList.innerHTML = "";

        if (complaints.length === 0) {

            complaintList.innerHTML = "<p>No complaints submitted.</p>";
            return;

        }

        complaints.forEach((c, index) => {

            complaintList.innerHTML += `

            <div class="complaintCard">

                <h3>👤 ${c.student}</h3>

                <p><b>Title:</b> ${c.title}</p>

                <p><b>Description:</b> ${c.description}</p>

                <p><b>Priority:</b> ${c.priority}</p>

                <p><b>Status:</b>

                <select onchange="updateStatus(${index},this.value)">

                    <option value="Pending" ${c.status=="Pending"?"selected":""}>Pending</option>

                    <option value="In Progress" ${c.status=="In Progress"?"selected":""}>In Progress</option>

                    <option value="Resolved" ${c.status=="Resolved"?"selected":""}>Resolved</option>

                </select>

                </p>

            </div>

            `;

        });

    } catch (err) {

        console.log(err);

    }

}

loadComplaints();



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
async function updateStatus(index, status) {

    try {

        const response = await fetch(
            `https://hostelsphere-backend.onrender.com/complaints/${complaints[index].id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status })
            }
        );

        const data = await response.json();

        alert(data.message);

    } catch (error) {

        console.log(error);

        alert("Failed to update complaint status");

    }

}

function logout(){

sessionStorage.clear();

alert("Logged Out Successfully 👋");

window.location.href="login.html";

}
// Load Current Menu
async function loadMenu() {

    try {

        const response = await fetch("https://hostelsphere-backend.onrender.com/menu");

        const menu = await response.json();

        document.getElementById("breakfastMenu").value =
            menu.breakfast.join(", ");

        document.getElementById("lunchMenu").value =
            menu.lunch.join(", ");

        document.getElementById("dinnerMenu").value =
            menu.dinner.join(", ");

    } catch (error) {

        console.log(error);

    }

}

// Update Menu
async function updateMenu() {

    const breakfast = document.getElementById("breakfastMenu")
        .value
        .split(",");

    const lunch = document.getElementById("lunchMenu")
        .value
        .split(",");

    const dinner = document.getElementById("dinnerMenu")
        .value
        .split(",");

    try {

        const response = await fetch("https://hostelsphere-backend.onrender.com/menu", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                breakfast,

                lunch,

                dinner

            })

        });

        const data = await response.json();

        alert(data.message);

    } catch (error) {

        console.log(error);

    }

}

loadMenu();

// ================= Mobile Sidebar =================

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

if (menuBtn && sidebar) {

    menuBtn.addEventListener("click", () => {

        sidebar.classList.toggle("active");

    });

}