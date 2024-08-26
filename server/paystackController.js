const { PaystackError } = require("./errors")

class PaystackController {
    /**
     * Link to documentation:
     * https://paystack.com/docs/api/transaction/#initialize
     * 
     * url="https://api.paystack.co/transaction/initialize"
     * authorization="Authorization: Bearer YOUR_SECRET_KEY"
     * content_type="Content-Type: application/json"
     * data='{ 
     *   "email": "customer@email.com", 
     *   "amount": "20000"
     * }'
     * curl "$url" -H "$authorization" -H "$content_type" -d "$data" -X POST
     */
    static async startTransaction(email, amount) {
        const response = await fetch("https://api.paystack.co/transaction/initialize", {
            body: JSON.stringify({
                email: email,
                amount: amount,
            }),
            method:'POST',
            headers: {
                "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                "Content-Type": "application/json"
            }
        })

        if (!response.ok) {
            throw new PaystackError(await response.text())
        }

        return response.json()
    }

    /**
     * Link to documenation:
     * https://api.paystack.co/transaction/{id}
     * 
     * #!/bin/sh
     * url="https://api.paystack.co/transaction/{id}"
     * authorization="Authorization: Bearer YOUR_SECRET_KEY"
     *
     * curl "$url" -H "$authorization" -X GET
     */
    static async viewTransactions(id) {
        const res = await fetch(`https://api.paystack.co/transaction/${id}`, {
            headers: {
                "Authorization": `Bearer ${process.env.PAYSTACK_SECRET}`,
            }
        })

        if (!res.ok) {
            throw new PaystackError(await res.text())
        }

        return res.json()
    }
}

module.exports.PaystackController = PaystackController