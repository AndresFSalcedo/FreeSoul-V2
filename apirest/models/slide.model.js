// ESQUEMA PARA EL MODELO CONECTOR A MONGODB

const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let slideSchema = new Schema({

	picture: {

		type: String,
		required: [true, "La imagen es obligatoria"]
	}
})

// Exportar el modelo

module.exports = mongoose.model("slides", slideSchema)