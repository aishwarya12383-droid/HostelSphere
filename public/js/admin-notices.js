loadNotices();

async function publishNotice() {

    const title = document.getElementById("title").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!title || !message) {

        alert("Please fill all fields.");
        return;

    }

    try {

        const response = await fetch("https://hostelsphere-backend.onrender.com/notices", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title,
                message
            })

        });

        const data = await response.json();

        alert(data.message);

        document.getElementById("title").value = "";
        document.getElementById("message").value = "";

        loadNotices();

    } catch (error) {

        console.log(error);
        alert("Server Error");

    }

}

async function loadNotices() {

    const noticeList = document.getElementById("noticeList");

    try {

        const response = await fetch("https://hostelsphere-backend.onrender.com/notices");

        const notices = await response.json();

        if (notices.length === 0) {

            noticeList.innerHTML = "<p>No notices available.</p>";
            return;

        }

        noticeList.innerHTML = "";

        notices.reverse().forEach(n => {

            noticeList.innerHTML += `

            <div class="notice">

                <h3>${n.title}</h3>

                <p>${n.message}</p>

                <small>${n.date}</small>

            </div>

            `;

        });

    } catch (error) {

        console.log(error);

    }

}