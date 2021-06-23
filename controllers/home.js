module.exports = function(req, res) {
    try {
        res.render('home', { mpSecurityView: 'home' });
    } catch (err) {
        throw err;
    }
};