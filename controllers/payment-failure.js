module.exports = function(req, res) {
    try {
        console.log(`FAILURE PAYMENT: ${JSON.stringify(req.query)}`)
        res.render('payment-failure', { mpSecurityView: '', storeUrl: process.env.store_url });
    } catch (err) {
        throw err;
    }
};