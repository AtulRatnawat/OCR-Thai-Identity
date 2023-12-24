const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  identificationNumber: String,
  name: String,
  lastName: String,
  dob: Date,
  doi: Date,   //Date of issue
  doe: Date,   //Date of expiry
  isSuccess: { type: Boolean, default: true },
}, { collection: 'identities' });

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;
