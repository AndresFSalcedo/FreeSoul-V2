// ESQUEMA PARA EL MODELO CONECTOR A MONGODB

const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let pictureSchema = new Schema({
   productType: {
      type: String,
      required: [true, 'The product type is required'],
   },

   design: {
      type: String,
      required: [true, 'The design is required'],
   },

   image: {
      type: String,
      required: [true, 'The image is required'],
   },

   productCode: {
      type: String,
      required: false,
   },
});

// Exportar el modelo

module.exports = mongoose.model('pictures', pictureSchema);
