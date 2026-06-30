// ================= Load Complaint History =================

loadComplaints();

// ================= Submit Complaint =================

async function submitComplaint() {

    const user = JSON.parse(sessionStorage.getItem("currentUser"));

    if (!user) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    const title = document.getElementById("title").value.trim();
    const category = document.getElementById("category").value;
    const priority = document.getElementById("priority").value;
    const description = document.getElementById("description").value.trim();

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

            document.getElementById("title").value = "";
            document.getElementById("description").value = "";

            loadComplaints();

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.log(error);
        alert("Server Error");

    }

}

// ================= Load Complaints =================

async function loadComplaints() {

    const history = document.getElementById("history");

    const currentUser = JSON.parse(
        sessionStorage.getItem("currentUser")
    );

    try {

        const response = await fetch(
            "https://hostelsphere-backend.onrender.com/complaints"
        );

        let complaints = await response.json();

        complaints = complaints.filter(c =>
            currentUser &&
            c.student === currentUser.name
        );

        if (complaints.length === 0) {

            history.innerHTML = `
                <p>No complaints submitted.</p>
            `;

            return;

        }

        history.innerHTML = "";

        complaints.forEach(c => {

            let badgeColor = "#facc15";

            if (c.status === "Resolved") {
                badgeColor = "#22c55e";
            }

            if (c.status === "In Progress") {
                badgeColor = "#3b82f6";
            }

            history.innerHTML += `

            <div class="complaint">

                <h3>${c.title}</h3>

                <p>📂 <b>Category:</b> ${c.category}</p>

                <p>⚠️ <b>Priority:</b> ${c.priority}</p>

                <p>📝 <b>Description:</b> ${c.description}</p>

                <p>🕒 <b>Date:</b> ${c.date}</p>

                <p style="margin-top:10px;">
                    <span style="
                        background:${badgeColor};
                        color:white;
                        padding:6px 14px;
                        border-radius:20px;
                        font-weight:bold;
                    ">
                        ${c.status}
                    </span>
                </p>

            </div>

            `;

        });

    } catch (error) {

        console.log(error);

        history.innerHTML = `
            <p>Unable to load complaints.</p>
        `;

    }

}