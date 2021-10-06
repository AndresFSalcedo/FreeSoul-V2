import React, {useState} from 'react';
import {apiRoute} from '../../../../config/Config';
import $ from 'jquery';
import Swal from 'sweetalert2';

export default function EditDeleteStock(){

	/*=============================================
	HOOK PARA CAPTURAR DATOS
	=============================================*/
	
	const [stock, editStock] = useState({

		productType: "",
		design: "",
		codColor: "",
		price: "",
		S: "",
		M: "",
		L: "",
		XL: "",
		id:""
	})

	/*=============================================
	OnChange
	=============================================*/
	
	const digitForm = e =>{

		editStock({

			...stock,
			[e.target.name] : e.target.value
		})
	}

	/*=============================================
	OnSubmit
	=============================================*/

	const submit = async e=>{

		$('.alert').remove();

		e.preventDefault();

		const {productType, design, codColor, price, S, M, L, XL} = stock;

		//VALIDAR PRODUCTTYPE
		if(productType === ""){

			$(".invalid-productType").show();
			$(".invalid-productType").html("Completa este campo");
			return;
		}

		const expProductType = /^[A-Za-z]+$/

		if(!expProductType.test(productType)){

			$(".invalid-productType").show();
			$(".invalid-productType").html("Utiliza el formato solicitado");
			return;
		}

		//VALIDAR DESIGN
		if(design === ""){

			$(".invalid-design").show();
			$(".invalid-design").html("Completa este campo");
			return;
		}

		const expDesign = /^[A-Za-z]+$/

		if(!expDesign.test(design)){

			$(".invalid-design").show();
			$(".invalid-design").html("Utiliza el formato solicitado");
			return;
		}

		//VALIDAR COLOR
		if(codColor === ""){

			$(".invalid-codColor").show();
			$(".invalid-codColor").html("Completa este campo");
			return;
		}

		const expCodColor = /^[A-Za-z]+$/

		if(!expCodColor.test(codColor)){

			$(".invalid-codColor").show();
			$(".invalid-codColor").html("Utiliza el formato solicitado");
			return;
		}

		//VALIDAR PRICE
		if(price === ""){

			$(".invalid-price").show();
			$(".invalid-price").html("Completa este campo");
			return;
		}

		const expPrice = /^[0-9]+$/

		if(!expPrice.test(price)){

			$(".invalid-price").show();
			$(".invalid-price").html("Utiliza el formato solicitado");
			return;
		}

		//VALIDAR S SIZE
		if(S === ""){

			$(".invalid-S").show();
			$(".invalid-S").html("Completa este campo");
			return;
		}

		const expS = /^[0-9]+$/

		if(!expS.test(S)){

			$(".invalid-S").show();
			$(".invalid-S").html("Utiliza el formato solicitado");
			return;
		}

		//VALIDAR M SIZE
		if(M === ""){

			$(".invalid-M").show();
			$(".invalid-M").html("Completa este campo");
			return;
		}

		const expM = /^[0-9]+$/

		if(!expM.test(M)){

			$(".invalid-M").show();
			$(".invalid-M").html("Utiliza el formato solicitado");
			return;
		}
			
		//VALIDAR L SIZE
		if(L === ""){

			$(".invalid-L").show();
			$(".invalid-L").html("Completa este campo");
			return;
		}

		const expL = /^[0-9]+$/

		if(!expL.test(L)){

			$(".invalid-L").show();
			$(".invalid-L").html("Utiliza el formato solicitado");
			return;
		}

		//VALIDAR XL SIZE
		if(XL === ""){

			$(".invalid-XL").show();
			$(".invalid-XL").html("Completa este campo");
			return;
		}

		const expXL = /^[0-9]+$/

		if(!expXL.test(XL)){

			$(".invalid-XL").show();
			$(".invalid-XL").html("Utiliza el formato solicitado");
			return;
		}

		/*=============================================
		EJECUTAR SERVICIO PUT
		=============================================*/
		
		const result = await putData(stock)
		
		if(result.status === 400){

			$(".modal-footer").before(`<div class="alert alert-danged">${result.msg}</div>`);
		}

		if(result.status === 200){

			$(".modal-footer").before(`<div class="alert alert-success">${result.msg}</div>`);
			$('button[type="submit"]').remove();

			setTimeout(()=>{window.location.href = "/stocks"},3000)
		}

	}

	/*=============================================
	Captura data a editar
	=============================================*/
	
	$(document).on("click",".editInputs", function(e){

		e.preventDefault();

		let data = $(this).attr("data").split(',');

		$('#editId').val(data[0]);
		$('#newProductType').val(data[1]);
		$('#newDesign').val(data[2]);
		$('#newCodColor').val(data[3]);
		$('#newPrice').val(parseInt(data[4]));
		$('#newS').val(parseInt(data[5]));
		$('#newM').val(parseInt(data[6]));
		$('#newL').val(parseInt(data[7]));
		$('#newXL').val(parseInt(data[8]));

		editStock({

			productType: data[1],
			design: data[2],
			codColor: data[3],
			price: data[4],
			S: data[5],
			M: data[6],
			L: data[7],
			XL: data[8],
			id: data[0]
		})
	})

	/*=============================================
	Captura data a borrar
	=============================================*/
	
	$(document).on("click",".stockDelete", function(e){

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
			  	
			  	const stockDelete = async ()=>{

			  		const result = await deleteData(data);

			  		if(result.status === 400){

			  			Swal.fire({

			  				icon:"error",
					     	title: result.msg,
					     	showConfirmButton: true,
					     	confirmButtonText: "Cerrar"

			  			}).then(function(result){

			  				if(result.value){

			  					window.location.href="/stocks"
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

			  					window.location.href="/stocks"
			  				}

			  			})
			  		}
			  	}

		    	stockDelete();
		  	}
		})

	})

	/*=============================================
	RETORNO DE LA VISTA
	=============================================*/

	return(


		<div className="modal fade" id="editStock">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">

					<div className="modal-header">
						<h4 className="modal-title">Edit Item</h4>
						<button type="button" className="close" data-dismiss="modal">&times;</button>
					</div>

					<form onChange={digitForm} onSubmit={submit}>
						<div className="modal-body">

							<div className="form-goup ">
								<div className="row g-3 align-items-center mb-3">
									<div className="col-lg-2">
										<label className="col-form-label" htmlFor="newProductType">Product Type:</label>
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
												name="productType" 
												placeholder="*"
												pattern="[A-Za-z]+" 
												required
											/>
										</div>
									</div>
									<div className="col-lg-2">
										<div className="small text-secondary">*Letters only</div>
									</div>
									<div className="invalid-feedback invalid-newProductType"></div>
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
												<i className="fas fa-font" style={{"width":"20px"}}></i>
											</div>
											<input 
												id="newDesign" 
												type="text" 
												className="form-control" 
												name="design" 
												placeholder="*"
												pattern="[A-Za-z]+" 
												required
											/>
										</div>
									</div>
									<div className="col-lg-2">
										<div className="small text-secondary">*Letters only</div>
									</div>
									<div className="invalid-feedback invalid-newDesign"></div>
								</div>
							</div>

							<div className="form-goup ">
								<div className="row g-3 align-items-center mb-3">
									<div className="col-lg-2">
										<label className="col-form-label" htmlFor="newCodColor">Color:</label>
									</div>
									<div className="col-lg-8">
										<div className="input-group">
											<div className="input-group-append input-group-text">
												<i className="fas fa-paint-brush" style={{"width":"20px"}}></i>
											</div>
											<input 
												id="newCodColor" 
												type="text" 
												className="form-control text-lowercase" 
												name="codColor" 
												placeholder="*"
												pattern="[A-Za-z]+" 
												required
											/>
										</div>
									</div>
									<div className="col-lg-2">
										<div className="small text-secondary">*Letters only</div>
									</div>
									<div className="invalid-feedback invalid-newCodColor"></div>
								</div>
							</div>

							<div className="form-goup ">
								<div className="row g-3 align-items-center mb-3">
									<div className="col-lg-2">
										<label className="col-form-label" htmlFor="newPrice">Price:</label>
									</div>
									<div className="col-lg-8 ">
										<div className="input-group">
											<div className="input-group-append input-group-text">
												<i className="fas fa-dollar-sign" style={{"width":"20px"}}></i>
											</div>
											<input 
												id="newPrice" 
												type="text" 
												className="form-control" 
												name="price" 
												placeholder="*"
												pattern="[0-9]+" 
												required
											/>
										</div>	
									</div>
									<div className="col-lg-2">
										<div className="small text-secondary">*Numbers only</div>
									</div>
									<div className="invalid-feedback invalid-newPrice"></div>
								</div>
							</div>

							<div className="form-goup ">
								<div className="row g-3 align-items-center mb-3">
									<div className="col-lg-2">
										<label className="col-form-label" htmlFor="newS">S size:</label>
									</div>
									<div className="col-lg-8">
										<div className="input-group">
											<div className="input-group-append input-group-text">
												<i style={{"width":"20px"}}>S</i>
											</div>
											<input 
												id="newS" 
												type="text" 
												className="form-control" 
												name="S" 
												placeholder="*"
												pattern="[0-9]+" 
												required
											/>
										</div>
									</div>
									<div className="col-lg-2">
										<div className="small text-secondary">*Numbers only</div>
									</div>
									<div className="invalid-feedback invalid-newS"></div>
								</div>
							</div>

							<div className="form-goup ">
								<div className="row g-3 align-items-center mb-3">
									<div className="col-lg-2">
										<label className="col-form-label" htmlFor="newM">M size:</label>
									</div>
									<div className="col-lg-8">
										<div className="input-group">
											<div className="input-group-append input-group-text">
												<i style={{"width":"20px"}}>M</i>
											</div>
											<input 
												id="newM" 
												type="text" 
												className="form-control" 
												name="M" 
												placeholder="*"
												pattern="[0-9]+" 
												required
											/>
										</div>
									</div>
									<div className="col-lg-2">
										<div className="small text-secondary">*Numbers only</div>
									</div>
									<div className="invalid-feedback invalid-newM"></div>
								</div>
							</div>

							<div className="form-goup ">
								<div className="row g-3 align-items-center mb-3">
									<div className="col-lg-2">
										<label className="col-form-label" htmlFor="newL">L size:</label>
									</div>
									<div className="col-lg-8">
										<div className="input-group">
											<div className="input-group-append input-group-text">
												<i style={{"width":"20px"}}>L</i>
											</div>
											<input 
												id="newL" 
												type="text" 
												className="form-control" 
												name="L" 
												placeholder="*"
												pattern="[0-9]+" 
												required
											/>
										</div>
									</div>
									<div className="col-lg-2">
										<div className="small text-secondary">*Numbers only</div>
									</div>
									<div className="invalid-feedback invalid-newL"></div>
								</div>
							</div>

							<div className="form-goup ">
								<div className="row g-3 align-items-center mb-3">
									<div className="col-lg-2">
										<label className="col-form-label" htmlFor="newXL">XL size:</label>
									</div>
									<div className="col-lg-8">
									<div className="input-group">
											<div className="input-group-append input-group-text">
												<i style={{"width":"20px"}}>XL</i>
											</div>
											<input 
												id="newXL" 
												type="text" 
												className="form-control" 
												name="XL" 
												placeholder="*"
												pattern="[0-9]+" 
												required
											/>
										</div>
									</div>
									<div className="col-lg-2">
										<div className="small text-secondary">*Numbers only</div>
									</div>
									<div className="invalid-feedback invalid-newXL"></div>
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

	const url = `${apiRoute}/edit-stock/${data.id}`
	const token = localStorage.getItem("ACCESS_TOKEN")
	const params = {

		method: "PUT",
		body:JSON.stringify(data),
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

	const url = `${apiRoute}/delete-stock/${data}`

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