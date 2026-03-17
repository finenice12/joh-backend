import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBH99sxcNphY_EoK4xPVmMFEV_2pWRCBiM",
  authDomain: "glory90-85e7c.firebaseapp.com",
  projectId: "glory90-85e7c",
  storageBucket: "glory90-85e7c.firebasestorage.app",
  messagingSenderId: "986038538950",
  appId: "1:986038538950:web:19914a0889519f05ea7dc7",
  measurementId: "G-TVZXQN6YWW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const balanceEl = document.getElementById("balance");
const userEmailEl = document.getElementById("userEmail");
const txListEl = document.getElementById("txList");
const amountInput = document.getElementById("amount");

let currentUser = null;

// ----------------- AUTH -----------------
onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user;
    userEmailEl.textContent = `Welcome, ${user.email}`;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      balanceEl.textContent = `₦${data.balance || 0}`;
      renderTransactions(data.transactions || []);
    } else {
      await setDoc(userRef, { balance: 0, transactions: [] });
      renderTransactions([]);
    }
  } else {
    window.location.href = "login.html";
  }
});

// ----------------- FUND WALLET -----------------
async function fundWallet() {
  const amount = parseFloat(amountInput.value);
  if (!amount || amount <= 0) {
    alert("Enter a valid amount");
    return;
  }

  const userRef = doc(db, "users", currentUser.uid);
  const userSnap = await getDoc(userRef);
  const data = userSnap.data();
  const newBalance = (data.balance || 0) + amount;

  await updateDoc(userRef, {
    balance: newBalance,
    transactions: arrayUnion(`Funded wallet: ₦${amount.toFixed(2)}`)
  });

  balanceEl.textContent = `₦${newBalance.toFixed(2)}`;
  renderTransactions((data.transactions || []).concat([`Funded wallet: ₦${amount.toFixed(2)}`]));
  amountInput.value = "";
  alert("Wallet funded!");
}

// ----------------- BUY AIRTIME -----------------
async function buyAirtime() {
  const amount = parseFloat(prompt("Enter Airtime amount"));
  if (!amount || amount <= 0) return alert("Invalid amount");

  const userRef = doc(db, "users", currentUser.uid);
  const userSnap = await getDoc(userRef);
  const data = userSnap.data();

  if ((data.balance || 0) < amount) return alert("Insufficient balance");

  const newBalance = data.balance - amount;

  await updateDoc(userRef, {
    balance: newBalance,
    transactions: arrayUnion(`Bought Airtime: ₦${amount.toFixed(2)}`)
  });

  balanceEl.textContent = `₦${newBalance.toFixed(2)}`;
  renderTransactions((data.transactions || []).concat([`Bought Airtime: ₦${amount.toFixed(2)}`]));
  alert("Airtime purchased!");
}

// ----------------- BUY DATA -----------------
async function buyData() {
  const plan = prompt("Enter Data plan amount");
  const amount = parseFloat(plan);
  if (!amount || amount <= 0) return alert("Invalid amount");

  const userRef = doc(db, "users", currentUser.uid);
  const userSnap = await getDoc(userRef);
  const data = userSnap.data();

  if ((data.balance || 0) < amount) return alert("Insufficient balance");

  const newBalance = data.balance - amount;

  await updateDoc(userRef, {
    balance: newBalance,
    transactions: arrayUnion(`Bought Data: ₦${amount.toFixed(2)}`)
  });

  balanceEl.textContent = `₦${newBalance.toFixed(2)}`;
  renderTransactions((data.transactions || []).concat([`Bought Data: ₦${amount.toFixed(2)}`]));
  alert("Data purchased!");
}

// ----------------- LOGOUT -----------------
function logout() {
  if (confirm("Logout now?")) {
    signOut(auth).then(() => window.location.href = "login.html");
  }
}

// ----------------- RENDER TRANSACTIONS -----------------
function renderTransactions(transactions) {
  txListEl.innerHTML = "";
  if (!transactions.length) {
    txListEl.innerHTML = "<li>No transactions yet</li>";
    return;
  }
  transactions.forEach(tx => {
    const li = document.createElement("li");
    li.textContent = tx;
    txListEl.appendChild(li);
  });
}
x
