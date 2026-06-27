loadStudents();



function loadStudents(){


const students=
document.getElementById(

"students"

);



const user=
JSON.parse(

localStorage.getItem(

"user"

)

);



if(user){


students.innerHTML=`

<div class="card">


<h3>

${user.name}

</h3>



<p>

${user.email}

</p>



<p>

${user.department}

</p>



<p>

${user.year}

</p>


</div>


`;

}


}




function searchStudent(){


const text=
document.getElementById(

"search"

).value.toLowerCase();



const cards=
document.querySelectorAll(

".card"

);



cards.forEach(card=>{


card.style.display=


card.innerText.toLowerCase()

.includes(text)

?

"block"

:

"none";



});


}