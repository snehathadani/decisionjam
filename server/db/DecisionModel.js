const mongoose = require ('mongoose');

const DecisionSchema =  new mongoose.Schema({
    decisionText: {
        type: String,
        required: true,
    },

    answers: [{    
        answerText: {
        type: String,
        required: true,
        },
        //Votes contain list of user ids
        upVotes: [String],
        downVotes: [String]}
    ],

    createdOn: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const DecisionModel = mongoose.model('Decision', DecisionSchema);
module.exports = DecisionModel;