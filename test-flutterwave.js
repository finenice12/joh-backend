const axios = require("axios");

// Replace this with your Flutterwave sandbox secret key
const FLW_SECRET_KEY = "acb123e4-f567-4a8b0d-1e2f3a4b5c6d";

async function testFlutterwave() {
  try {
    const response = await axios.get(
      "https://developersandbox-api.flutterwave.com/customers?page=1&size=10",
      {
        headers: {
          Authorization: `Bearer ${FLW_SECRET_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Flutterwave API Working ✅");
    console.log(response.data);

  } catch (error) {
    console.log("Error connecting to Flutterwave ❌");
    console.log(error.response?.data || error.message);
  }
}

testFlutterwave();
