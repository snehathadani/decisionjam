const mongoose = require ('mongoose');

const BillingSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
        unique: true,
    },
    subscriptionEndDate: {
        type: Number,
        required: true,
        unique: true,
    },
    
});
const BillingModel = mongoose.model('Billing', BillingSchema);
module.exports = BillingModel;