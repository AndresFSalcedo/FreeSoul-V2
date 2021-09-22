import React, {useState} from 'react';
import {apiRoute} from '../../../config/Config';
import $ from 'jquery';
import notie from 'notie';
import 'notie/dist/notie.css';
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

				notie.alert({
					type: 3,
					text: 'Error: La imagen debe estar en debido formato',
					time: 5
				})

				return;

			}else if(image["size"] > 2000000){

				$("#editImage").val("");
				$(".previsualizationImg").attr("src", "")

				notie.alert({
					type: 3,
					text: 'Error: La imagen debe pesar menos de 2MB',
					time: 5
				})

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

		//const {image, position, id} = slide;
		const {position} = slide;

		/*VALIDAMOS SI NO VIENE LA POSICION*/
		if(position === ""){

			$(".invalid-position").show()
			$(".invalid-position").html("La posicion no puede ir vacia")
			return;
		}

		/*VALIDAMOS EXPRESION REGULAR DE LA POSICION*/
		if(position !== ""){

			const expPosition = /^[0-9]+$/;

			if(!expPosition.test(position)){

				$(".invalid-position").show()
				$(".invalid-position").html("La posicion no puede ir vacia")
				return;
			}
		}

		
		/*=============================================
		EJECUTAR SERVICIO PUT
		=============================================*/

		const result = await putData(slide)

		console.log(result)

		if(result.status === 400){

			$(".modal-footer").before(`<div class="alert alert-danged">${result.msg}</div>`);
		}

		if(result.status === 200){

			$(".modal-footer").before(`<div class="alert alert-success">${result.msg}</div>`);
			$('button[type="submit"]').remove();

			setTimeout(()=>{window.location.href = "slide"},3000)
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
					     	showConfirmationButton: true,
					     	confirmButtonText: "Cerrar"

			  			}).then(function(result){

			  				if(result.value){

			  					window.location.href="/slide"
			  				}

			  			})
			  		}

			  		if(result.status === 200){

			  			Swal.fire({

			  				icon:"success",
					     	title: result.msg,
					     	showConfirmationButton: true,
					     	confirmButtonText: "Cerrar"

			  			}).then(function(result){

			  				if(result.value){

			  					window.location.href="/slide"
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
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">

					<div className="modal-header">
						<h4 className="modal-title">Edit Slide</h4>
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
								
								<label className="small text-secondary" htmlFor="newPosition">*Ingresar un solo numero</label>

								<div className="input-group mb-3">
										
									<div className="input-group-append input-group-text">
										<i className="fas fa-crosshairs"></i>
									</div>

									<input 
										id="newPosition" 
										type="text" 
										className="form-control" 
										name="newPosition" 
										placeholder="Ingrese la posicion*"
										min="1"
										maxLength="1"
										pattern="[0-9]{1}" 
										required
									/>


									<div className="invalid-feedback invalid-position"></div>
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
	console.log("data.id", data);
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