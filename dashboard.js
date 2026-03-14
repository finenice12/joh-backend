
firebase.auth().onAuthStateChanged(async user=>{
  if(!user){ location="login.html"; return; }

  document.getElementById("userEmail").innerText=user.email;
  const ref=db.collection("users").doc(user.uid);
  const doc=await ref.get();
  if(!doc.exists){ await ref.set({email:user.email,balance:0}); }
  updateBalance(ref);

  document.getElementById("btnAdd").addEventListener("click", addMoney);
  document.getElementById("btnAirtime").addEventListener("click", buyAirtime);
  document.getElementById("btnData").addEventListener("click", buyData);
  document.getElementById("btnSend").addEventListener("click", sendMoney);
  document.getElementById("btnReceive").addEventListener("click", receiveMoney);
  document.getElementById("btnLogout").addEventListener("click", logout);

  loadTransactions();
});

async function updateBalance(ref){
  const data=(await ref.get()).data();
  document.getElementById("balance").innerText="₦"+data.balance;
}

async function logTransaction(userId,type,amount,otherEmail=null){
  await db.collection("transactions").add({userId,type,amount,otherEmail,timestamp:firebase.firestore.FieldValue.serverTimestamp()});
  loadTransactions();
}

async function loadTransactions(){
  const user=firebase.auth().currentUser;
  const query=await db.collection("transactions").where("userId","==",user.uid).orderBy("timestamp","desc").get();
  const list=document.getElementById("transactionHistory");
  list.innerHTML="";
  query.forEach(doc=>{
    const t=doc.data();
    let text=`${t.type} ₦${t.amount}`;
    if(t.otherEmail) text+=` with ${t.otherEmail}`;
    const li=document.createElement("li");
    li.textContent=text;
    list.appendChild(li);
  });
}

async function addMoney(){
  let amount=parseInt(prompt("Enter amount")); if(!amount) return;
  let user=firebase.auth().currentUser;
  let ref=db.collection("users").doc(user.uid);
  let doc=await ref.get();
  await ref.update({balance:doc.data().balance+amount});
  updateBalance(ref);
  await logTransaction(user.uid,"Add Money",amount);
  alert("Money added");
}

async function buyAirtime(){
  let amount=parseInt(prompt("Enter airtime amount")); if(!amount) return;
  let user=firebase.auth().currentUser;
  let ref=db.collection("users").doc(user.uid);
  let doc=await ref.get();
  if(doc.data().balance<amount){ alert("Insufficient balance"); return; }
  await ref.update({balance:doc.data().balance-amount});
  updateBalance(ref);
  await logTransaction(user.uid,"Buy Airtime",amount);
  alert("Airtime purchased");
}

async function buyData(){
  let amount=parseInt(prompt("Enter data amount")); if(!amount) return;
  let user=firebase.auth().currentUser;
  let ref=db.collection("users").doc(user.uid);
  let doc=await ref.get();
  if(doc.data().balance<amount){ alert("Insufficient balance"); return; }
  await ref.update({balance:doc.data().balance-amount});
  updateBalance(ref);
  await logTransaction(user.uid,"Buy Data",amount);
  alert("Data purchased");
}

async function sendMoney(){
  let receiverEmail=prompt("Enter receiver email");
  let amount=parseInt(prompt("Amount to send"));
  if(!receiverEmail||!amount) return;
  let user=firebase.auth().currentUser;
  let senderRef=db.collection("users").doc(user.uid);
  let senderDoc=await senderRef.get();
  if(senderDoc.data().balance<amount){ alert("Insufficient balance"); return; }
  let query=await db.collection("users").where("email","==",receiverEmail).get();
  if(query.empty){ alert("User not found"); return; }
  let receiverDoc=query.docs[0];
  let receiverRef=db.collection("users").doc(receiverDoc.id);
  await senderRef.update({balance:senderDoc.data().balance-amount});
  await receiverRef.update({balance:receiverDoc.data().balance+amount});
  updateBalance(senderRef);
  await logTransaction(user.uid,"Send Money",amount,receiverEmail);
  await logTransaction(receiverDoc.id,"Receive Money",amount,user.email);
  alert("Money sent successfully");
}

function receiveMoney(){
  let user=firebase.auth().currentUser;
  alert("Your receive email: "+user.email);
}

function logout(){
  firebase.auth().signOut();
  location="login.html";
}
