const today = new Date();

document.getElementById("date").innerHTML =
today.toLocaleDateString();


let saved = 18;

document.getElementById("saved").innerHTML =
saved + " KG";




// Live Clock


function updateClock(){

const now = new Date();


let h = now.getHours();

let m = now.getMinutes();

let s = now.getSeconds();



h = String(h).padStart(2,'0');
m = String(m).padStart(2,'0');
s = String(s).padStart(2,'0');



document.getElementById("clock").innerHTML =

`${h}:${m}:${s}`;


}


setInterval(updateClock,1000);

updateClock();





// Meal Booking


async function bookMeal(type) {

    const user = JSON.parse(sessionStorage.getItem("currentUser"));

    if (!user) {
        alert("Please login first");
        return;
    }

    try {

        const response = await fetch("http://localhost:5000/book-meal", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                student: user.name,
                email: user.email,
                meal: type
            })

        });

        const data = await response.json();

        if (data.success) {

            alert(`${type} Booked Successfully 🎉`);

            saved++;

            document.getElementById("saved").innerHTML = saved + " KG";

            const history = document.getElementById("historyContainer");

            const p = document.createElement("p");

            p.innerHTML = `🍽️ ${type} booked on ${new Date().toLocaleString()}`;

            history.appendChild(p);

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.log(error);

        alert("Server Error");

    }

}





// Skip Meal


function skipMeal(){



alert(

"Meal Skipped Successfully 🚫"

);




saved++;




document.getElementById(

"saved"

).innerHTML =


saved+" KG";





const history = document.getElementById(

"historyContainer"

);




const p = document.createElement(

"p"

);




p.innerHTML =


`🚫 Meal skipped on ${new Date().toLocaleString()}`;





history.appendChild(

p

);


}

// Load Menu from Backend
async function loadMenu() {

    try {

        const response = await fetch("http://localhost:5000/menu");

        const menu = await response.json();

        // Breakfast
        const breakfastDiv = document.getElementById("breakfastItems");
        breakfastDiv.innerHTML = "";

        menu.breakfast.forEach(item => {
            breakfastDiv.innerHTML += `
                <label>
                    <input type="checkbox">
                    ${item.trim()}
                </label>
            `;
        });

        // Lunch
        const lunchDiv = document.getElementById("lunchItems");
        lunchDiv.innerHTML = "";

        menu.lunch.forEach(item => {
            lunchDiv.innerHTML += `
                <label>
                    <input type="checkbox">
                    ${item.trim()}
                </label>
            `;
        });

        // Dinner
        const dinnerDiv = document.getElementById("dinnerItems");
        dinnerDiv.innerHTML = "";

        menu.dinner.forEach(item => {
            dinnerDiv.innerHTML += `
                <label>
                    <input type="checkbox">
                    ${item.trim()}
                </label>
            `;
        });

    } catch (error) {

        console.log(error);

    }

}

// Load menu when page opens
loadMenu();