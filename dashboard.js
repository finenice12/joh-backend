import { fundWallet, buyAirtime, buyData, logout } from './app.js';

document.getElementById("btnFund").addEventListener("click", fundWallet);
document.getElementById("btnAirtime").addEventListener("click", buyAirtime);
document.getElementById("btnData").addEventListener("click", buyData);
document.getElementById("btnLogout").addEventListener("click", logout);o

