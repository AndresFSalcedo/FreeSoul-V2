//IMPORTAR MODELO

const ClientReserve = require('../models/client.reserve.model')

// FUNCION GET
let showClientReserve = (req, res) => {

	ClientReserve.find({})
		.exec((err, data) => {

			if (err) {

				return res.json({

					status: 500,
					msg: "Request Error: GET Function"
				})
			}

			//CONTAR LA CANTIDAD DE REGISTROS
			ClientReserve.countDocuments({}, (err, total) => {

				if (err) {

					return res.json({

						status: 500,
						msg: "Request Error: GET Function",
						err
					})
				}

				res.json({
					status: 200,
					total,
					data
				})
			})


		})
}

// FUNCION POST
let createClientReserve = (req, res) => {

	let body = req.body

	//SE PREGUNTA SI VIENEN TODOS LOS CAMPOS
	if (!req.body.name) {

		res.json({

			status: 500,
			msg: "The client name must be inserted"
		})
	}

	if (!req.body.lastName) {

		res.json({

			status: 500,
			msg: "The last name must be inserted"
		})
	}

	if (!req.body.cC) {

		res.json({

			status: 500,
			msg: "The C.C. number must be inserted"
		})
	}

	if (!req.body.phone) {

		res.json({

			status: 500,
			msg: "The phone number must be inserted"
		})
	}

	if (!req.body.email) {

		res.json({

			status: 500,
			msg: "The email address must be inserted"
		})
	}

	if (!req.body.city) {

		res.json({

			status: 500,
			msg: "The city must be inserted"
		})
	}

	if (!req.body.address) {

		res.json({

			status: 500,
			msg: "The address must be inserted"
		})
	}

	if (!req.body.totalCost) {

		res.json({

			status: 500,
			msg: "The total cost must be inserted"
		})
	}

	if (req.body.products.length === 0) {

		res.json({

			status: 500,
			msg: "At least one product must be inserted"
		})
	}
	
	// OBETENER LOS DATOS DEL FORMULARIO PARA PASARLOS AL CLIENTE
	let date = Date(Date.now()).toString().slice(0,15);
	let clientReserve = new ClientReserve({

		date: date,
		name: `${body.name}`,
		lastName: `${body.lastName}`,
		cC: `${body.cC}`,
		phone: `${body.phone}`,
		email: `${body.email}`,
		city: `${body.city}`,
		address: `${body.address}`,
		totalCost: `${body.totalCost}`,
		status: `Pending`,
		products: body.products
	})


	//GUARDAR EN MONGODB

	clientReserve.save((err, data) => {

		if (err) {
			return res.json({

				status: 400,
				msg: "Request Error: POST Function",
				err
			})
		}

		res.json({

			status: 200,
			data,
			msg: "The client reserve has ben created!"
		})
	})
}

//FUNCTION PUT
let editClientReserve = (req, res) => {

	//Capturar el id a actualizar
	let id = req.params.id

	//Obtener el cuerpo del formulario
	let body = req.body

	//1. Se valida que exista el id
	ClientReserve.findById(id, (err, data) => {

		if(err) {

			return res.json({

				status: 500,
				msg: "Request Error: PUT function"
			})
		}

		if(!data) {

			return res.json({

				status: 400,
				msg: "The ID does not exists"
			})
		}

		//2. Actualizar registros

		let dataChangeDb = (id, body) => {

			return new Promise ((resolve, reject) => {

				let newData = {

					name: body.name,
					lastName: body.lastName,
					cC: body.cC,
					phone: body.phone,
					email: body.email,
					city: body.city,
					address: body.address,
					totalCost: `${body.totalCost}`,
					status: `${body.status}`,
					products: body.products
				}

				//3. Actualizar Base de Datos

				ClientReserve.findByIdAndUpdate(id, newData, {
					new: true,
					runValidators: true
				}, (err, data) => {

					if (err) {

						let response = {

							res: res,
							err: err
						}
						reject(response)
					}

					let response = {

						res: res,
						data: data
					}
					resolve(response)
				})
			})
		}

		//Sincronizamos las promesas
		dataChangeDb(id, body).then(response => {

			response["res"].json({
				status: 200,
				data: response["data"],
				msg: "The reserve has been updated"
			})
		}).catch(response => {

			response["res"].json({

				status: 400,
				err: response["err"],
				msg: "Error updating the reserve"
			})
		})
	})
}

//FUNCTION DELETE
let deleteClientReserve = (req, res) => {

	//Capturar el id a eliminar
	let id = req.params.id

	//1. Se valida que el id exista
	ClientReserve.findById(id, (err, data) => {

		if(err){

			return res.json({
				status: 500,
				msg: "Request Error: DELETE Function",
				err
			})
		}

		if(!data) {

			return res.json({
				status: 400,
				msg: "The ID does not exists",
				err
			})
		}

		ClientReserve.findByIdAndRemove(id, (err,data)=> {

			if(err) {

				return res.json({
					status: 500,
					msg: "Request Error: DELETE Function",
					err
				})
			}

			res.json({
				status: 200,
				msg: "The reserve has been deleted"
			})
		})
	})
}

//EXPORTAMOS FUNCIONES DEL CONTROLADOR
module.exports = {
	showClientReserve,
	createClientReserve,
	editClientReserve,
	deleteClientReserve
}