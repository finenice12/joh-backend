import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { firebaseConfig } from "./firebase.js";
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const messageDiv=document.getElementById("message");
document.getElementById("resetBtn").addEventListener("click", async(e)=>{
  e.preventDefault();
  const email=document.getElementById("email").value;
  try{
    await sendPasswordResetEmail(auth,email);
    messageDiv.textContent="Password reset email sent! Check your inbox.";
    messageDiv.style.color="green";
  } catch(error){
    messageDiv.textContent=error.message;
    messageDiv.style.color="red";
  }
});
