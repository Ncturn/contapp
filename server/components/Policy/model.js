const { Schema, model } = require('mongoose');

const policySchema = new Schema({
  date: Date,
  identifier: String,
  movements: [{
    consecutive: Number,
    account: {
      type: Schema.ObjectId,
      ref: 'account',
    },
    concept: String,
    amount: String,
    type: {
      type: String,
    },
  }],
});

const policyModel = model('policy', policySchema);

module.exports = policyModel;
