const user =
JSON.parse(

localStorage.getItem(

"user"

)

);


const complaints =
JSON.parse(

localStorage.getItem(

"complaints"

)

)||[];



const meals =
JSON.parse(

localStorage.getItem(

"meals"

)

)||[];



document.getElementById(

"students"

).innerHTML=

user ? 1 : 0;



document.getElementById(

"complaints"

).innerHTML=

complaints.length;



document.getElementById(

"meals"

).innerHTML=

meals.length;