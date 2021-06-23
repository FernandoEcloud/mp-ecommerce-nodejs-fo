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
            notification: process.env.mp_webhook_url,
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
            return Promise.reject(new Error("Mercado Pago Bad Status Response"));
        }

    } catch (err) {
        return Promise.reject(err);
    };
};