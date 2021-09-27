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
					msg: "Request Error: GET Function"
				})
			}

			//CONTAR LA CANTIDAD DE REGISTROS

			Slide.countDocuments({}, (err, total) => {

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

//Function post
 
let createSlide = (req, res) => {

	let body = req.body

	//SE PREGUNTA SI VIENE UN file

	if (!req.files) {

		res.json({

			status: 500,
			msg: "The image cannot be empty"
		})
	}

	if (!req.body.position) {

		res.json({

			status: 500,
			msg: "the position cannot be empty"
		})
	}

	//CAPTURA DE file
	
	let file = req.files.picture

	//VALIDAR LA EXTENSION DEL file

	if (file.mimetype != 'image/jpeg' && file.mimetype != 'image/png') {

		return res.json({

			status: 400,
			msg: "The image must be JPG or PNG"
		})
	}

	if (file.size > 2000000) {

		return res.json({

			status: 400,
			msg: "The size must be max 2MB"
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
				msg: "Request Error: POST Function",
				err
			})
		}

		// OBETENER LOS DATOS DEL FORMULARIO PARA PASARLOS AL MODELO
		let slide = new Slide({

			picture: `${name}.${extension}`,
			position: `${body.position}`
		})


		//GUARDAR EN MONGODB

		slide.save((err, data) => {

			if (err) {
				return res.json({

					status: 400,
					msg: "Error storing the slide in the database",
					err
				})
			}

			res.json({

				status: 200,
				data,
				msg: "The slide has been created!"
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
				msg: "Request Error: PUT Function",
				err
			})
		}

		if (!data) {

			return res.json({

				status: 400,
				msg: "Slide does not exists",
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
							msg: "The image must be JPG or PNG"
						}

						reject(respu)
					}

					if (file.size > 2000000) {

						let respu = {

							res: res,
							msg: "The size must be max 2MB"
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
								msg: "Request Error: PUT Function"
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

					picture: picRoute,
					position: body.position
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
					msg: "The slide has been updated!"
				})

			}).catch(respu => {

				respu["res"].json({

					status: 400,
					err: respu["err"],
					msg: "Error editing the slide"
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
				msg: "Request Error: DELETE Function",
				err
			})
		}

		if (!data) {

			return res.json({

				status: 400,
				msg: "Slide does not exists",
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
					msg: "Request Error: DELETE Function",
					err
				})
			}

			res.json({
				status:200,
				msg:"The slide has been deleted!"
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
				msg: "The slide does not exists"
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