import React, {useState} from 'react';
import {apiRoute} from '../../../../../config/Config';
import $ from 'jquery';
import Swal from 'sweetalert2';

export default function CreateProduct(){

	const [item, createProduct] = useState({

		product: ""
	})

	/*=============================================
	OnChange
	=============================================*/
	
	const digitForm = e =>{

		createProduct({

			...item,
			[e.target.name] : e.target.value
		})
	}

	/*=============================================
	OnSubmit
	=============================================*/

	const submit = async e =>{

		$('.alert').remove();

		e.preventDefault();

		const {product} = item

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

		/*=============================================
		EJECUTAR SERVICIO POST
		=============================================*/
		const result = await postData(item)
		
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
	RETURN THE VIEW
	=============================================*/
	
	return (

		<div className="modal fade" id="createProduct">

			<div className="modal-dialog modal-dialog-centered">

				<div className="modal-content">

					<div className="modal-header">
						<h4 className="modal-title">Create Product</h4>
						<button type="button" className="close" data-dismiss="modal">&times;</button>
					</div>

					<form onChange={digitForm} onSubmit={submit}>
						
						<div className="modal-body">

							<div className="form-goup ">
								<div className="row g-3 align-items-center mb-3">
									<div className="col-lg-2">
										<label className="col-form-label" htmlFor="product">Product Name:</label>
									</div>
									<div className="col-lg-8">
										<div className="input-group">
											<div className="input-group-append input-group-text">
												<i className="fas fa-tshirt"></i>
											</div>
											<input 
												id="product" 
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
									<div className="invalid-feedback invalid-product"></div>
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

	const url = `${apiRoute}/create-product`
	const token = localStorage.getItem("ACCESS_TOKEN")
	const params = {

		method: "POST",
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

