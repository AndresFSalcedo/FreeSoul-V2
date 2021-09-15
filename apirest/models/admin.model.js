// // ESQUEMA PARA EL MODELO CONECTOR A MONGODB

 const mongoose = require('mongoose');

 let Schema = mongoose.Schema;

 let adminSchema = new Schema({

 	username: {

 		type: String,
 		required: [true, "El usuario es obligatorio"],
		unique: true
 	},

	password: {

 		type: String,
 		required: [true, "La contraseña es obligatoria"]
 	}
 })

/* =============================================
 Evitar devolver password
 =============================================*/

adminSchema.methods.toJSON = function(){

	let admin = this;
	let adminObject = admin.toObject();
	delete adminObject.password;
	return adminObject;
}


//  Exportar el modelo

 module.exports = mongoose.model("admins", adminSchema)