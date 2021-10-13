// // ESQUEMA PARA EL MODELO CONECTOR A MONGODB

const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let reserveClientSchema = new Schema({

	date: {
		type: String,
		required:[true, "The date cannot be empty"]
	},

	name:{

		type:String,
		required:[true, "The name cannot be empty"]
	},

	lastName:{

		type:String,
		required:[true, "The last name cannot be empty"]
	},

	cC:{
		
		type:Number,
		required:[true, "The Client Id cannot be empty"]
	},

	phone:{
		
		type:Number,
		required:[true, "The phone number cannot be empty"]
	},

	email:{
		
		type:String,
		required:[true, "The Email cannot be empty"]
	},

	city:{
		
		type:String,
		required:[true, "The city cannot be empty"]
	},

	address:{
		
		type:String,
		required:[true, "The address cannot be empty"]
	},

	totalCost: {

		type:Number,
		required:[true, "The total cost cannot be empty"]
	},

	status: {

		type:String,
		required:[true, "The status cannot be empty"]
	},

	products:[{

		productCode: {
			type: String,
			required:[true, "A product is required"]
		},

		color: {
			type: String,
			required:[true, "The color is required"]
		},

		size: {
			type:String,
			required:[true, "The size is required"]
		},

		quantity: {
			type:Number,
			required:[true, "The number is required"]
		}
	}]

})

module.exports = mongoose.model("clientreserves", reserveClientSchema)
