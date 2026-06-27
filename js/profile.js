const user=JSON.parse(

localStorage.getItem(

"user"

)

);



if(user){

document.getElementById("name").innerHTML=user.name;

document.getElementById("email").innerHTML=user.email;

document.getElementById("department").innerHTML=user.department;

document.getElementById("year").innerHTML=user.year;

}



const meals=
JSON.parse(

localStorage.getItem(

"meals"

)

)||[];



document.getElementById("meals").innerHTML=
meals.length;



const complaints=
JSON.parse(

localStorage.getItem(

"complaints"

)

)||[];



document.getElementById("complaints").innerHTML=
complaints.length;



function logout(){

sessionStorage.clear();

window.location.href="login.html";

}