// ESQUEMA PARA EL MODELO CONECTOR A MONGODB

const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let stockSchema = new Schema({

	productType: {

		type: String,
		required: [true, "El tipo de producto es obligatorio"]
	},

	design: {

		type: String,
		required: [true, "El mensaje es obligatorio"]
	},

	codColor: {

		type: String,
		required: [true, "El color es obligatorio"]
	},

	price:{
		type: Number,
		required: [true, "El precio es obligatorio"]
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
	},

	XL: {
		type: Number,
		required: [true, "Asignar valor es obligatorio"]
	},

	productCode: {

		type: String,
		required: false
	}

	
})

// Exportar el modelo

module.exports = mongoose.model("stocks", stockSchema)