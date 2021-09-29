// // IMPORTACION DEL MODELO
const Admins = require('../models/admin.model');

// //MODULO DE ENCRIPTACION
const bcrypt = require('bcrypt');

// //TOKEN DE AUTORIZACION
const jwt = require('jsonwebtoken');

// // FUNCION GET
let showAdmins = (req, res) => {

	Admins.find({})
		.exec((err, data) => {

			if (err) {

				return res.json({

					status: 500,
					msg: "Request Error: GET Function"
				})
			}

			//CONTAR LA CANTIDAD DE REGISTROS
			Admins.countDocuments({}, (err, total) => {

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

//FUNCION PUT
let editAdmin = (req, res) => {

	//Capturar el ID del admin
	let id = req.params.id

	// Obtener el cuerpo del formulario
	let body = req.body

	//Se valida que el ID exista
	Admins.findById(id, (err, data) => {

		if (err) {

			return res.json({

				status: 500,
				msg: "Request Error: PUT Function",
				err
			})
		}

		if (!data) {

			return res.json({

				status: 400,
				msg: "The Admin does not exists",
			})
		}

		let pass = data.password

		//Validar cambio de contraseña
		let checkPasswordChange = (body, pass) => {

			return new Promise((resolve, reject) => {

				if (body.password == undefined) {

					resolve(pass)
				} else {

					pass = bcrypt.hashSync(body.password, 10)
					resolve(pass)
				}
			})
		}

		//Actualizar registros
		let changeRegistriesDb = (id, body, pass) => {

			return new Promise((resolve, reject) => {

				let dataAdmin = {

					username: body.username,
					password: pass
				}

				//Actualizamos en MongoDb

				Admins.findByIdAndUpdate(id, dataAdmin, {
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

		//Sincronizar promesas
		checkPasswordChange(body, pass).then(pass => {

			changeRegistriesDb(id, body, pass).then(respuesta => {

				respuesta["res"].json({
					status: 200,
					data: respuesta["data"],
					msg: "The admin has been updated!"
				})

			}).catch(respuesta => {

				respuesta["res"].json({

					status: 400,
					err: respuesta["err"],
					msg: "Error editing the admin"
				})
			})
		}).catch(respuesta => {

			respuesta["res"].json({

				status: 400,
				msg: respuesta["msg"]
			})
		})
	})
}

// //FUNCION LOGIN
let login = (req, res) => {

	let body = req.body

	//Busqueda en base de datos
	Admins.findOne({
		username: body.username
	}, (err, data) => {

		if (err) {

			return res.json({

				status: 500,
				msg: "Request Error: LOGIN Function",
				err
			})
		}


		//Validar existencia de usuario
		if (!data) {

			return res.json({

				status: 400,
				msg: "The user does not exists",
			})
		}

		// Validar contraseña
		if(!bcrypt.compareSync(body.password, data.password)){
			
			return res.json({

				status: 400,
				msg: "Wrong password"
			})
		}

		//Generar token de autorizacion
		let token = jwt.sign({

			data,
		}, process.env.SECRET, {expiresIn: process.env.DEADLINE})

		res.json({

			status:200,
			token,
			data
		})
	})
}

//EXPORTAR FUNCIONES DEL CONTROLADOR
module.exports = {
	showAdmins,
	editAdmin,
	login
}