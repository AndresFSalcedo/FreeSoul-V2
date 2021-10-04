import React, {useState} from 'react';
import {apiRoute} from '../../../../config/Config';
import $ from 'jquery';
import Swal from 'sweetalert2';

export default function EditDeleteSlide(){

	/*=============================================
	HOOK PARA CAPTURAR DATOS
	=============================================*/
	
	const [slide, editSlide] = useState({

		image: null,
		position: "",
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

					editSlide({

						'image': image,
						'position': $("#newPosition").val(),
						'id': $("#editId").val()
					})
				})

			}
		}else{

			editSlide({

				'image': null,
				'position': $("#newPosition").val(),
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

		const {position} = slide;

		/*VALIDAMOS SI NO VIENE LA POSICION*/
		if(position === ""){

			$(".invalid-position").show()
			$(".invalid-position").html("The position is required")
			return;
		}

		/*VALIDAMOS EXPRESION REGULAR DE LA POSICION*/
		if(position !== ""){

			const expPosition = /^[0-9]$/;

			if(!expPosition.test(position)){

				$(".invalid-position").show()
				$(".invalid-position").html("Incorrect format")
				return;
			}
		}

		
		/*=============================================
		EJECUTAR SERVICIO PUT
		=============================================*/

		const result = await putData(slide)

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

			setTimeout(()=>{window.location.href = "/slides"},2000)
		}
	}

	/*=============================================
	Captura data a editar
	=============================================*/
	
	$(document).on("click",".inputsEdit", function(e){

		e.preventDefault();

		let data = $(this).attr("data").split(',');

		$('#editId').val(data[0]);
		$('.previsualizationImg').attr("src", `${apiRoute}/show-slideImg/${data[1]}`);
		$('#newPosition').val(parseInt(data[2]));

		editSlide({

			'image': null,
			'position': parseInt(data[2]),
			'id': data[0]

		})
	})

	/*=============================================
	Captura data a borrar
	=============================================*/
	
	$(document).on("click",".slideDelete", function(e){

		e.preventDefault();

		let data = $(this).attr("data").split(',')[0];

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
			  	
			  	const slideDelete = async ()=>{

			  		const result = await deleteData(data);

			  		if(result.status === 400){

			  			Swal.fire({

			  				icon:"error",
					     	title: result.msg,
					     	showConfirmButton: true,
					     	confirmButtonText: "Cerrar"

			  			}).then(function(result){

			  				if(result.value){

			  					window.location.href="/slides"
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

			  					window.location.href="/slides"
			  				}

			  			})
			  		}
			  	}

		    	slideDelete();
		  	}
		})

	})

	/*=============================================
	RETORNO DE LA VISTA
	=============================================*/
	return(

		<div className="modal fade" id="editSlide">
			<div className="modal-dialog modal-dialog-centered modal-lg">
				<div className="modal-content">

					<div className="modal-header">
						<h4 className="modal-title">Edit Slide</h4>
						<button type="button" className="close" data-dismiss="modal">&times;</button>
					</div>

					<form onChange={editForm} onSubmit={submitPut} encType="multipart/form-data">
						<div className="modal-body">

						<input type="hidden" id="editId"/>

							<div className="form-goup mb-3">
								
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

							<div className="form-goup ">
								<div className="row g-3 align-items-center mb-3">

									<div className="col-lg-2">
										<label className="col-form-label" htmlFor="newPosition">Position:</label>
									</div>
									
									<div className="col-lg-8">
										<div className="input-group">
											<div className="input-group-append input-group-text">
												<i className="far fa-dot-circle"></i>
											</div>
											<input 
												id="newPosition" 
												type="text" 
												className="form-control" 
												name="newPosition" 
												placeholder="*"
												min="1"
												maxLength="1"
												pattern="[0-9]{1}" 
												required
											/>
										</div>
									</div>

									<div className="col-lg-2">
										<div className="small text-secondary">*Numbers only</div>
									</div>

									<div className="invalid-feedback invalid-position"></div>
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
PETICION PUT
=============================================*/

const putData = data =>{

	const url = `${apiRoute}/edit-slide/${data.id}`
	const token = localStorage.getItem("ACCESS_TOKEN")

	let formData = new FormData();

	formData.append("file", data.image);
	formData.append("position", data.position);

	

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

	const url = `${apiRoute}/delete-slide/${data}`

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