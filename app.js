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
document.getElementById("payBtn").onclick = () => {

const amount=document.getElementById("amount").value

if(!amount){
alert("Enter amount")
return
}

FlutterwaveCheckout({

public_key: "FLWPUBK_TEST-xxxxxxxxxxxxx",

tx_ref: "wallet-"+Date.now(),

amount: amount,

currency: "NGN",

payment_options: "card,banktransfer,ussd",

customer: {

email: document.getElementById("userEmail").innerText

},

callback: function(data){

alert("Payment Successful")

},

customizations: {

title: "Wallet Funding",

description: "Add money to wallet"

}

})

}
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

const auth = getAuth();

onAuthStateChanged(auth,(user)=>{

if(user){

document.getElementById("userEmail").innerText = user.email;

}

});
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { app } from "./firebase.js"; // your firebase.js

const auth = getAuth(app);
const db = getFirestore(app);

// Show logged-in user's email
const userEmailSpan = document.getElementById("userEmail");
const balanceDiv = document.getElementById("balance");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    userEmailSpan.textContent = user.email;

    // Example: Fetch wallet balance from Firestore
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      balanceDiv.textContent = `₦${data.wallet || 0}`;
    }
  } else {
    window.location.href = "login.html"; // redirect if not logged in
  }
});

// Logout function
window.logout = () => {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
};
