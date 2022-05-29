// ESQUEMA PARA EL MODELO CONECTOR A MONGODB

const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let blogSchema = new Schema({
   image: {
      type: String,
      required: [true, 'The image is required'],
   },

   url: {
      type: String,
      required: [true, 'The url is required'],
   },

   title: {
      type: String,
      required: [true, 'The title is required'],
   },

   intro: {
      type: String,
      required: [true, 'The intro is required'],
   },
});

// Exportar el modelo

module.exports = mongoose.model('blogs', blogSchema);
