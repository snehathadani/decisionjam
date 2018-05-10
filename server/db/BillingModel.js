const mongoose = require ('mongoose');

const BillingSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
        unique: false,
    },
    subscriptionEndDate: {
        type: Number,
        required: true,
        unique: false,
    },
    
});
const BillingModel = mongoose.model('Billing', BillingSchema);
module.exports = BillingModel;