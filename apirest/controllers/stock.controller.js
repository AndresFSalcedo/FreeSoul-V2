//IMPORTAR MODELO

const Stock = require('../models/stock.model')

//Administrados de carpetas y archivos
const fs = require('fs')

// FUNCION GET

let showStock = (req, res) => {

	Stock.find({})
		.exec((err, data) => {

			if (err) {

				return res.json({

					status: 500,
					mensaje: "Error en la peticion"
				})
			}

			//CONTAR LA CANTIDAD DE REGISTROS

			Stock.countDocuments({}, (err, total) => {

				if (err) {

					return res.json({

						status: 500,
						mensaje: "Error en la peticion",
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

	if (!req.body.design) {

		res.json({

			status: 500,
			mensaje: "El diseño no puede ir vacio"
		})
	}

	if (!req.body.codColor) {

		res.json({

			status: 500,
			mensaje: "El color no puede ir vacio"
		})
	}

	if (!req.body.price) {

		res.json({

			status: 500,
			mensaje: "El color no puede ir vacio"
		})
	}

	if (!req.body.S) {

		res.json({

			status: 500,
			mensaje: "La talla S no puede ir vacia"
		})
	}

	if (!req.body.M) {

		res.json({

			status: 500,
			mensaje: "La talla M no puede ir vacia"
		})
	}

	if (!req.body.L) {

		res.json({

			status: 500,
			mensaje: "La talla L no puede ir vacia"
		})
	}

	// OBETENER LOS DATOS DEL FORMULARIO PARA PASARLOS AL MODELO
	let stock = new Stock({

		design: `${body.design}`,
		codColor: `${body.codColor}`,
		price: `${body.price}`,
		S: `${body.S}`,
		M: `${body.M}`,
		L: `${body.L}`,
	})


	//GUARDAR EN MONGODB

	stock.save((err, data) => {

		if (err) {
			return res.json({

				status: 400,
				mensaje: "Error al almacenar el stock",
				err
			})
		}

		res.json({

			status: 200,
			data,
			mensaje: "El stock ha sido creado con exito"
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
				mensaje: "Error en el servidor",
				err
			})
		}

		if (!data) {

			return res.json({

				status: 400,
				mensaje: "El objeto no existe",
			})
		}

		//2. Actualizamos registros

		let dataChangeDb = (id, body) => {

			return new Promise((resolve, reject) => {
				let newData = {

					price: body.price,
					S: body.S,
					M: body.M,
					L: body.L
				}

				//Actualizamos en MongoDb

				Stock.findByIdAndUpdate(id, newData, {
					new: true,
					runValidators: true
				}, (err, data) => {

					if (err) {

						let respuesta = {

							res: res,
							err: err
						}
						reject(respuesta)
					}

					let respuesta = {

						res: res,
						data: data
					}

					resolve(respuesta)
				})
			})
		}

		//SINCRONIZAMOS LAS PROMESAS

		dataChangeDb(id, body).then(respuesta => {

			respuesta["res"].json({
				status: 200,
				data: respuesta["data"],
				mensaje: "El stock ha sido actualizado con exito"
			})

		}).catch(respuesta => {

			respuesta["res"].json({

				status: 400,
				err: respuesta["err"],
				mensaje: "Error al editar el stock"
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
				mensaje: "Error en el servidor",
				err
			})
		}

		if (!data) {

			return res.json({

				status: 400,
				mensaje: "El objeto no existe",
			})
		}

		//Borrar registro en MongoDB

		Stock.findByIdAndRemove(id, (err, data) => {

			if (err) {

				return res.json({

					status: 500,
					mensaje: "Error en el servidor",
					err
				})
			}

			res.json({
				status:200,
				mensaje:"El objeto ha sido eliminado"
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