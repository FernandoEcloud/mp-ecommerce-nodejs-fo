module.exports = function(req, res) {
    try {
        console.log(`PENDING PAYMENT: ${JSON.stringify(req.query)}`)
        res.render('payment-pending', { mpSecurityView: '' });
    } catch (err) {
        throw err;
    }
};