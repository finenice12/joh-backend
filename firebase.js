// firebase.js (backend)
const admin = require("firebase-admin");

// Load your service account key
const serviceAccount = require("./serviceAccountKey.json");
apiKey: "AIzaSyBH99sxcNphY_EoK4xPVmMFEV_2pWRCBiM"
// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { admin, db };
