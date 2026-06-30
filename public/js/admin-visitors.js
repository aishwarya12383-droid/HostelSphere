loadVisitors();

async function loadVisitors() {

    const visitorList = document.getElementById("visitorList");

    try {

        const response = await fetch("https://hostelsphere-backend.onrender.com/visitors");

        const visitors = await response.json();

        if (visitors.length === 0) {

            visitorList.innerHTML = "<p>No visitor requests available.</p>";
            return;

        }

        visitorList.innerHTML = "";

        visitors.forEach(v => {

            visitorList.innerHTML += `

            <div class="visitor-card">

                <h3>👤 ${v.student}</h3>

                <p><b>Visitor:</b> ${v.name}</p>

                <p><b>Relation:</b> ${v.relation}</p>

                <p><b>Date:</b> ${v.date}</p>

                <p><b>Time:</b> ${v.time}</p>

                <p><b>Purpose:</b> ${v.purpose}</p>

                <p><b>Status:</b> ${v.status}</p>

                <div class="actions">

                    <button class="approve"
                    onclick="updateVisitorStatus(${v.id},'Approved')">

                    Approve

                    </button>

                    <button class="reject"
                    onclick="updateVisitorStatus(${v.id},'Rejected')">

                    Reject

                    </button>

                </div>

            </div>

            `;

        });

    } catch (error) {

        console.log(error);

    }

}

async function updateVisitorStatus(id, status) {

    try {

        const response = await fetch(
            `https://hostelsphere-backend.onrender.com/visitors/${id}`,
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

        loadVisitors();

    } catch (error) {

        console.log(error);

    }

}

function logout(){

sessionStorage.clear();

window.location.href="login.html";

}