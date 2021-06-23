var paymentService = require("../services/payment")


module.exports = async function(req, res) {
    try {
        console.log(`SUCCESS PAYMENT: ${JSON.stringify(req.query)}`)
        if (!req.query.collection_id) {
            throw new Error("Ocurrio en error recibiendo respuesta de Mercado Pago")
        }

        const payment = await paymentService.getPayment(req.query.collection_id);

        res.render('payment-success', {
            mpSecurityView: '',
            mpPaymentID: payment.id,
            mpExternalReference: payment.external_reference,
            mpPaymentMethod: payment.payment_method_id,
            storeUrl: process.env.store_url
        });
    } catch (err) {
        throw err;
    }
};