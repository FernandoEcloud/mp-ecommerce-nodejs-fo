var paymentService = require("../services/payment")

module.exports = async function(req, res) {
    try {
        console.log(`WEB HOOK: BODY ${JSON.stringify(req.body)} QUERY ${JSON.stringify(req.query)}`)
        let query = req.query;
        let body = req.body;
        if (query.topic && query.id) {
            const id = query.id;
            const topic = query.topic;
            switch (topic) {
                case "payment":
                    //const response = await paymentService.handleIpnPaymentRequest(id)
                    return res.sendStatus(200)
                    break;
                default:
                    console.error(`webhook: Undefined notification topic ${topic} BODY ${JSON.stringify(body)} QUERY ${JSON.stringify(query)}`);
                    return res.sendStatus(200);
                    break;
            }
        } else {
            return res.sendStatus(200);
        }
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
}