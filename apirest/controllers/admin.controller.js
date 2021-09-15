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
					mensaje: "Error en la peticion"
				})
			}

			//CONTAR LA CANTIDAD DE REGISTROS

			Admins.countDocuments({}, (err, total) => {

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

//FUNCION POST

let createAdmin = (req, res)=>{

	//OBTENER EL CUERPOD EL FORMULARIO
	let body = req.body;

	// OBETENER LOS DATOS DEL FORMULARIO PARA PASARLOS AL MODELO
	let admins = new Admins({
		

		username: body.username,
		password: bcrypt.hashSync(body.password, 10)
	})

	admins.save((err, data) => {

		if (err) {
			return res.json({

				status: 400,
				mensaje: "Error al almacenar el administrador",
				err
			})
		}

		res.json({

			status: 200,
			data,
			mensaje: "El administrador ha sido creado con exito"
		})
	})
}

//FUNCION PUT

let editAdmin = (req, res) => {

	//Capturar el ID del admin

	let id = req.params.id

	// Obtener el cuerpo del formulario

	let body = req.body

	//1. Se valida que el ID exista

	Admins.findById(id, (err, data) => {

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
				mensaje: "Administrador no existente",
			})
		}

		let pass = data.password

		//VALIDAR CAMBIO DE PASS

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

		//ACTUALIZAR REGISTROS

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

		//SINCRONIZAR PROMESAS

		checkPasswordChange(body, pass).then(pass => {

			changeRegistriesDb(id, body, pass).then(respuesta => {

				respuesta["res"].json({
					status: 200,
					data: respuesta["data"],
					mensaje: "El Admin ha sido actualizado con exito"
				})

			}).catch(respuesta => {

				respuesta["res"].json({

					status: 400,
					err: respuesta["err"],
					mensaje: "Error al editar el Admin"
				})
			})
		}).catch(respuesta => {

			respuesta["res"].json({

				status: 400,
				mensaje: respuesta["mensaje"]
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
				mensaje: "Error en el servidor",
				err
			})
		}


		//Validar existencia de usuario
		if (!data) {

			return res.json({

				status: 400,
				mensaje: "Usuario no existente",
			})
		}

		// Validar contraseña
		if(!bcrypt.compareSync(body.password, data.password)){
			
			return res.json({

				status: 400,
				mensaje: "Contraseña incorrecta"
			})
		}

		//GENERAR TOKEN DE AUTORIZACION
		let token = jwt.sign({

			data,
		}, process.env.SECRET, {expiresIn: process.env.DEADLINE})

		res.json({

			status:200,
			token
		})
	})
}


//EXPORTAR FUNCIONES DEL CONTROLADOR
module.exports = {
	showAdmins,
	createAdmin,
	editAdmin,
	login
}