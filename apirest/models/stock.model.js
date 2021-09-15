// ESQUEMA PARA EL MODELO CONECTOR A MONGODB

const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let stockSchema = new Schema({

	design: {

		type: String,
		required: [true, "El mensaje es obligatorio"]
	},

	codColor: {

		type: String,
		required: [true, "El color es obligatorio"]
	},

	S: {
		type: Number,
		required: [true, "Asignar valor es obligatorio"]
	},

	M: {
		type: Number,
		required: [true, "Asignar valor es obligatorio"]
	},

	L: {
		type: Number,
		required: [true, "Asignar valor es obligatorio"]
	}

	
})

// Exportar el modelo

module.exports = mongoose.model("stocks", stockSchema)