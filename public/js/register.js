const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const department = document.getElementById("department").value;
    const year = document.getElementById("year").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                department,
                year,
                password
            })
        });

const data = await response.json();

console.log("Response:", data);
console.log("Status:", response.status);
if (data.success) {

    alert("Registration Successful 🎉");

     console.log("About to redirect...");

window.location.replace("http://localhost:5000/login.html");

return;
}
 else {
            alert(data.message);
        }

    } catch (error) {
        console.error(error);
        alert("Server Error");
    }
});