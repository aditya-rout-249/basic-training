window.onload = () => {
	const form1 = document.querySelector("#addForm");
	form1.addEventListener("submit", addItem);
};
var serious=Array.from(JSON.parse(localStorage.getItem("Tasks").split("},{")))||new Array();
//console.log(JSON.parse(localStorage.getItem("Tasks").split("},{")))


serious=serious.sort(function(a, b){return b.time-a.time;});
serious.map(pair=>loadList((pair)))

function addItem(e) {
	e.preventDefault();
	var newItem = document.getElementById("item").value;
	var date= document.getElementById("time").value;
	var pair=JSON.stringify({"task":newItem,"time":date})
	serious.push(pair);
	localStorage.setItem("Tasks",serious);
	loadList(pair);
	
}
function loadList(pair){
	
	let list = document.getElementById("items");
	let li = document.createElement("li");
	let delbtn= document.createElement("button");
	let editbtn= document.createElement("button");
	editbtn.appendChild(document.createTextNode("Edit"));
	editbtn.className="editbn";
	editbtn.addEventListener("click",()=>{edittask(pair)});
	delbtn.appendChild(document.createTextNode("Delete"));
	delbtn.addEventListener("click",()=>{delTask(pair)});
	delbtn.className="delbtn";
	li.appendChild(document.createTextNode((pair)));
	li.appendChild(delbtn)
	li.appendChild(editbtn)
	list.appendChild(li)
};
const  delTask=(str)=>{
	
	const i=serious.indexOf(str);
	serious.splice(i,1);
	localStorage.setItem("Tasks",serious);
	location.reload()
};
const edittask=(str)=>{
	let j=serious.indexOf(str);
	let editm=prompt("enter your new task in format task@time");
	edi=editm.split("@")
	serious[j]=JSON.stringify({"task":edi[0],"time":edi[1]})
	localStorage.setItem("Tasks",serious);
	
	
};
