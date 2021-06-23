module.exports = function(err, req, res, next) {
    let { statusCode, message } = err;
    statusCode = statusCode ? statusCode : 500;
    console.error(err);
    res.render('error', {
        errorStatusCode: statusCode,
        errorMsj: message,
        storeUrl: process.env.store_url
    })
}