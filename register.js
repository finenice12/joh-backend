import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const registerBtn = document.getElementById("registerBtn");
registerBtn.addEventListener("click", async () => {
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  if (!email || !password) return alert("Enter email and password");
  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCred.user);
    await setDoc(doc(db, "users", email), { balance: 0 });
    alert("Registered! Please verify email before login.");
    window.location.href = "login.html";
  } catch (err) { alert(err.message); }
});
