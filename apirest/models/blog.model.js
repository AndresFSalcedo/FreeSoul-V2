// ESQUEMA PARA EL MODELO CONECTOR A MONGODB

const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let blogSchema = new Schema({

	image: {

		type: String,
		required: [true, "La imagen es obligatoria"]
	},

	url: {

		type: String,
		required: [true, "La url es obligatoria"]
	},

	title: {

		type: String,
		required: [true, "El titulo es obligatorio"]
	},

	intro:{
		type: String,
		required: [true, "La introduccion es obligatoria"]
	}
	
})

// Exportar el modelo

module.exports = mongoose.model("blogs", blogSchema)