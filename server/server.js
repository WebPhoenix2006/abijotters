const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const { PaystackController } = require("./paystackController");
const { HandlerError, PaystackError } = require("./errors");
const { isAboveZero } = require("./validateInput")
// Load the environment variables from an .env file
const dotenv = require("dotenv")
dotenv.config()

const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors({ origin: true, credentials: true }));

// Paystack endpoint for initializing payment
app.post("/create-payment", async (req, res) => {
    if (req.body.amount == null) throw new HandlerError("Missing `amount` field")
    if (!isAboveZero(req.body.amount)) throw new HandlerError("`amount` must be a number greater than 0")
    
    if (!req.body.email) throw new HandlerError("Missing `email` field!")

    const { amount, email } = req.body;
    
    // Don't try-catch here unless you need to do something very specific to this
    // handler. See the `errorHandler` function that is being used as error handler.
    // As long as you throw the right exception in here or inside the PaystackController,
    // you can, with minimal code, return the correct kind of error to the user.
    const response = await PaystackController.startTransaction(email, amount)

    // Exmample response, from the documentation:
    // https://paystack.com/docs/api/transaction/#initialize
    // {
    //     "status": true,
    //     "message": "Authorization URL created",
    //     "data": {
    //       "authorization_url": "https://checkout.paystack.com/0peioxfhpn",
    //       "access_code": "0peioxfhpn",
    //       "reference": "7PVGX8MEk85tgeEpVDtD"
    //     }
    //   }

    res.json(response)
});

app.post("/create-payment/:id", async (req, res) => {
    // Don't try-catch here unless you need to do something very specific to this
    // handler. See the `errorHandler` function that is being used as error handler.
    // As long as you throw the right exception, you can, with minimal code,
    // return the correct kind of error to the user.
    const response = await PaystackController.viewTransactions(req.params.id)

    // Exmample response, from the documentation:
    // https://paystack.com/docs/api/transaction/#initialize
    // {
    //     "status": true,
    //     "message": "Authorization URL created",
    //     "data": {
    //       "authorization_url": "https://checkout.paystack.com/0peioxfhpn",
    //       "access_code": "0peioxfhpn",
    //       "reference": "7PVGX8MEk85tgeEpVDtD"
    //     }
    //   }

    res.json(response)
});
app.use(errorHandler)

app.listen(4242, () => console.log("Server running on port 4242"));

function errorHandler(err, req, res, next) {
    if (err instanceof HandlerError) {
        res.status(422).send({
            message: err.message
        })
        return;
    }

    if (err instanceof PaystackError) {
        res.status(500).send({
            message: err.message
        })
    }
    res.status(500).send({
        message: err.message
    })
    next(err)
}