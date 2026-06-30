async function resetPassword() {

    const email = document.getElementById("email").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    const message = document.getElementById("message");

    if (!email || !newPassword || !confirmPassword) {

        message.style.color = "red";
        message.innerHTML = "Please fill all fields.";
        return;

    }

    if (newPassword !== confirmPassword) {

        message.style.color = "red";
        message.innerHTML = "Passwords do not match.";
        return;

    }

    try {

        const response = await fetch("https://hostelsphere-backend.onrender.com/forgot-password", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password: newPassword
            })

        });

        const data = await response.json();

        message.style.color = data.success ? "#22c55e" : "red";
        message.innerHTML = data.message;

        if (data.success) {

            setTimeout(() => {

                window.location.href = "login.html";

            }, 1500);

        }

    } catch (error) {

        console.log(error);

        message.style.color = "red";
        message.innerHTML = "Server Error";

    }

}