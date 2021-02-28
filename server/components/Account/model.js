const { Schema, model } = require('mongoose');

const accountSchema = new Schema({
  identifier: String,
  description: String,
  level: Number,
  type: String,
  keycontrol: String,
  accounttype: String,
  balance: String,
});

const accountModel = model('account', accountSchema);

module.exports = accountModel;
