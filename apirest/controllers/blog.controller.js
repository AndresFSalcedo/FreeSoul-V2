//IMPORTAR MODELO
const Blog = require('../models/blog.model')

//ADMINISTRADORES DE CARPETAS Y ARCHIVOS
const fs = require('fs')
const path = require('path')

// FUNCION GET
let showBlogs = (req, res) => {

	Blog.find({})
		.exec((err, data) => {

			if (err) {

				return res.json({

					status: 500,
					msg: "Error en la peticion"
				})
			}

			//CONTAR LA CANTIDAD DE REGISTROS
			Blog.countDocuments({}, (err, total) => {

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

//FUNCION POST
let createBlog = (req, res) => {

	let body = req.body

	//Se pregunta si existe un archivo

	if (!req.files) {

		res.json({

			status: 500,
			msg: "La imagen no puede ir vacia"
		})
	}

	//CAPTURA DE file
	
	let file = req.files.image

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

	//CAMBIAR NOMBRE AL FILE

	let name = Math.floor(Math.random() * 10000)

	let extension = file.name.split('.').pop()

	//MOVER FILE A LA CARPETA

	file.mv(`./files/blog/${name}.${extension}`, err => {
		if (err) {

			return res.json({

				status: 500,
				msg: "Error al guardar la imagen",
				err
			})
		}

		// OBETENER LOS DATOS DEL FORMULARIO PARA PASARLOS AL MODELO
		let blog = new Blog({
			
			image: `${name}.${extension}`,
			url: body.url,
			title: body.title,
			intro: body.intro
		})

		//GUARDAR EN MONGODB

		blog.save((err, data) => {

			if (err) {
				return res.json({

					status: 400,
					msg: "Error al almacenar el blog",
					err
				})
			}

			res.json({

				status: 200,
				data,
				msg: "El blog ha sido agregado con exito"
			})
		})
	})
}

//FUNCION PUT

let editBlog = (req, res) => {

	//Capturar el ID a actualizar

	let id = req.params.id

	// Obtener el cuerpo del formulario

	let body = req.body

	//1. Se valida que el ID exista

	Blog.findById(id, (err, data) => {

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
				msg: "El blog no existente",
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

					file.mv(`./files/blog/${name}.${extension}`, err => {

						if (err) {

							let respu = {

								res: res,
								msg: "Error al guardar imagen"
							}

							reject(respu)
						}

						//Borrar antigua imagen
						if (fs.existsSync(`./files/blog/${picRoute}`)) {

							fs.unlinkSync(`./files/blog/${picRoute}`)
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
				let dataBlog = {
					
					image: picRoute,
					url: body.url,
					title: body.title,
					intro: body.intro
					
				}

				//Actualizamos en MongoDb

				Blog.findByIdAndUpdate(id, dataBlog, {
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
					msg: "El articulo ha sido actualizado con exito"
				})

			}).catch(respu => {

				respu["res"].json({

					status: 400,
					err: respu["err"],
					msg: "Error al editar el articulo"
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

let deleteBlog = (req, res) => {

	//Capturar el ID a actualizar

	let id = req.params.id

	//1. Se valida que el ID exista

	Blog.findById(id, (err, data) => {

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
				msg: "El objeto no existente",
			})
		}

		//Borrar antigua foto
		if (fs.existsSync(`./files/blog/${data.image}`)) {

			fs.unlinkSync(`./files/blog/${data.image}`)
		}

		//Borrar registro en MongoDB

		Blog.findByIdAndRemove(id, (err, data) => {

			if (err) {

				return res.json({

					status: 500,
					msg: "Error en el servidor",
					err
				})
			}

			res.json({
				status:200,
				msg:"El articulo se ha eliminado"
			})
		})
	})

}

let showBlogImg = (req,res)=>{

	let image = req.params.image
	let imgRoute = `./files/blog/${image}`

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



//Exports of functions 

module.exports = {
	showBlogs,
	createBlog,
	editBlog,
	deleteBlog,
	showBlogImg
}