// ESQUEMA PARA EL MODELO CONECTOR A MONGODB

const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let pictureSchema = new Schema({

	productType: {

		type: String,
		required: [true, "El tipo de producto es obligatorio"]
	},

	design: {

		type: String,
		required: [true, "El diseño es obligatorio"]
	},
	
	image: {

		type: String,
		required: [true, "La imagen es obligatoria"]
	},

	productCode: {

		type: String,
		required: false
	}
})

// Exportar el modelo

module.exports = mongoose.model("pictures", pictureSchema)