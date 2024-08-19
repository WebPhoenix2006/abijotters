/**
 * An error occurred between the server and the Paystack API
 */
class PaystackError extends Error {
    constructor(message) {
        super(message)
    }
}

/**
 * An error occurred between the client and the server
 */
class HandlerError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports.HandlerError = HandlerError
module.exports.PaystackError = PaystackError