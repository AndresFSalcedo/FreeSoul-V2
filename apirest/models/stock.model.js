// ESQUEMA PARA EL MODELO CONECTOR A MONGODB

const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let stockSchema = new Schema({
   productType: {
      type: String,
      required: [true, 'The product type is required'],
   },

   design: {
      type: String,
      required: [true, 'The design is required'],
   },

   codColor: {
      type: String,
      required: [true, 'The color is required'],
   },

   price: {
      type: Number,
      required: [true, 'The price is required'],
   },

   S: {
      type: Number,
      required: [true, 'The S size is required'],
   },

   M: {
      type: Number,
      required: [true, 'The M size is required'],
   },

   L: {
      type: Number,
      required: [true, 'The L size is required'],
   },

   XL: {
      type: Number,
      required: [true, 'The XL size is required'],
   },

   productCode: {
      type: String,
      required: false,
   },
});

// Exportar el modelo

module.exports = mongoose.model('stocks', stockSchema);
