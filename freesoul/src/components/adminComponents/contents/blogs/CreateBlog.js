import React, {useState} from 'react';
import {apiRoute} from '../../../../config/Config';
import $ from 'jquery';
import Swal from 'sweetalert2';

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

			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'File must be .jpg or .png'
			})

			return;

		}else if(image["size"] > 2000000){

			$("#image").val("");
			$(".previsualizationImg").attr("src", "")

			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Size over 2MB'
			})
			
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
			$(".invalid-image").html("The image is required")
			return;
		}

		/*VALIDAMOS SI NO VIENE EL  TITULO, INTRO Y URL*/
		if(title === ""){

			$(".invalid-title").show()
			$(".invalid-title").html("The title is required")
			return;
		}
		if(intro === ""){

			$(".invalid-intro").show()
			$(".invalid-intro").html("The intro is required")
			return;
		}
		if(url === ""){

			$(".invalid-url").show()
			$(".invalid-url").html("The instagram url is required")
			return;
		}

		/*VALIDAMOS EXPRESION REGULAR DEL  TITULO, INTRO Y URL*/
		if(title !== ""){

			const expTitle = /^([0-9a-zA-Z ]).{1,40}$/;

			if(!expTitle.test(title)){

				$(".invalid-title").show()
				$(".invalid-title").html("The title is not in the correct format")
				return;
			}
		}
		if(intro !== ""){

			const expintro = /^([0-9a-zA-Z ]).{1,100}$/;

			if(!expintro.test(intro)){

				$(".invalid-intro").show()
				$(".invalid-intro").html("The intro is not in the correct format")
				return;
			}
		}
		if(url !== ""){

			const expUrl = /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/;

			if(!expUrl.test(url)){

				$(".invalid-url").show()
				$(".invalid-url").html("The instagram url is not in the correct format")
				return;
			}
		}

		/*=============================================
		EJECUTAR SERVICIO POST
		=============================================*/
		
		const result = await postData(blog)
		
		if(result.status === 400){

			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: `${result.msg}`
			})
		}

		if(result.status === 200){

			Swal.fire({
				icon: 'success',
				title: 'Success',
				text: `${result.msg}`
			})
			$('button[type="submit"]').remove();

			setTimeout(()=>{window.location.href = "/blogs"},2000)
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
			<div className="modal-dialog modal-dialog-centered modal-lg">
				<div className="modal-content">

					<div className="modal-header">
						<h4 className="modal-title">Create Blog</h4>
						<button type="button" className="close" data-dismiss="modal">&times;</button>
					</div>

					<form onChange={digitForm} onSubmit={submit} encType="multipart/form-data">
						<div className="modal-body">

							<div className="form-goup mb-3">
								
								<label className="small text-secondary" htmlFor="image">*Image size max 2MB and .jpg or .png</label>

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
							
							<div className="form-goup ">
								<div className="row g-3 align-items-center mb-3">

									<div className="col-lg-1">
										<label className="col-form-label" htmlFor="title">Title:</label>
									</div>
									
									<div className="col-lg-7">
										<div className="input-group">
											<div className="input-group-append input-group-text">
												<i className="fas fa-heading"></i>
											</div>
											<input 
												id="title" 
												type="text" 
												className="form-control" 
												name="title" 
												placeholder="*"
												pattern="([0-9a-zA-Z ]).{1,40}"
												disabled 
												required
											/>
										</div>
									</div>

									<div className="col-lg-4">
										<div className="small text-secondary">*Max 40 characters, letters and numbers</div>
									</div>

									<div className="invalid-feedback invalid-title"></div>
								</div>
							</div>


							<div className="form-goup ">
								<div className="row g-3 align-items-center mb-3">

									<div className="col-lg-1">
										<label className="col-form-label" htmlFor="intro">Intro:</label>
									</div>
									
									<div className="col-lg-7">
										<div className="input-group">
											<div className="input-group-append input-group-text">
												<i className="fas fa-font"></i>
											</div>
											<input 
												id="intro" 
												type="text" 
												className="form-control" 
												name="intro" 
												placeholder="*"
												pattern="([0-9a-zA-Z ]).{1,100}"
												disabled 
												required
											/>
										</div>
									</div>

									<div className="col-lg-4">
										<div className="small text-secondary">*Max 100 characters, letters and numbers</div>
									</div>

									<div className="invalid-feedback invalid-intro"></div>
								</div>
							</div>


							<div className="form-goup ">
								<div className="row g-3 align-items-center mb-3">

									<div className="col-lg-1">
										<label className="col-form-label" htmlFor="url">URL:</label>
									</div>
									
									<div className="col-lg-7">
										<div className="input-group">
											<div className="input-group-append input-group-text">
												<i className="fas fa-link"></i>
											</div>
											<input 
												id="url" 
												type="text" 
												className="form-control" 
												name="url" 
												placeholder="*"
												disabled 
												required
											/>
										</div>
									</div>

									<div className="col-lg-4">
										<div className="small text-secondary">*Instagram URL format</div>
									</div>

									<div className="invalid-feedback invalid-url"></div>
								</div>
							</div>
						</div>

						<div className="modal-footer col-lg-12">
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