module.exports = function(req, res) {
    try {
        console.log(`SUCCESS PAYMENT: ${JSON.stringify(req.query)}`)
        res.render('payment-success', { mpSecurityView: '' });
    } catch (err) {
        throw err;
    }
};