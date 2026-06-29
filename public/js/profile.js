
const user = JSON.parse(
    sessionStorage.getItem("currentUser")
);


if(user){

document.getElementById("name").innerHTML=user.name;

document.getElementById("email").innerHTML=user.email;

document.getElementById("department").innerHTML=user.department;

document.getElementById("year").innerHTML=user.year;

}


document.getElementById("meals").innerHTML = "0";
document.getElementById("complaints").innerHTML = "0";


function logout(){

sessionStorage.clear();

window.location.href="login.html";

}