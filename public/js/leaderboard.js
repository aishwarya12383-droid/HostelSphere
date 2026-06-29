const users=[


{

name:"Aishwarya",

points:150

},

{

name:"Anuja",

points:120

},

{

name:"Anusri",

points:100

}

];



const leaders=
document.getElementById(

"leaders"

);



users.forEach(u=>{


leaders.innerHTML+=`


<div class="card">


<h2>

${u.name}

</h2>



<p>

⭐ ${u.points} Points

</p>



</div>


`;



});