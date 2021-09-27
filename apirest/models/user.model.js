// ESQUEMA PARA EL MODELO CONECTOR A MONGODB

const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({

	username: {

		type: String,
		required: [true, "El nombre de usuario es obligatorio"]
	},

	email: {

		type: String,
		required: [true, "El email es obligatorio"],
		unique: true
	}
	
})

// Exportar el modelo

module.exports = mongoose.model("users", userSchema)