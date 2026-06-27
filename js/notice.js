loadNotice();



function addNotice(){


const title=
document.getElementById("title").value;


const desc=
document.getElementById("desc").value;



if(title===""||desc===""){

alert("Fill all fields");

return;

}




const notice={


title,


desc,


date:new Date().toLocaleString()


};



let notices=
JSON.parse(

localStorage.getItem(

"notices"

)

)||[];




notices.push(

notice

);




localStorage.setItem(

"notices",

JSON.stringify(

notices

)

);




alert(

"Notice Added 🎉"

);



document.getElementById("title").value="";

document.getElementById("desc").value="";



loadNotice();


}




function loadNotice(){


const container=
document.getElementById(

"noticeContainer"

);



let notices=
JSON.parse(

localStorage.getItem(

"notices"

)

)||[];




container.innerHTML="";




notices.forEach(n=>{


container.innerHTML+=`


<div class="notice">


<h3>

${n.title}

</h3>



<p>

${n.desc}

</p>



<br>



<small>

${n.date}

</small>



</div>


`;



});


}





function searchNotice(){


const text=
document.getElementById(

"search"

).value.toLowerCase();



const cards=
document.querySelectorAll(

".notice"

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