var paymentPayer = require("../catalogs/payment-payer.json");
var paymentService = require("../services/payment")
var paymentHelper = require("../helpers/payment")

module.exports = async function(req, res) {
    try {
        const { title, img, price, unit } = req.query;
        const item = paymentHelper.formatItemForPreference({ title, img, price, unit });
        const paymentMethods = paymentHelper.getPaymentMethods();
        const preference = await paymentService.createPreference(item, paymentPayer, paymentMethods);
        res.render('detail', {
            ...req.query,
            mpSecurityView: 'item',
            mpInitPoint: preference.init_point,
            mpPublicKey: process.env.mp_public_key
        })
    } catch (err) {
        throw err
    }
}