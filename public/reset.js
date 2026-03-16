// reset.js
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

const auth = getAuth();

document.getElementById("btnReset").addEventListener("click", () => {
  const email = document.getElementById("resetEmail").value;

  if (!email) return alert("Please enter your email");

  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Password reset email sent!");
      window.location.href = "login.html";
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});
