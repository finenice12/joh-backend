// USER EMAIL (temporary)
document.getElementById("userEmail").innerText = "user@email.com";

// LOGOUT
window.logout = function(){
alert("Logout clicked");
};

// FUND WALLET
window.fundWallet = function(){

const amount = document.getElementById("amount").value;

if(!amount){
alert("Enter amount");
return;
}

FlutterwaveCheckout({

public_key: "FLWPUBK_TEST-xxxxxxxxx-X",

tx_ref: "tx_" + Date.now(),

amount: amount,

currency: "NGN",

callback: function(data){
alert("Payment successful");
},

customer:{
email:"test@email.com"
}

});

};

// BUY AIRTIME
window.buyAirtime = function(){

const phone = document.getElementById("airtimePhone").value;
const amount = document.getElementById("airtimeAmount").value;

if(!phone || !amount){
alert("Enter phone and amount");
return;
}

alert("Buying airtime for " + phone);

};

// BUY DATA
window.buyData = function(){

const phone = document.getElementById("dataPhone").value;
const plan = document.getElementById("dataPlan").value;

if(!phone){
alert("Enter phone");
return;
}

alert("Buying " + plan + " for " + phone);

};
