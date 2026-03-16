import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

const auth = getAuth();

// Show reset form when clicking "Forgot Password?"
const forgotLink = document.getElementById('forgotPassword');
const resetContainer = document.getElementById('resetContainer');
forgotLink.addEventListener('click', (e) => {
  e.preventDefault();
  resetContainer.style.display = 'block';
});

// Send password reset email
const btnReset = document.getElementById('btnReset');
const resetEmailInput = document.getElementById('resetEmail');
const resetMessage = document.getElementById('resetMessage');

btnReset.addEventListener('click', () => {
  const email = resetEmailInput.value;
  if (!email) {
    resetMessage.textContent = "Please enter your email.";
    return;
  }

  sendPasswordResetEmail(auth, email)
    .then(() => {
      resetMessage.textContent = "Password reset email sent! Check your inbox.";
    })
    .catch((error) => {
      resetMessage.textContent = `Error: ${error.message}`;
    });
});
