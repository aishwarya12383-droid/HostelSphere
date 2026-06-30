loadVisitors();

// ================= Submit Visitor =================

async function submitVisitor() {

    const user = JSON.parse(sessionStorage.getItem("currentUser"));

    if (!user) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    const visitor = {
        student: user.name,
        name: document.getElementById("visitorName").value,
        relation: document.getElementById("relation").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        purpose: document.getElementById("purpose").value
    };

    if (
        visitor.name === "" ||
        visitor.relation === "" ||
        visitor.date === "" ||
        visitor.time === "" ||
        visitor.purpose === ""
    ) {
        alert("Please fill all fields");
        return;
    }

    try {

        const response = await fetch("https://hostelsphere-backend.onrender.com/visitors", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(visitor)

        });

        const data = await response.json();

        alert(data.message);

        document.getElementById("visitorName").value = "";
        document.getElementById("relation").value = "";
        document.getElementById("date").value = "";
        document.getElementById("time").value = "";
        document.getElementById("purpose").value = "";

        loadVisitors();

    } catch (error) {

        console.log(error);
        alert("Server Error");

    }

}

// ================= Load Visitors =================

async function loadVisitors() {

    const container = document.getElementById("visitorList");

    const user = JSON.parse(sessionStorage.getItem("currentUser"));

    try {

        const response = await fetch("https://hostelsphere-backend.onrender.com/visitors");

        let visitors = await response.json();

        visitors = visitors.filter(v => user && v.student === user.name);

        if (visitors.length === 0) {

            container.innerHTML = "<p>No Visitor Requests Yet.</p>";
            return;

        }

        container.innerHTML = "";

        visitors.forEach(v => {

            let icon = "🟡";

            if (v.status === "Approved") icon = "🟢";
            if (v.status === "Rejected") icon = "🔴";

            container.innerHTML += `

            <div class="request">

                <h3>👤 ${v.name}</h3>

                <p><b>Relation:</b> ${v.relation}</p>

                <p><b>Date:</b> ${v.date}</p>

                <p><b>Time:</b> ${v.time}</p>

                <p><b>Purpose:</b> ${v.purpose}</p>

                <p><b>Status:</b> ${icon} ${v.status}</p>

            </div>

            `;

        });

    } catch (error) {

        console.log(error);

        container.innerHTML = "<p>Unable to load visitors.</p>";

    }

}