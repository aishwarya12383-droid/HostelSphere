// Load complaints when page loads
loadComplaints();




// Submit Complaint

function submitComplaint(){


const title=
document.getElementById("title").value;


const category=
document.getElementById("category").value;


const priority=
document.getElementById("priority").value;


const description=
document.getElementById("description").value;



if(

title==="" ||

description===""

){

alert(

"Please fill all fields"

);

return;

}




const complaint={


title,


category,


priority,


description,


status:"Pending",


date:new Date().toLocaleString()


};



let complaints=JSON.parse(

localStorage.getItem(

"complaints"

)

)||[];




complaints.push(

complaint

);




localStorage.setItem(

"complaints",

JSON.stringify(

complaints

)

);




alert(

"Complaint Submitted Successfully 🎉"

);




document.getElementById(

"title"

).value="";



document.getElementById(

"description"

).value="";




loadComplaints();



}





// Load Complaint History


function loadComplaints(){



const history=
document.getElementById(

"history"

);



let complaints=JSON.parse(

localStorage.getItem(

"complaints"

)

)||[];





if(

complaints.length===0

){

history.innerHTML=`

<p>

No complaints submitted.

</p>

`;

return;

}




history.innerHTML="";





complaints.forEach(c=>{


history.innerHTML+=`


<div class="complaint">


<h3>

${c.title}

</h3>



<p>

📂 ${c.category}

</p>



<p>

⚠️ ${c.priority}

</p>



<p>

📝 ${c.description}

</p>



<p>

🕒 ${c.date}

</p>



<span class="badge pending">


${c.status}


</span>



</div>


`;



});



}