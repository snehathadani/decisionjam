const mongoose = require("mongoose");

const DecisionSchema = new mongoose.Schema({
  decisionText: {
    type: String,
    required: true
  },

  decisionCode: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  decisionCreatorId: String,

  voteOver: {
    type: Boolean,
    default: false
  },

  answers: [
    {
      answerText: {
        type: String,
        required: true
      },
      //Votes contain list of user ids
      upVotes: [String],
      downVotes: [String]
    }
  ],

  maxVotesPerUser: {
    type: Number,
    default: 1
  },

  createdOn: {
    type: Date,
    required: true,
    default: Date.now
  },

  currentLoggedInUserId: {
    type: String,
    default: ""
  }
});

const DecisionModel = mongoose.model("Decision", DecisionSchema);
module.exports = DecisionModel;
