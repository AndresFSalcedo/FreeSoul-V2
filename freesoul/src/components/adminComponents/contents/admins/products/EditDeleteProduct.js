import React, {useState} from 'react';
import {apiRoute} from '../../../../../config/Config';
import $ from 'jquery';
import Swal from 'sweetalert2';

export default function EditDeleteProduct(){

	/*=============================================
	HOOK PARA CAPTURAR DATOS
	=============================================*/
	
	const [item, editProduct] = useState({

		product: "",
		id: ""
	})

	/*=============================================
	OnChange
	=============================================*/
	
	const editForm = e =>{

		editProduct({

			...item,
			[e.target.name] : e.target.value
		})
	}

	/*=============================================
	OnSubmit
	=============================================*/

	const submitPut = async e=>{

		$('.alert').remove();

		e.preventDefault();

		const {product} = item;

		//VALIDAR PRODUCT

		if (product === "") {

			$(".invalid-product").show();
			$(".invalid-product").html("The product name is required");
			return;
		}

		const expProduct = /^[A-Za-z]+$/

		if(!expProduct.test(product)){

			$(".invalid-product").show();
			$(".invalid-product").html("Incorrect format");
			return;
		}

		console.log("item", item);
		/*=============================================
		EJECUTAR SERVICIO PUT
		=============================================*/

		const result = await putData(item)
		

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

			setTimeout(()=>{window.location.href = "/admins&products"},2000)
		}
	}

	/*=============================================
	Captura data a editar
	=============================================*/
	
	$(document).on("click",".inputEdit", function(e){

		e.preventDefault();

		let data = $(this).attr("data").split(',');

		$('#editId').val(data[0]);
		$('#newProduct').val(data[1]);

		editProduct({

			product: data[1],
			id: data[0]
		})
	})

	/*=============================================
	Captura data a borrar
	=============================================*/
	
	$(document).on("click",".productDelete", function(e){

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

			  					window.location.href="/admins&products"
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

			  					window.location.href="/admins&products"
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

		<div className="modal fade" id="editProduct">

			<div className="modal-dialog modal-dialog-centered">

				<div className="modal-content">

					<div className="modal-header">
						<h4 className="modal-title">Edit Item</h4>
						<button type="button" className="close" data-dismiss="modal">&times;</button>
					</div>

					<form onChange={editForm} onSubmit={submitPut}>
						
						<div className="modal-body">

							<div className="form-goup ">
								<div className="row g-3 align-items-center mb-3">
									<div className="col-lg-2">
										<label className="col-form-label" htmlFor="newProduct">Product Name:</label>
									</div>
									<div className="col-lg-8">
										<div className="input-group">
											<div className="input-group-append input-group-text">
												<i className="fas fa-tshirt"></i>
											</div>
											<input 
												id="newProduct" 
												type="text" 
												className="form-control" 
												name="product" 
												placeholder="*"
												pattern="[A-Za-z]+" 
												required
											/>
										</div>
									</div>
									<div className="col-lg-2">
										<div className="small text-secondary">*Letters only</div>
									</div>
									<div className="invalid-feedback invalid-newProduct"></div>
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

	const url = `${apiRoute}/edit-product/${data.id}`
	const token = localStorage.getItem("ACCESS_TOKEN")

	const params = {

		method: "PUT",
		body: JSON.stringify(data),
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

/*=============================================
PETICION DELETE
=============================================*/

const deleteData = data =>{

	const url = `${apiRoute}/delete-product/${data}`

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