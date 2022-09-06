
const users = localStorage.getItem("users")?(localStorage.getItem("users")).split(","): new Array();
const table = document.getElementById("table");
const loginPage = document.getElementById("loginPage");
const dashBoard = document.getElementById("dashBoard");
const editForm = document.getElementById("editForm");
var currentuser;
function Auth(){
    let email = document.getElementById("loginEmail").value;
    let pass = document.getElementById("loginPassword").value;
    if (users.includes(email)) { 
        currentuser = JSON.parse(localStorage.getItem(email));
        if (pass == currentuser.password) {
          dashBoard.style.display="block";
          loginPage.style.display="none";
					createTable(email);
			};
  };
};
function registerUser(){
     
  let email=document.getElementById("registermail").value;
    if (users.includes(email)){
    } else {
        let  password=document.getElementById("registerPassword").value;
        let  firstname=document.getElementById("firstName").value;
        let  lastname=document.getElementById("lastName").value;
        let  username=document.getElementById("userName").value;
        let  role=document.getElementById("role").value;
        let  gender=document.getElementById("gender").value;
        users.push(email);
        let newuser={username,email,firstname,lastname,role,gender,password};
        localStorage.setItem("users",users);
        localStorage.setItem(email,JSON.stringify(newuser));
    };
};
function logOut(){
	  dashBoard.style.display="none"
	  loginPage.style.display="block"
    table.innerHTML=""
 };      
function createTable(email){
	users.map(key=>{
    let user=JSON.parse(localStorage.getItem(key));
    let tr=creatRow(user);    
		if (key==email){
       createEditBtn(tr)
		}else if(currentuser.role=="admin") {
			 createDeleteBtn(tr,key)
		}else if(currentuser.role=="operations" && (user.role=="operations" || user.role=="sales")) {
			createDeleteBtn(tr,key)
		}else if(currentuser.role=="sales" && user.role=="sales") {
			createDeleteBtn(tr,key)
		};
  });	
};
function creatRow(data){
 const tr=document.createElement("tr");
 Object.values(data).map((value)=>{
 const td=createCell(value)
 tr.appendChild(td)});
 return tr;
};
function createCell(data){

    const td=document.createElement("td")
    td.innerText=data
    return td;
};
function deleteUser(key){
	localStorage.removeItem(key);
	const indexEmail=users.indexOf(key);
	users.splice(indexEmail,1);
	localStorage.setItem("users",users);
};
function submit(){

    currentuser.firstname=document.getElementById("edittedfirstname").value;
    currentuser.lastname=document.getElementById("edittedlastname").value;
    currentuser.username=document.getElementById("editteduserName").value;
    currentuser.role=document.getElementById("edittedrole").value;
    currentuser.gender=document.getElementById("edittedgender").value;
    localStorage.setItem(currentuser.email,JSON.stringify(currentuser));
    creatRow(currentuser)
	  editForm.style.display="none"
};
function createEditBtn(tr){

   let editButton=document.createElement("button")
   editButton.innerText="Edit";
   editButton.className="btn btn-success col-12"
   editButton.addEventListener("click", ()=>{
   editForm.style.display="block";
   tr.remove()});
   let td = document.createElement("td");
   td.appendChild(editButton)
   tr.appendChild(td)
   table.appendChild(tr)		
}
function createDeleteBtn(tr,key){
	let deleteButton=document.createElement("button")
	deleteButton.innerText="Delete";
	deleteButton.className="btn btn-danger col-12";
	deleteButton.addEventListener("click", ()=>{
    deleteUser(key);
    tr.remove();});
	let td = document.createElement("td");
	td.appendChild(deleteButton)
	tr.appendChild(td)
	table.appendChild(tr)
};