// Session Check

const isLoggedIn =
sessionStorage.getItem("loggedIn");


if(!isLoggedIn){

window.location.href="login.html";

}



// Welcome User

const user = JSON.parse(
    sessionStorage.getItem("currentUser")
);



if(user){

const heading =

document.querySelector(

".welcome h1"

);

heading.innerHTML = `Welcome, ${user.name} 👋`;



}




// Logout


function logout(){

sessionStorage.clear();


alert(

"Logged Out Successfully 👋"

);


window.location.href=

"login.html";


}



// Food Saved Counter


let saved = 18;


const cards =

document.querySelectorAll(

".card h1"

);



setInterval(()=>{


saved++;



cards[0].innerHTML=

saved+" KG";


},10000);