// ESQUEMA PARA EL MODELO CONECTOR A MONGODB

const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let slideSchema = new Schema({
   picture: {
      type: String,
      required: [true, 'The image is required'],
   },

   position: {
      type: Number,
      required: [true, 'The position is required'],
   },
});

// Exportar el modelo

module.exports = mongoose.model('slides', slideSchema);
