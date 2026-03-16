import { getAuth, signOut, onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

const auth = getAuth();

/* Check login */

onAuthStateChanged(auth,(user)=>{

if(!user){

window.location.href="login.html";

}else{

document.getElementById("userEmail").innerText =
"Logged in as: "+user.email;
function fundWallet(){
alert("Fund wallet clicked");
}

function buyAirtime(){
alert("Buy airtime clicked");
}

function buyData(){
alert("Buy data clicked");
}

function logout(){
alert("Logout clicked");
}
}

});


/* Logout */

document.getElementById("btnLogout").onclick = () => {

signOut(auth)

.then(()=>{

alert("Logout successful");

window.location.href="login.html";

})

.catch((error)=>{

alert(error.message);

});

};
