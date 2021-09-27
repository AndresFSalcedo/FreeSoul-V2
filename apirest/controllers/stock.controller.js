//IMPORTAR MODELO

const Stock = require('../models/stock.model')

// FUNCION GET

let showStock = (req, res) => {

	Stock.find({})
		.exec((err, data) => {

			if (err) {

				return res.json({

					status: 500,
					msg: "Error en la peticion"
				})
			}

			//CONTAR LA CANTIDAD DE REGISTROS

			Stock.countDocuments({}, (err, total) => {

				if (err) {

					return res.json({

						status: 500,
						msg: "Error en la peticion",
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

let createStock = (req, res) => {

	let body = req.body

	//SE PREGUNTA SI VIENEN TODOS LOS CAMPOS

	if (!req.body.productType) {

		res.json({

			status: 500,
			msg: "El tipo de producto no puede ir vacio"
		})
	}

	if (!req.body.design) {

		res.json({

			status: 500,
			msg: "El diseño no puede ir vacio"
		})
	}

	if (!req.body.codColor) {

		res.json({

			status: 500,
			msg: "El color no puede ir vacio"
		})
	}

	if (!req.body.price) {

		res.json({

			status: 500,
			msg: "El precio no puede ir vacio"
		})
	}

	if (!req.body.S) {

		res.json({

			status: 500,
			msg: "La talla S no puede ir vacia"
		})
	}

	if (!req.body.M) {

		res.json({

			status: 500,
			msg: "La talla M no puede ir vacia"
		})
	}

	if (!req.body.L) {

		res.json({

			status: 500,
			msg: "La talla L no puede ir vacia"
		})
	}

	if (!req.body.XL) {

		res.json({

			status: 500,
			msg: "La talla XL no puede ir vacia"
		})
	}

	// OBETENER LOS DATOS DEL FORMULARIO PARA PASARLOS AL MODELO
	let stock = new Stock({

		productType: `${body.productType}`,
		design: `${body.design}`,
		codColor: `${body.codColor}`,
		price: `${body.price}`,
		S: `${body.S}`,
		M: `${body.M}`,
		L: `${body.L}`,
		XL: `${body.XL}`,
		productCode:`${body.productType}-${body.design}`
	})


	//GUARDAR EN MONGODB

	stock.save((err, data) => {

		if (err) {
			return res.json({

				status: 400,
				msg: "Error al almacenar el stock",
				err
			})
		}

		res.json({

			status: 200,
			data,
			msg: "El stock ha sido creado con exito"
		})
	})
}

//FUNCION PUT

let editStock = (req, res) => {

	//Capturar el ID a actualizar

	let id = req.params.id

	// Obtener el cuerpo del formulario

	let body = req.body

	//1. Se valida que el ID exista

	Stock.findById(id, (err, data) => {

		if (err) {

			return res.json({

				status: 500,
				msg: "Error en el servidor",
				err
			})
		}

		if (!data) {

			return res.json({

				status: 400,
				msg: "El objeto no existe",
			})
		}

		//2. Actualizamos registros

		let dataChangeDb = (id, body) => {

			return new Promise((resolve, reject) => {
				let newData = {

					productType: body.productType,
					design:body.design,
					price: body.price,
					S: body.S,
					M: body.M,
					L: body.L,
					XL: body.XL,
					productCode:`${body.productType}-${body.design}`
				}

				//Actualizamos en MongoDb

				Stock.findByIdAndUpdate(id, newData, {
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

		//SINCRONIZAMOS LAS PROMESAS

		dataChangeDb(id, body).then(response => {

			response["res"].json({
				status: 200,
				data: response["data"],
				msg: "El stock ha sido actualizado con exito"
			})

		}).catch(response => {

			response["res"].json({

				status: 400,
				err: response["err"],
				msg: "Error al editar el stock"
			})
		})
	})
}

// FUNCIOND DELETE

let deleteStock = (req, res) => {

	//Capturar el ID a actualizar

	let id = req.params.id

	//1. Se valida que el ID exista

	Stock.findById(id, (err, data) => {

		if (err) {

			return res.json({

				status: 500,
				msg: "Error en el servidor",
				err
			})
		}

		if (!data) {

			return res.json({

				status: 400,
				msg: "El objeto no existe",
			})
		}

		//Borrar registro en MongoDB

		Stock.findByIdAndRemove(id, (err, data) => {

			if (err) {

				return res.json({

					status: 500,
					msg: "Error en el servidor",
					err
				})
			}

			res.json({
				status:200,
				msg:"El objeto ha sido eliminado"
			})
		})
	})

}

//EXPORTAMOS FUNCIONES DEL CONTROLADOR

module.exports = {
	showStock,
	createStock,
	editStock,
	deleteStock
}