import { app } from "./firebase.js";

import {
getAuth,
signInWithEmailAndPassword,
createUserWithEmailAndPassword,
sendPasswordResetEmail,
signOut,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

const auth = getAuth(app);


/* LOGIN */
document.getElementById("btnLogin").onclick = () => {

const email=document.getElementById("loginEmail").value
const pass=document.getElementById("loginPass").value

signInWithEmailAndPassword(auth,email,pass)
.catch(e=>alert(e.message))

}


/* REGISTER */
document.getElementById("btnRegister").onclick = () => {

const email=document.getElementById("regEmail").value
const pass=document.getElementById("regPass").value

createUserWithEmailAndPassword(auth,email,pass)
.catch(e=>alert(e.message))

}


/* RESET */
document.getElementById("btnReset").onclick = () => {

const email=document.getElementById("resetEmail").value

sendPasswordResetEmail(auth,email)
.then(()=>alert("Reset email sent"))
.catch(e=>alert(e.message))

}


/* LOGOUT */
document.getElementById("btnLogout").onclick = () => {

signOut(auth)

}


/* AUTH STATE */
onAuthStateChanged(auth,user=>{

if(user){

document.getElementById("loginBox").style.display="none"
document.getElementById("registerBox").style.display="none"
document.getElementById("resetBox").style.display="none"
document.getElementById("dashBox").style.display="block"

document.getElementById("userEmail").innerText="Logged in as: "+user.email

}else{

document.getElementById("loginBox").style.display="block"
document.getElementById("dashBox").style.display="none"

}

})


/* PAGE SWITCH */
document.getElementById("showRegister").onclick=()=>{
loginBox.style.display="none"
registerBox.style.display="block"
}

document.getElementById("showReset").onclick=()=>{
loginBox.style.display="none"
resetBox.style.display="block"
}

document.getElementById("backLogin1").onclick=()=>{
registerBox.style.display="none"
loginBox.style.display="block"
}

document.getElementById("backLogin2").onclick=()=>{
resetBox.style.display="none"
loginBox.style.display="block"
}
// FUND WALLET
window.fundWallet = function () {
  alert("Fund wallet feature coming soon");
};

// BUY AIRTIME
window.buyAirtime = function () {
  const phone = document.querySelector("input[placeholder='Phone number']").value;
  const amount = document.querySelector("input[placeholder='Amount']").value;

  if (!phone || !amount) {
    alert("Enter phone number and amount");
    return;
  }

  alert("Buying airtime for " + phone + " amount ₦" + amount);
};

// BUY DATA
window.buyData = function () {
  const phone = document.querySelector("input[placeholder='Phone number']").value;
  const plan = document.querySelector("select").value;

  if (!phone) {
    alert("Enter phone number");
    return;
  }

  alert("Buying " + plan + " data for " + phone);
};
