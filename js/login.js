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





const form = document.getElementById(

"loginForm"

);



form.addEventListener(

"submit",

(e)=>{


e.preventDefault();




const email = document.getElementById(

"email"

).value;



const pass = document.getElementById(

"password"

).value;





const user = JSON.parse(

localStorage.getItem(

"user"

)

);





if(!user){


alert(

"No registered account found"

);


return;


}





if(


email===user.email &&

pass===user.password


){



alert(

"Login Successful 🎉"

);




sessionStorage.setItem(

"loggedIn",

"true"

);





window.location.href=

"student.html";



}



else{


alert(

"Invalid Email or Password"

);


}



}

);

function adminLogin(){

const pass = prompt("Enter Admin Password");

if(pass === "Hostel@123"){

sessionStorage.setItem("admin","true");

window.location.href = "admin.html";

}

else{

alert("Incorrect Admin Password");

}

}