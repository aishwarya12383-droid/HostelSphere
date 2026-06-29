async function loadStudents() {

    try {

        const response = await fetch("http://localhost:5000/students");

        const students = await response.json();

        const container = document.getElementById("students");

        container.innerHTML = "";

        students.forEach(student => {

            container.innerHTML += `
                <div class="student-card">
                    <h3>${student.name}</h3>
                    <p><b>Email:</b> ${student.email}</p>
                    <p><b>Phone:</b> ${student.phone}</p>
                    <p><b>Department:</b> ${student.department}</p>
                    <p><b>Year:</b> ${student.year}</p>
                </div>
            `;

        });

    } catch (error) {

        console.log(error);

    }

}

loadStudents();

function searchStudent() {

    const input = document.getElementById("search").value.toLowerCase();

    const cards = document.querySelectorAll(".student-card");

    cards.forEach(card => {

        const text = card.innerText.toLowerCase();

        if (text.includes(input)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

}