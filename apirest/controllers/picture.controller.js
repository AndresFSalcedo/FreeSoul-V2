//IMPORTAR MODELO

const Picture = require('../models/picture.model')

//Administrados de carpetas y archivos
const fs = require('fs')
const path = require('path')

// FUNCION GET

let showPictures = (req, res) => {

	Picture.find({})
		.exec((err, data) => {

			if (err) {

				return res.json({

					status: 500,
					msg: "Request Error: GET Function"
				})
			}

			//CONTAR LA CANTIDAD DE REGISTROS

			Picture.countDocuments({}, (err, total) => {

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
 
let createPicture = (req, res) => {

	let body = req.body

	//SE PREGUNTA SI VIENE UN FILE

	if (!req.files) {

		res.json({

			status: 500,
			msg: "The image cannot be empty"
		})
	}

	//CAPTURA DE file
	
	let file = req.files.image

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

	//CAMBIAR NOMBRE AL FILE

	let name = Math.floor(Math.random() * 10000)

	let extension = file.name.split('.').pop()

	//MOVER FILE A LA CARPETA

	file.mv(`./files/picture/${name}.${extension}`, err => {
		if (err) {

			return res.json({

				status: 500,
				msg: "Request Error: POST Function",
				err
			})
		}

		// OBETENER LOS DATOS DEL FORMULARIO PARA PASARLOS AL MODELO
		let picture = new Picture({
			
			productType:body.productType,
			design:body.design,
			image: `${name}.${extension}`,
			productCode: `${body.productType}-${body.design}`
		})

		//GUARDAR EN MONGODB

		picture.save((err, data) => {

			if (err) {
				return res.json({

					status: 400,
					msg: "Error storing the picture in the database",
					err
				})
			}

			res.json({

				status: 200,
				data,
				msg: "The picture has been created!"
			})
		})
	})
}

//FUNCION PUT

let editPicture = (req, res) => {

	//Capturar el ID a actualizar

	let id = req.params.id

	// Obtener el cuerpo del formulario

	let body = req.body

	//1. Se valida que el ID exista

	Picture.findById(id, (err, data) => {

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
				msg: "The item does not exists",
			})
		}

		let picRoute = data.image

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

					file.mv(`./files/picture/${name}.${extension}`, err => {

						if (err) {

							let respu = {

								res: res,
								msg: "Request Error: PUT Function"
							}

							reject(respu)
						}

						//Borrar antigua imagen
						if (fs.existsSync(`./files/picture/${picRoute}`)) {

							fs.unlinkSync(`./files/picture/${picRoute}`)
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

		let registryChangeDb = (id, body, picRoute) => {

			return new Promise((resolve, reject) => {
				let dataPicture = {
					
					productType: body.productType,
					design: body.design,
					image: picRoute,
					productCode: `${body.productType}-${body.design}`
				}

				//Actualizamos en MongoDb

				Picture.findByIdAndUpdate(id, dataPicture, {
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

			registryChangeDb(id, body, picRoute).then(respu => {

				respu["res"].json({
					status: 200,
					data: respu["data"],
					msg: "The item has been updated!"
				})

			}).catch(respu => {

				respu["res"].json({

					status: 400,
					err: respu["err"],
					msg: "Error editing the item"
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

let deletePicture = (req, res) => {

	//Capturar el ID a actualizar

	let id = req.params.id

	//1. Se valida que el ID exista

	Picture.findById(id, (err, data) => {

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
				msg: "Item does not exists",
			})
		}

		//Borrar antigua foto
		if (fs.existsSync(`./files/picture/${data.image}`)) {

			fs.unlinkSync(`./files/picture/${data.image}`)
		}

		//Borrar registro en MongoDB

		Picture.findByIdAndRemove(id, (err, data) => {

			if (err) {

				return res.json({

					status: 500,
					msg: "Request Error: DELETE Function",
					err
				})
			}

			res.json({
				status:200,
				msg:"The item has been deleted!"
			})
		})
	})

}

let showPictureImg = (req,res)=>{

	let image = req.params.image
	let imgRoute = `./files/picture/${image}`

	fs.exists(imgRoute, exists =>{

		if(!exists){
			return res.json({
				status:400,
				msg: "The image does not exists"
			})
		}

		res.sendFile(path.resolve(imgRoute))
	})
}



//Exports of functions 

module.exports = {
	showPictures,
	createPicture,
	editPicture,
	deletePicture,
	showPictureImg
}