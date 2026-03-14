import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

const loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (!email || !password) return alert("Enter email and password");
  signInWithEmailAndPassword(auth, email, password)
    .then(() => { window.location.href = "dashboard.html"; })
    .catch(err => alert(err.message));
});
