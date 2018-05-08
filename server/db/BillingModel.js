const mongoose = require ('mongoose');

const BillingSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    purchaseType: {
        type: String,
        required: true,
        unique: true,
    },
    userid: {
        type: String,
        required: true,
        unique: true,
    }
  
    
});
const BillingModel = mongoose.model('Billing', BillingSchema);
module.exports = BillingModel;