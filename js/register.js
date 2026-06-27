const form = document.getElementById("registerForm");

form.addEventListener("submit", (e) => {

e.preventDefault();

const name = document.getElementById("name").value.trim();

const email = document.getElementById("email").value.trim();

const phone = document.getElementById("phone").value.trim();

const department = document.getElementById("department").value;

const year = document.getElementById("year").value;

const password = document.getElementById("password").value;

const confirmPassword =
document.getElementById("confirmPassword").value;



if(password !== confirmPassword){

alert("Passwords do not match");

return;

}



const user = {


name,


email,


phone,


department,


year,


password


};



localStorage.setItem(

"user",

JSON.stringify(user)

);



alert(

"Registration Successful 🎉"

);



window.location.href="login.html";


});