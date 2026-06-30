// Load Notices
loadNotice();

// ================= Load Notices =================

async function loadNotice() {

    const container = document.getElementById("noticeContainer");

    container.innerHTML = "";

    try {

        const response = await fetch(
            "https://hostelsphere-backend.onrender.com/notices"
        );

        const notices = await response.json();

        if (notices.length === 0) {

            container.innerHTML = "<p>No notices available.</p>";
            return;

        }

        notices.reverse().forEach(n => {

            container.innerHTML += `

            <div class="notice">

                <h3>📢 ${n.title}</h3>

                <p>${n.message}</p>

                <small>📅 ${n.date}</small>

            </div>

            `;

        });

    } catch (error) {

        console.log(error);

        container.innerHTML = "<p>Unable to load notices.</p>";

    }

}

// ================= Search =================

function searchNotice(){

const text=document.getElementById("search").value.toLowerCase();

const cards=document.querySelectorAll(".notice");

cards.forEach(card=>{

card.style.display=
card.innerText.toLowerCase().includes(text)
? "block"
: "none";

});

}