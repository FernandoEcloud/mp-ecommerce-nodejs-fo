const checkEnvironmentVars = () => {
    try {
        if (!process.env.mp_integrator_id) {
            throw new Error("Missing MP Integrator ID");
        }
        if (!process.env.mp_public_key) {
            throw new Error("Missing MP Public Key");
        }
        if (!process.env.mp_access_token) {
            throw new Error("Missing MP Access Token");
        }
        if (!process.env.mp_back_url_success) {
            throw new Error("Missing MP Back URL Success");
        }
        if (!process.env.mp_back_url_pending) {
            throw new Error("Missing MP Back URL Pending");
        }
        if (!process.env.mp_back_url_failure) {
            throw new Error("Missing MP Back URL Failure");
        }
        if (!process.env.mp_webhook_url) {
            throw new Error("Missing MP WebHook URL");
        }
        if (!process.env.store_url) {
            throw new Error("Missing Store URL");
        }
        if (!process.env.registration_email) {
            throw new Error("Missing Registration Email");
        }
    } catch (err) {
        throw err;
    }
}

checkEnvironmentVars();