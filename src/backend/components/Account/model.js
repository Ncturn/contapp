const { Schema, model } = require('mongoose');

const accountSchema = new Schema({
  identifier: Number,
  description: String,
  level: Number,
  type: Number,
  keycontrol: Number,
  balance: String,
});

const accountModel = model('account', accountSchema);

module.exports = accountModel;
