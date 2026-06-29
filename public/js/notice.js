loadNotice();


async function addNotice() {

    const title = document.getElementById("title").value;
    const desc = document.getElementById("desc").value;

    if (title === "" || desc === "") {
        alert("Fill all fields");
        return;
    }

    try {

        const response = await fetch("http://localhost:5000/notices", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title,
                message: desc
            })

        });

        const data = await response.json();

        if (data.success) {

            alert("Notice Added 🎉");

            document.getElementById("title").value = "";
            document.getElementById("desc").value = "";

            loadNotice();

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.log(error);
        alert("Server Error");

    }

}





async function loadNotice() {

    const container = document.getElementById("noticeContainer");

    container.innerHTML = "";

    try {

        const response = await fetch("http://localhost:5000/notices");

        const notices = await response.json();

        if (notices.length === 0) {
            container.innerHTML = "<p>No notices available.</p>";
            return;
        }

        notices.forEach(n => {

            container.innerHTML += `
                <div class="notice">
                    <h3>${n.title}</h3>
                    <p>${n.message}</p>
                    <br>
                    <small>${n.date}</small>
                </div>
            `;

        });

    } catch (error) {

        console.log(error);

    }

}





function searchNotice(){


const text=
document.getElementById(

"search"

).value.toLowerCase();



const cards=
document.querySelectorAll(

".notice"

);



cards.forEach(card=>{


card.style.display=


card.innerText.toLowerCase()

.includes(text)

?

"block"

:

"none";



});


}