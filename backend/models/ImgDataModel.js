// ImgDataModel.js

const mongoose = require('mongoose');

const imgDataSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  imageData: { type: Buffer, required: true },
},{ collection: 'image-data' });

const ImgData = mongoose.model('ImgData', imgDataSchema);

module.exports = ImgData;