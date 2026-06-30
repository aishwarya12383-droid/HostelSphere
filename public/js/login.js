const togglePassword =
document.getElementById("togglePassword");

const password =
document.getElementById("password");

togglePassword.addEventListener(

"click",

()=>{

if(password.type==="password"){

password.type="text";

togglePassword.classList.remove(

"fa-eye"

);

togglePassword.classList.add(

"fa-eye-slash"

);

}

else{

password.type="password";

togglePassword.classList.remove(

"fa-eye-slash"

);

togglePassword.classList.add(

"fa-eye"

);

}

}

);

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch("http://localhost:5000/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        if (data.success) {

            sessionStorage.setItem("loggedIn", "true");
            sessionStorage.setItem("currentUser", JSON.stringify(data.user));

            alert("Login Successful 🎉");

            window.location.href = "student.html";

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert("Server Error");

    }

});

function adminLogin() {

    const pass = prompt("Enter Admin Password");

    if (pass === "Hostel@123") {

        window.location.href = "admin.html";

    } else {

        alert("Incorrect Admin Password");

    }

}

function forgotPassword() {
    alert("Password reset is not available in this version.\n\nPlease contact the hostel administrator to reset your password.");
}