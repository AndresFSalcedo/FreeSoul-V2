// ESQUEMA PARA EL MODELO CONECTOR A MONGODB

const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let pictureSchema = new Schema({

	design: {

		type: String,
		required: [true, "El diseño es obligatorio"]
	},
	image: {

		type: String,
		required: [true, "La imagen es obligatoria"]
	}
})

// Exportar el modelo

module.exports = mongoose.model("pictures", pictureSchema)