//ESQUEMA PARA EL MODELO CONECTOR A MONGODB

const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let productSchema = new Schema({
   product: {
      type: String,
      required: [true, 'The product is required'],
      unique: true,
   },
});

//EXPORTAR EL MODELO

module.exports = mongoose.model('products', productSchema);
