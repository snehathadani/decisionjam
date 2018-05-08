const mongoose = require ('mongoose');

const DecisionSchema =  new mongoose.Schema({
    decisionText: {
        type: String,
        required: true,
    },

    createdOn: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const DecisionModel = mongoose.model('Decision', DecisionSchema);
module.exports = DecisionModel;