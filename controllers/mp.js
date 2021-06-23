var paymentService = require("../services/payment")

module.exports = async function(req, res) {
    try {
        console.log(`WEB HOOK: BODY ${JSON.stringify(req.body)} QUERY ${JSON.stringify(req.query)}`)
        let query = req.query;
        let body = req.body;
        if ((query.type && query['data.id']) || (query.topic && query.id)) {
            const id = query['data.id'] ? query['data.id'] : query.id;
            const type = query.type ? query.type : query.topic;
            switch (type) {
                case "payment":
                    const response = await paymentService.handleIpnPaymentRequest(id)
                    return res.sendStatus(response)
                    break;
                default:
                    console.error(`webhook: Undefined notification type ${type} BODY ${JSON.stringify(body)} QUERY ${JSON.stringify(query)}`);
                    throw new Error("Error recibiendo la respuesta de Mercado Pago");
            }
        } else {
            return res.sendStatus(200);
        }
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
}