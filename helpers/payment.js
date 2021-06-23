var paymentInfo = require("../catalogs/payment-info.json");
exports.formatItemForPreference = (itemData) => {
    const items = [];
    const item = {
        title: itemData.title,
        id: 1234,
        description: paymentInfo.paymentDescription,
        category_id: paymentInfo.paymentCategory,
        picture_url: getURLImage(itemData.img),
        quantity: Number(itemData.unit),
        unit_price: Number(itemData.price)
    };

    items.push(item);

    return items;
}

const getURLImage = (relativePath) => process.env.store_url + relativePath.replace(".", "");

exports.getPaymentMethods = () => paymentInfo.paymentMethods