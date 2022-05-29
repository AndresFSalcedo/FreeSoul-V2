// ESQUEMA PARA EL MODELO CONECTOR A MONGODB

const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
   username: {
      type: String,
      required: [true, 'The username is required'],
   },

   email: {
      type: String,
      required: [true, 'The email is required'],
      unique: true,
   },
});

// Exportar el modelo

module.exports = mongoose.model('users', userSchema);
