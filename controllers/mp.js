var paymentPayer = require("../catalogs/payment-payer.json");
var paymentService = require("../services/payment")
var paymentHelper = require("../helpers/payment")

module.exports = async function(req, res) {
    try {
        console.log(`WEB HOOK: BODY ${JSON.stringify(req.body)} QUERY ${JSON.stringify(req.query)}`)
    } catch (err) {
        throw err
    }
}