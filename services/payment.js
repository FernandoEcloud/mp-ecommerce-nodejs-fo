var mercadopago = require('mercadopago');


mercadopago.configure({
    integrator_id: process.env.mp_integrator_id,
    access_token: process.env.mp_access_token
})

exports.createPreference = (items, payer, paymentMethods) => {
    try {
        const preferenceData = {
            items,
            payer,
            payment_methods: paymentMethods,
            back_urls: {
                success: process.env.mp_back_url_success,
                pending: process.env.mp_back_url_pending,
                failure: process.env.mp_back_url_failure,
            },
            notification_url: `${process.env.mp_webhook_url}?source_news=webhooks`,
            auto_return: 'approved',
            external_reference: process.env.registration_email,
        }
        return Promise.resolve(doPreference(preferenceData));
    } catch (err) {
        return Promise.reject(err);
    }
}


const doPreference = async(preferenceData) => {

    try {

        const response = await mercadopago.preferences.create(preferenceData);
        if (response.status === 200 || response.status === 201) {
            return Promise.resolve(response.response);
        } else {
            return Promise.reject(new Error("Error con la respuesta de Mercado Pago"));
        }

    } catch (err) {
        return Promise.reject(err);
    };
};

exports.getPayment = async(paymentID) => {

    try {

        const response = await mercadopago.payment.get(paymentID);

        if (response.status === 200 || response.status === 201) {
            return Promise.resolve(response.response);
        } else {
            return Promise.reject(new Error("No se encontro el pago o ya fue recibido"));
        }

    } catch (err) {
        return Promise.reject(err);
    };
};

exports.handleIpnPaymentRequest = async(paymentID) => {

    try {
        const payment = await this.getPayment(paymentID)

        let status = payment.status

        switch (status) {
            case 'pending':
                break;
            case 'in_process':
                break;
            case 'approved':
                console.log('WEBHOOK -----> approved');
            case 'authorized':
                break;
            case 'in_mediation':
            case 'rejected':
            case 'cancelled':
            case 'refunded':
            case 'charged_back':
                console.log('WEBHOOK -----> unapproved');
                break;
            default:
                throw new Error("El estado del pago no se encontro.");
        }
        return Promise.resolve(200);
    } catch (err) {
        return Promise.reject(err);
    }

}