import { auth } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// CHECK USER LOGIN
onAuthStateChanged(auth, (user) => {

  if (!user) {
    window.location.href = "login.html";
  } else {
    document.getElementById("userEmail").innerText = user.email;
  }

});

// LOGOUT
window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
};

// FUND WALLET
window.fundWallet = function () {

  const amount = document.getElementById("amount").value;

  if (!amount) {
    alert("Enter amount");
    return;
  }

  FlutterwaveCheckout({
    public_key: "YOUR_FLUTTERWAVE_KEY",
    tx_ref: "tx_" + Date.now(),
    amount: amount,
    currency: "NGN",

    callback: function (data) {
      alert("Payment successful");
    },

    customer: {
      email: auth.currentUser.email
    }

  });

};

// BUY AIRTIME
window.buyAirtime = function () {
  alert("Airtime feature coming next");
};

// BUY DATA
window.buyData = function () {
  alert("Data feature coming next");
};
