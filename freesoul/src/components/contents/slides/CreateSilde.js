import React, {useState} from 'react';
import {apiRoute} from '../../../config/Config';
import $ from 'jquery';
import Swal from 'sweetalert2';

export default function CreateSlide(){

	/*=============================================
	HOOK PARA CAPTURAR DATOS
	=============================================*/
	
	const [slide, createSlide] = useState({

		image: null,
		position: ""
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

				$("#position").prop("disabled",false)


				createSlide({

					'image': image,
					'position': $("#position").val()
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

		const {image, position} = slide;

		/*VALIDAMOS SI NO VIENE LA IMAGEN*/
		if(image === null){

			$(".invalid-image").show()
			$(".invalid-image").html("The image id required")
			return;
		}

		/*VALIDAMOS SI NO VIENE LA POSICION*/
		if(position === ""){

			$(".invalid-position").show()
			$(".invalid-position").html("The position id required")
			return;
		}

		/*VALIDAMOS EXPRESION REGULAR DE LA POSICION*/
		if(position !== ""){

			const expPosition = /^[0-9]+$/;

			if(!expPosition.test(position)){

				$(".invalid-position").show()
				$(".invalid-position").html("Incorrect format")
				return;
			}
		}

		/*=============================================
		EJECUTAR SERVICIO POST
		=============================================*/
		
		const result = await postData(slide)
		
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

	$(document).on("click", ".cleanForm", function(){

		$(".modal").find('form')[0].reset();
		$(".previsualizationImg").attr("src","")
	})

	/*=============================================
	RETORNO DE LA VISTA
	=============================================*/

	return(

		<div className="modal fade" id="createSlide">
			<div className="modal-dialog modal-dialog-centered modal-lg">
				<div className="modal-content">

					<div className="modal-header">
						<h4 className="modal-title">Create Slide</h4>
						<button type="button" className="close" data-dismiss="modal">&times;</button>
					</div>

					<form onChange={digitForm} onSubmit={submit} encType="multipart/form-data">
						<div className="modal-body">

							<div className="form-goup mb-3">
								
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
								<div className="row g-3 align-items-center mb-3">
									<div className="col-lg-2">
										<label className="col-form-label" htmlFor="position">Position:</label>
									</div>
									<div className="col-lg-7">
										<div className="input-group">
											<div className="input-group-append input-group-text">
												<i className="far fa-dot-circle"></i>
											</div>
											<input 
												id="position" 
												type="text" 
												className="form-control" 
												name="position" 
												placeholder="Ingrese la posicion*"
												min="1"
												maxLength="1"
												pattern="[0-9]{1}"
												disabled 
												required
											/>
										</div>
									</div>

									<div className="col-lg-3">
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
PETICION POST
=============================================*/

const postData = data =>{

	const url = `${apiRoute}/create-slide`
	const token = localStorage.getItem("ACCESS_TOKEN")

	let formData = new FormData();

	formData.append("picture", data.image);
	formData.append("position", data.position);

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
