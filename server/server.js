const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const Paystack = require("paystack")(
  "sk_test_c56e3275b3ed7d76c31b6ab408df873cb1ba5dab"
); // Use your Paystack secret key

const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors({ origin: true, credentials: true }));

// Paystack endpoint for initializing payment
app.post("/create-payment", async (req, res) => {
  const { amount, email } = req.body;

  try {
    const response = await API.initializeTransaction({
      email: email,
      amount: amount * 100, // Convert Naira to kobo
      callback_url: "http://localhost:4200/", // Replace with your frontend URL
      reference: `ref-${Math.floor(Math.random() * 1000000000 + 1)}`, // Unique transaction reference
    });

    if (response.status) {
      res.status(200).json({ status: "success", data: response.data });
    } else {
      res
        .status(400)
        .json({ status: "error", message: "Payment initialization failed" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        status: "error",
        message: "An error occurred",
        error: error.message,
      });
  }
});

app.listen(4242, () => console.log("Server running on port 4242"));
