import { getAuth, createUserWithEmailAndPassword }
from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

const auth = getAuth();

document.getElementById("btnRegister").onclick = () => {

const email = document.getElementById("regEmail").value;
const pass = document.getElementById("regPass").value;

if(!email || !pass){
alert("Enter email and password");
return;
}

createUserWithEmailAndPassword(auth,email,pass)

.then(() => {

alert("Account created successfully");

window.location.href="login.html";

})

.catch((error)=>{

alert(error.message);

});

};
