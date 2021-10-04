import React, {useState} from 'react';
import {apiRoute} from '../../../../config/Config';
import $ from 'jquery';
import Swal from 'sweetalert2';

export default function EditDeletePicture(){

	/*=============================================
	HOOK PARA CAPTURAR DATOS
	=============================================*/
	
	const [picture, editPicture] = useState({

		image: null,
		productType: "",
		design: "",
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

					editPicture({

						'image': image,
						'productType': $("#newProductType").val(),
						'design': $("#newDesign").val(),
						'id': $("#editId").val()
					})
				})

			}
		}else{

			editPicture({

				'image': null,
				'productType': $("#newProductType").val(),
				'design': $("#newDesign").val(),
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

		const {productType, design} = picture;

		/*VALIDAMOS SI NO VIENE EL PRODUCTO Y DISEÑO*/
		if(productType === ""){

			$(".invalid-productType").show()
			$(".invalid-productType").html("The product type id required")
			return;
		}
		if(design === ""){

			$(".invalid-design").show()
			$(".invalid-design").html("The design id required")
			return;
		}

		/*VALIDAMOS EXPRESION REGULAR DEL PRODUCTO Y DISEÑO*/
		if(productType !== ""){

			const expProductType = /^[A-Za-z]+$/;

			if(!expProductType.test(productType)){

				$(".invalid-productType").show()
				$(".invalid-productType").html("Incorrect format")
				return;
			}
		}
		if(design !== ""){

			const expDesign = /^[A-Za-z]+$/;

			if(!expDesign.test(design)){

				$(".invalid-design").show()
				$(".invalid-design").html("Incorrect format")
				return;
			}
		}

		
		/*=============================================
		EJECUTAR SERVICIO PUT
		=============================================*/

		const result = await putData(picture)

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

			setTimeout(()=>{window.location.href = "/pictures"},2000)
		}
	}

	/*=============================================
	Captura data a editar
	=============================================*/
	
	$(document).on("click",".inputsEdit", function(e){

		e.preventDefault();

		let data = $(this).attr("data").split(',');

		$('#editId').val(data[0]);
		$('.previsualizationImg').attr("src", `${apiRoute}/show-pictureImg/${data[1]}`);
		$('#newProductType').val(data[2]);
		$('#newDesign').val(data[3]);

		editPicture({

			'image': null,
			'productType': data[2],
			'design': data[3],
			'id': data[0]

		})
	})

	/*=============================================
	Captura data a borrar
	=============================================*/
	
	$(document).on("click",".pictureDelete", function(e){

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
			  	
			  	const pictureDelete = async ()=>{

			  		const result = await deleteData(data);

			  		if(result.status === 400){

			  			Swal.fire({

			  				icon:"error",
					     	title: result.msg,
					     	showConfirmButton: true,
					     	confirmButtonText: "Cerrar"

			  			}).then(function(result){

			  				if(result.value){

			  					window.location.href="/pictures"
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

			  					window.location.href="/pictures"
			  				}

			  			})
			  		}
			  	}

		    	pictureDelete();
		  	}
		})

	})

	/*=============================================
	RETORNO DE LA VISTA
	=============================================*/
	return(

		<div className="modal fade" id="editPicture">
			<div className="modal-dialog modal-dialog-centered modal-lg">
				<div className="modal-content">

					<div className="modal-header">
						<h4 className="modal-title">Edit Picture</h4>
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
										<label className="col-form-label" htmlFor="newProductType">Product type:</label>
									</div>
									
									<div className="col-lg-8">
										<div className="input-group">
											<div className="input-group-append input-group-text">
												<i className="fas fa-tshirt"></i>
											</div>
											<input 
												id="newProductType" 
												type="text" 
												className="form-control" 
												name="newProductType" 
												placeholder="Ingrese tipo de producto*"
												pattern="[A-Za-z]+"
												required
											/>
										</div>
									</div>

									<div className="col-lg-2">
										<div className="small text-secondary">*Letters only</div>
									</div>

									<div className="invalid-feedback invalid-productType"></div>
								</div>
							</div>

							<div className="form-goup ">
								<div className="row g-3 align-items-center mb-3">

									<div className="col-lg-2">
										<label className="col-form-label" htmlFor="newDesign">Design:</label>
									</div>
									
									<div className="col-lg-8">
										<div className="input-group">
											<div className="input-group-append input-group-text">
												<i className="fas fa-font"></i>
											</div>
											<input 
												id="newDesign" 
												type="text" 
												className="form-control" 
												name="newDesign" 
												placeholder="Ingrese el diseño*"
												pattern="[A-Za-z]+"
												required
											/>
										</div>
									</div>

									<div className="col-lg-2">
										<div className="small text-secondary">*Letters only</div>
									</div>

									<div className="invalid-feedback invalid-design"></div>
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

	const url = `${apiRoute}/edit-picture/${data.id}`
	const token = localStorage.getItem("ACCESS_TOKEN")

	let formData = new FormData();

	formData.append("file", data.image);
	formData.append("productType", data.productType);
	formData.append("design", data.design);

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

	const url = `${apiRoute}/delete-picture/${data}`

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