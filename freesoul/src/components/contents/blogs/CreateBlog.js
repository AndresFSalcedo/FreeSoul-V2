import React, {useState} from 'react';
import {apiRoute} from '../../../config/Config';
import $ from 'jquery';

export default function CreateBlog(){

	/*=============================================
	HOOK PARA CAPTURAR DATOS
	=============================================*/
	
	const [blog, createBlog] = useState({

		image: null,
		title: "",
		intro: "",
		url: ""
	})

	/*=============================================
	OnChange
	=============================================*/
	
	const digitForm = e =>{

		let image = $("#image").get(0).files[0]

		//VALIDAR LA EXTENSION DEL ARCHIVO

		if (image["type"] !== "image/jpeg" && image["type"] !== "image/png") {

			$("#image").val("");
			$(".previsualizationImg").attr("src", "")

			//put alert

			return;

		}else if(image["size"] > 2000000){

			$("#image").val("");
			$(".previsualizationImg").attr("src", "")

			//put alert
			
			return;
		}else{

			let fileData = new FileReader();

			fileData.readAsDataURL(image);
			$(fileData).on("load", function(event){

				let fileRoute = event.target.result;
				
				$(".previsualizationImg").attr("src", fileRoute)

				$("#title").prop("disabled",false)
				$("#intro").prop("disabled",false)
				$("#url").prop("disabled",false)

				createBlog({

					'image': image,
					'title': $("#title").val(),
					'intro': $("#intro").val(),
					'url': $("#url").val()
				})
			})

		}
	}

	/*=============================================
	OnSubmit
	=============================================*/

	const submit = async e=>{

		$('.alert').remove();

		e.preventDefault();

		const {image, title, intro, url} = blog;

		/*VALIDAMOS SI NO VIENE LA IMAGEN*/
		if(image === null){

			$(".invalid-image").show()
			$(".invalid-image").html("La imagen no puede ir vacia")
			return;
		}

		/*VALIDAMOS SI NO VIENE EL  TITULO, INTRO Y URL*/
		if(title === ""){

			$(".invalid-title").show()
			$(".invalid-title").html("El titulo del blog no puede ir vacio")
			return;
		}
		if(intro === ""){

			$(".invalid-intro").show()
			$(".invalid-intro").html("La intro no puede ir vacio")
			return;
		}
		if(url === ""){

			$(".invalid-url").show()
			$(".invalid-url").html("La url no puede ir vacia")
			return;
		}

		/*VALIDAMOS EXPRESION REGULAR DEL  TITULO, INTRO Y URL*/
		if(title !== ""){

			const expTitle = /^([0-9a-zA-Z ]).{1,40}$/;

			if(!expTitle.test(title)){

				$(".invalid-title").show()
				$(".invalid-title").html("El titulo debe tener solo texto")
				return;
			}
		}
		if(intro !== ""){

			const expintro = /^([0-9a-zA-Z ]).{1,100}$/;

			if(!expintro.test(intro)){

				$(".invalid-intro").show()
				$(".invalid-intro").html("La intro debe tener solo texto")
				return;
			}
		}
		if(url !== ""){

			const expUrl = /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/;

			if(!expUrl.test(url)){

				$(".invalid-url").show()
				$(".invalid-url").html("La url debe esta en el formato solicitado")
				return;
			}
		}

		/*=============================================
		EJECUTAR SERVICIO POST
		=============================================*/
		
		const result = await postData(blog)
		
		if(result.status === 400){

			$(".modal-footer").before(`<div class="alert alert-danged">${result.msg}</div>`);
		}

		if(result.status === 200){

			$(".modal-footer").before(`<div class="alert alert-success">${result.msg}</div>`);
			$('button[type="submit"]').remove();

			setTimeout(()=>{window.location.href = "/blogs"},3000)
		}

	}

	$(document).on("click", ".cleanForm", function(){

	 	$(".modal").find('form')[0].reset();
	 	$(".previsualizationImg").attr("src","")
	})

	/*=============================================
	RETORNO DE LA VISTA
	=============================================*/

	return(

		<div className="modal fade" id="createBlog">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">

					<div className="modal-header">
						<h4 className="modal-title">Create Blog</h4>
						<button type="button" className="close" data-dismiss="modal">&times;</button>
					</div>

					<form onChange={digitForm} onSubmit={submit} encType="multipart/form-data">
						<div className="modal-body">

							<div className="form-goup">
								
								<label className="small text-secondary" htmlFor="image">*La imagen debe ser formato jpg o png | Max 2MB</label>

								<input 
									id="image"
									type="file" 
									className="form-control-file border" 
									name="image" 
									required
								/>

								<div className="invalid-feedback invalid-image"></div>
								<img alt="" className="mt-2 previsualizationImg img-fluid"/>

							</div>
							<div className="form-goup">
								
								<label className="small text-secondary" htmlFor="title">*Ingresar solo texto</label>

								<div className="input-group mb-3">
										
									<div className="input-group-append input-group-text">
										<i className="fas fa-heading"></i>
									</div>

									<input 
										id="title" 
										type="text" 
										className="form-control" 
										name="title" 
										placeholder="Ingrese el titulo del blog*"
										pattern="([0-9a-zA-Z ]).{1,}"
										disabled 
										required
									/>


									<div className="invalid-feedback invalid-title"></div>
								</div>

							</div>
							<div className="form-goup">
								
								<label className="small text-secondary" htmlFor="intro">*Ingresar solo texto</label>

								<div className="input-group mb-3">
										
									<div className="input-group-append input-group-text">
										<i className="fas fa-paragraph"></i>
									</div>

									<input 
										id="intro" 
										type="text" 
										className="form-control" 
										name="intro" 
										placeholder="Ingrese la intro del blog*"
										pattern="([0-9a-zA-Z ]).{1,}"
										disabled 
										required
									/>


									<div className="invalid-feedback invalid-intro"></div>
								</div>

							</div>
							<div className="form-goup">
								
								<label className="small text-secondary" htmlFor="url">*Ingresar solo texto</label>

								<div className="input-group mb-3">
										
									<div className="input-group-append input-group-text">
										<i className="fas fa-link"></i>
									</div>

									<input 
										id="url" 
										type="text" 
										className="form-control" 
										name="url" 
										placeholder="Ingrese la url del blog*"
										disabled 
										required
									/>


									<div className="invalid-feedback invalid-url"></div>
								</div>

							</div>

						</div>

						<div className="modal-footer">
							<button type="button" className="btn btn-outline-danger" data-dismiss="modal">Close</button>
							<button type="submit" className="btn btn-outline-primary">Save changes</button>
						</div>
					</form>

				</div>
			</div>
		</div>

	)
}

/*=============================================
PETICION POST
=============================================*/

const postData = data =>{

	const url = `${apiRoute}/create-blog`
	const token = localStorage.getItem("ACCESS_TOKEN")

	let formData = new FormData();

	formData.append("image", data.image);
	formData.append("title", data.title);
	formData.append("intro", data.intro);
	formData.append("url", data.url);

	const params = {

		method: "POST",
		body: formData,
		headers: {

			"Authorization": token,
		}

	}

	return fetch(url, params).then(response =>{

		return response.json()
	}).then(result =>{

		return result
	}).catch(err =>{

		return err
	})
}