//IMPORTAR MODELO

const Slide = require('../models/slide.model')

//Administrados de carpetas y files
const fs = require('fs')
const path = require('path')

// FUNCION GET

let showSlide = (req, res) => {

	Slide.find({})
		.exec((err, data) => {

			if (err) {

				return res.json({

					status: 500,
					msg: "Error en la peticion"
				})
			}

			//CONTAR LA CANTIDAD DE REGISTROS

			Slide.countDocuments({}, (err, total) => {

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

//Function post
 
let createSlide = (req, res) => {

	let body = req.body

	//SE PREGUNTA SI VIENE UN file

	if (!req.files) {

		res.json({

			status: 500,
			msg: "La imagen no puede ir vacia"
		})
	}

	//CAPTURA DE file
	
	let file = req.files.picture

	//VALIDAR LA EXTENSION DEL file

	if (file.mimetype != 'image/jpeg' && file.mimetype != 'image/png') {

		return res.json({

			status: 400,
			msg: "La imagen debe ser formato JPG o PNG"
		})
	}

	if (file.size > 2000000) {

		return res.json({

			status: 400,
			msg: "La imagen debe ser inferior a 2MB"
		})
	}

	//CAMBIAR name AL file

	let name = Math.floor(Math.random() * 10000)

	let extension = file.name.split('.').pop()

	//Mover file a la carpeta

	file.mv(`./files/slide/${name}.${extension}`, err => {
		if (err) {

			return res.json({

				status: 500,
				msg: "Error al guardar la imagen",
				err
			})
		}

		// OBETENER LOS DATOS DEL FORMULARIO PARA PASARLOS AL MODELO
		let slide = new Slide({

			picture: `${name}.${extension}`
		})


		//GUARDAR EN MONGODB

		slide.save((err, data) => {

			if (err) {
				return res.json({

					status: 400,
					msg: "Error al almacenar el Slide",
					err
				})
			}

			res.json({

				status: 200,
				data,
				msg: "El Slide ha sido creado con exito"
			})
		})
	})
}

//FUNCION PUT

let editSlide = (req, res) => {

	//Capturar el ID a actualizar

	let id = req.params.id

	// Obtener el cuerpo del formulario

	let body = req.body

	//1. Se valida que el ID exista

	Slide.findById(id, (err, data) => {

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
				msg: "Slide no existente",
			})
		}

		let picRoute = data.picture

		//2. Se valida cambio de imagen

		let checkFileChange = (req, picRoute) => {

			return new Promise((resolve, reject) => {

				if (req.files) {

					let file = req.files.file

					//VALIDAR LA EXTENSION DEL file

					if (file.mimetype != 'image/jpeg' && file.mimetype != 'image/png') {

						let respu = {

							res: res,
							msg: "La imagen debe ser formato JPG o PNG"
						}

						reject(respu)
					}

					if (file.size > 2000000) {

						let respu = {

							res: res,
							msg: "La imagen debe ser inferior a 2MB"
						}

						reject(respu)
					}

					//CAMBIAR name AL file

					let name = Math.floor(Math.random() * 10000)

					//CAPTURAR LA EXTENSION DEL file

					let extension = file.name.split('.').pop()

					//MOVER file A CARPETA

					file.mv(`./files/slide/${name}.${extension}`, err => {

						if (err) {

							let respu = {

								res: res,
								msg: "Error al guardar imagen"
							}

							reject(respu)
						}

						//Borrar antigua imagen
						if (fs.existsSync(`./files/slide/${picRoute}`)) {

							fs.unlinkSync(`./files/slide/${picRoute}`)
						}

						//Damos valor a nueva imagen
						picRoute = `${name}.${extension}`

						resolve(picRoute)
					})


				} else {

					resolve(picRoute)
				}
			})
		}

		//3. Actualizamos registros

		let registryChangeDb = (id, picRoute) => {

			return new Promise((resolve, reject) => {
				let dataSlide = {

					picture: picRoute
				}

				//Actualizamos en MongoDb

				Slide.findByIdAndUpdate(id, dataSlide, {
					new: true,
					runValidators: true
				}, (err, data) => {

					if (err) {

						let respu = {

							res: res,
							err: err
						}
						reject(respu)
					}

					let respu = {

						res: res,
						data: data
					}

					resolve(respu)
				})
			})
		}

		//SINCRONIZAMOS LAS PROMESAS

		checkFileChange(req, picRoute).then(picRoute => {

			registryChangeDb(id, picRoute).then(respu => {

				respu["res"].json({
					status: 200,
					data: respu["data"],
					msg: "El Slide ha sido actualizado con exito"
				})

			}).catch(respu => {

				respu["res"].json({

					status: 400,
					err: respu["err"],
					msg: "Error al editar el Slide"
				})
			})
		}).catch(respu => {

			respu["res"].json({

				status: 400,
				msg: respu["msg"]
			})
		})

	})
}

// FUNCIOND DELETE

let deleteSlide = (req, res) => {

	//Capturar el ID a actualizar

	let id = req.params.id

	//1. Se valida que el ID exista

	Slide.findById(id, (err, data) => {

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
				msg: "La foto de la Slide no existente",
			})
		}

		//Borrar antigua foto
		if (fs.existsSync(`./files/slide/${data.picture}`)) {

			fs.unlinkSync(`./files/slide/${data.picture}`)
		}

		//Borrar registro en MongoDB

		Slide.findByIdAndRemove(id, (err, data) => {

			if (err) {

				return res.json({

					status: 500,
					msg: "Error en el servidor",
					err
				})
			}

			res.json({
				status:200,
				msg:"La foto de la Slide eliminado"
			})
		})
	})

}

// FUNCION GET PARA ACCESO A IMAGENES SEPARADAS

let showSlideImg = (req, res)=>{

	let image = req.params.image
	let imgRoute = `./files/slide/${image}`

	fs.exists(imgRoute, exists =>{

		if(!exists){
			return res.json({
				status:400,
				msg: "La imagen no existe"
			})
		}

		res.sendFile(path.resolve(imgRoute))
	})
}


module.exports = {
	showSlide,
	createSlide,
	editSlide,
	deleteSlide,
	showSlideImg
}