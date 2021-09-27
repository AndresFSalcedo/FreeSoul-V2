import React, {useState} from 'react';
import {apiRoute} from '../../../config/Config';
import $ from 'jquery';
import Swal from 'sweetalert2';

export default function EditDeleteBlog(){

	/*=============================================
	HOOK PARA CAPTURAR DATOS
	=============================================*/
	
	const [blog, editBlog] = useState({

		image: null,
		title: "",
		intro: "",
		url: "",
		id:""
	})

	/*=============================================
	OnChange
	=============================================*/
	
	const editForm = e =>{

		if($("#editImage").val()){

			let image = $("#editImage").get(0).files[0]

			//VALIDAR LA EXTENSION DEL ARCHIVO

			if (image["type"] !== "image/jpeg" && image["type"] !== "image/png") {

				$("#editImage").val("");
				$(".previsualizationImg").attr("src", "")

				//put alert

				return;

			}else if(image["size"] > 2000000){

				$("#editImage").val("");
				$(".previsualizationImg").attr("src", "")

				//put alert

				return;
			}else{

				let fileData = new FileReader();

				fileData.readAsDataURL(image);
				$(fileData).on("load", function(event){

					let fileRoute = event.target.result;
					
					$(".previsualizationImg").attr("src", fileRoute)

					editBlog({

						'image': image,
						'title': $("#newTitle").val(),
						'intro': $("#newIntro").val(),
						'url': $("#newUrl").val(),
						'id': $("#editId").val()
					})
				})

			}
		}else{

			editBlog({

				'image': null,
				'title': $("#newTitle").val(),
				'intro': $("#newIntro").val(),
				'url': $("#newUrl").val(),
				'id': $("#editId").val()
			})

		}
	}

	/*=============================================
	OnSubmit
	=============================================*/

	const submitPut = async e=>{

		$('.alert').remove();

		e.preventDefault();

		const {title, intro, url} = blog;

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
		EJECUTAR SERVICIO PUT
		=============================================*/

		const result = await putData(blog)

		if(result.status === 400){

			$(".modal-footer").before(`<div class="alert alert-danged">${result.msg}</div>`);
		}

		if(result.status === 200){

			$(".modal-footer").before(`<div class="alert alert-success">${result.msg}</div>`);
			$('button[type="submit"]').remove();

			setTimeout(()=>{window.location.href = "/blogs"},3000)
		}
	}

	/*=============================================
	Captura data a editar
	=============================================*/
	
	$(document).on("click",".inputsEdit", function(e){

		e.preventDefault();

		let data = $(this).attr("data").split('_,');

		$('#editId').val(data[0]);
		$('.previsualizationImg').attr("src", `${apiRoute}/show-blogImg/${data[1]}`);
		$("#newTitle").val(data[2]);
		$("#newIntro").val(data[3]);
		$("#newUrl").val(data[4]);

		editBlog({

			'image': null,
			'title': data[2],
			'intro': data[3],
			'url': data[4],
			'id': data[0]
		})
	})

	/*=============================================
	Captura data a borrar
	=============================================*/
	
	$(document).on("click",".blogDelete", function(e){

		e.preventDefault();

		let data = $(this).attr("data").split('_,')[0];
		console.log("data", data);

		/*PREGUNTAR SI ESTA SEGUR@*/

		Swal.fire({
			title: 'Are you sure?',
		  	text: "You won't be able to revert this!",
		  	icon: 'warning',
		  	showCancelButton: true,
		  	confirmButtonColor: '#3085d6',
		  	cancelButtonColor: '#d33',
		  	confirmButtonText: 'Yes, delete it!'

		}).then((result) => {

		 	if (result.isConfirmed) {

			  	/*=============================================
			  	EJECUTAR SERVICIO DELETE
			  	=============================================*/
			  	
			  	const blogDelete = async ()=>{

			  		const result = await deleteData(data);

			  		if(result.status === 400){

			  			Swal.fire({

			  				icon:"error",
					     	title: result.msg,
					     	showConfirmButton: true,
					     	confirmButtonText: "Cerrar"

			  			}).then(function(result){

			  				if(result.value){

			  					window.location.href="/blogs"
			  				}

			  			})
			  		}

			  		if(result.status === 200){

			  			Swal.fire({

			  				icon:"success",
					     	title: result.msg,
					     	showConfirmButton: true,
					     	confirmButtonText: "Cerrar"

			  			}).then(function(result){

			  				if(result.value){

			  					window.location.href="/blogs"
			  				}

			  			})
			  		}
			  	}

		    	blogDelete();
		  	}
		})
	})

	/*=============================================
	RETORNO DE LA VISTA
	=============================================*/
	return(

		<div className="modal fade" id="editBlog">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">

					<div className="modal-header">
						<h4 className="modal-title">Edit Blog</h4>
						<button type="button" className="close" data-dismiss="modal">&times;</button>
					</div>

					<form onChange={editForm} onSubmit={submitPut} encType="multipart/form-data">
						<div className="modal-body">

						<input type="hidden" id="editId"/>

							<div className="form-goup">
								
								<label className="small text-secondary" htmlFor="editImage">*La imagen debe ser formato jpg o png | Max 2MB</label>

								<input 
									id="editImage"
									type="file" 
									className="form-control-file border" 
									name="editImage" 
								/>

								<div className="invalid-feedback invalid-image"></div>
								<img alt="" className="mt-2 previsualizationImg img-fluid"/>

							</div>
							<div className="form-goup">
								
								<label className="small text-secondary" htmlFor="newTitle">*Ingresar solo texto</label>

								<div className="input-group mb-3">
										
									<div className="input-group-append input-group-text">
										<i className="fas fa-heading"></i>
									</div>

									<input 
										id="newTitle" 
										type="text" 
										className="form-control" 
										name="newTitle" 
										placeholder="Ingrese el titulo del blog*"
										pattern="([0-9a-zA-Z ]).{1,}"
										required
									/>


									<div className="invalid-feedback invalid-title"></div>
								</div>

							</div>
							<div className="form-goup">
								
								<label className="small text-secondary" htmlFor="newIntro">*Ingresar solo texto</label>

								<div className="input-group mb-3">
										
									<div className="input-group-append input-group-text">
										<i className="fas fa-paragraph"></i>
									</div>

									<input 
										id="newIntro" 
										type="text" 
										className="form-control" 
										name="newIntro" 
										placeholder="Ingrese la intro del blog*"
										pattern="([0-9a-zA-Z ]).{1,}"
										required
									/>


									<div className="invalid-feedback invalid-intro"></div>
								</div>

							</div>
							<div className="form-goup">
								
								<label className="small text-secondary" htmlFor="newUrl">*Ingresar solo texto</label>

								<div className="input-group mb-3">
										
									<div className="input-group-append input-group-text">
										<i className="fas fa-link"></i>
									</div>

									<input 
										id="newUrl" 
										type="text" 
										className="form-control" 
										name="newUrl" 
										placeholder="Ingrese la url del blog*"
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
PETICION PUT
=============================================*/

const putData = data =>{

	const url = `${apiRoute}/edit-blog/${data.id}`
	const token = localStorage.getItem("ACCESS_TOKEN")

	let formData = new FormData();

	formData.append("file", data.image);
	formData.append("title", data.title);
	formData.append("intro", data.intro);
	formData.append("url", data.url);

	const params = {

		method: "PUT",
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

/*=============================================
PETICION DELETE
=============================================*/

const deleteData = data =>{

	const url = `${apiRoute}/delete-blog/${data}`

	const token = localStorage.getItem("ACCESS_TOKEN")
	const params = {

		method: "DELETE",
		headers: {

			"Authorization": token,
			"Content-Type": "application/json"
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