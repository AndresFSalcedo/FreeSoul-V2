import React from 'react';
import {apiRoute} from '../../../../config/Config';
import $ from 'jquery';
import Swal from 'sweetalert2';

export default function CreateStock(){

	/*=============================================
	OnSubmit
	=============================================*/

	const submit = async e=>{

		$('.alert').remove();

		e.preventDefault();

		const stock = {

			productType: $("#productType").val(),
			design: $("#design").val(),
			codColor: $("#codColor").val(),
			price: $("#price").val(),
			S: $("#S").val(),
			M: $("#M").val(),
			L: $("#L").val(),
			XL: $("#XL").val()
		}

		const {productType, design, codColor, price, S, M, L, XL} = stock;

		//VALIDAR PRODUCTTYPE
		if(productType === ""){

			$(".invalid-productType").show();
			$(".invalid-productType").html("The product type is required");
			return;
		}

		const expProductType = /^[A-Za-z]+$/

		if(!expProductType.test(productType)){

			$(".invalid-productType").show();
			$(".invalid-productType").html("Incorrect format");
			return;
		}

		//VALIDAR DESIGN
		if(design === ""){

			$(".invalid-design").show();
			$(".invalid-design").html("The design is required");
			return;
		}

		const expDesign = /^[A-Za-z]+$/

		if(!expDesign.test(design)){

			$(".invalid-design").show();
			$(".invalid-design").html("Incorrect format");
			return;
		}

		//VALIDAR COLOR
		if(codColor === ""){

			$(".invalid-codColor").show();
			$(".invalid-codColor").html("The color is required");
			return;
		}

		const expCodColor = /^[A-Za-z]+$/

		if(!expCodColor.test(codColor)){

			$(".invalid-codColor").show();
			$(".invalid-codColor").html("Incorrect format");
			return;
		}

		//VALIDAR PRICE
		if(price === ""){

			$(".invalid-price").show();
			$(".invalid-price").html("The price is required");
			return;
		}

		const expPrice = /^[0-9]+$/

		if(!expPrice.test(price)){

			$(".invalid-price").show();
			$(".invalid-price").html("Incorrect format");
			return;
		}

		//VALIDAR S SIZE
		if(S === ""){

			$(".invalid-S").show();
			$(".invalid-S").html("The S size is required");
			return;
		}

		const expS = /^[0-9]+$/

		if(!expS.test(S)){

			$(".invalid-S").show();
			$(".invalid-S").html("Incorrect format");
			return;
		}

		//VALIDAR M SIZE
		if(M === ""){

			$(".invalid-M").show();
			$(".invalid-M").html("The M size is required");
			return;
		}

		const expM = /^[0-9]+$/

		if(!expM.test(M)){

			$(".invalid-M").show();
			$(".invalid-M").html("Incorrect format");
			return;
		}
			
		//VALIDAR L SIZE
		if(L === ""){

			$(".invalid-L").show();
			$(".invalid-L").html("The L size is required");
			return;
		}

		const expL = /^[0-9]+$/

		if(!expL.test(L)){

			$(".invalid-L").show();
			$(".invalid-L").html("Incorrect format");
			return;
		}

		//VALIDAR XL SIZE
		if(XL === ""){

			$(".invalid-XL").show();
			$(".invalid-XL").html("The XL size is required");
			return;
		}

		const expXL = /^[0-9]+$/

		if(!expXL.test(XL)){

			$(".invalid-XL").show();
			$(".invalid-XL").html("Incorrect format");
			return;
		}

		/*=============================================
		EJECUTAR SERVICIO POST
		=============================================*/
		
		const result = await postData(stock)
		
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

			setTimeout(()=>{window.location.href = "/stocks"},2000)
		}

	}

	//Drop Down menu for products
	const productList = async ()=> {

		const product = await getDataProduct();

		let list = document.getElementById("productType")

		for (let i = 0; i < product.data.length; i++) {

			list.innerHTML += `<option value="${product.data[i].product}">${product.data[i].product}</option>`
		}
	}
	productList();

	$(document).on("click", ".cleanForm", function(){

		$(".modal").find('form')[0].reset();
	})

	/*=============================================
	RETORNO DE LA VISTA
	=============================================*/

	return(

		<div className="modal fade" id="createStock">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">

					<div className="modal-header">
						<h4 className="modal-title">Create Item</h4>
						<button type="button" className="close" data-dismiss="modal">&times;</button>
					</div>

					<form onSubmit={submit}>
						<div className="modal-body">
							<div className="form-goup ">
								<div className="row g-3 align-items-center mb-3">
									<div className="col-lg-2">
										<label className="col-form-label" htmlFor="productType">Product Type:</label>
									</div>
									<div className="col-lg-8">
										<div className="input-group">
											<div className="input-group-append input-group-text">
												<i className="fas fa-tshirt"></i>
											</div>
											<select className="custom-select" id="productType">
												
											</select>
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
										<label className="col-form-label" htmlFor="design">Design:</label>
									</div>
									<div className="col-lg-8">
										<div className="input-group">
											<div className="input-group-append input-group-text">
												<i className="fas fa-font" style={{"width":"20px"}}></i>
											</div>
											<input 
												id="design" 
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
									<div className="invalid-feedback invalid-design"></div>
								</div>
							</div>

							<div className="form-goup ">
								<div className="row g-3 align-items-center mb-3">
									<div className="col-lg-2">
										<label className="col-form-label" htmlFor="codColor">Color:</label>
									</div>
									<div className="col-lg-8">
										<div className="input-group">
											<div className="input-group-append input-group-text">
												<i className="fas fa-paint-brush" style={{"width":"20px"}}></i>
											</div>
											<input 
												id="codColor" 
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
									<div className="invalid-feedback invalid-codColor"></div>
								</div>
							</div>

							<div className="form-goup ">
								<div className="row g-3 align-items-center mb-3">
									<div className="col-lg-2">
										<label className="col-form-label" htmlFor="price">Price:</label>
									</div>
									<div className="col-lg-8 ">
										<div className="input-group">
											<div className="input-group-append input-group-text">
												<i className="fas fa-dollar-sign" style={{"width":"20px"}}></i>
											</div>
											<input 
												id="price" 
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
									<div className="invalid-feedback invalid-price"></div>
								</div>
							</div>

							<div className="form-goup ">
								<div className="row g-3 align-items-center mb-3">
									<div className="col-lg-2">
										<label className="col-form-label" htmlFor="S">S size:</label>
									</div>
									<div className="col-lg-8">
										<div className="input-group">
											<div className="input-group-append input-group-text">
												<i style={{"width":"20px"}}>S</i>
											</div>
											<input 
												id="S" 
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
									<div className="invalid-feedback invalid-S"></div>
								</div>
							</div>

							<div className="form-goup ">
								<div className="row g-3 align-items-center mb-3">
									<div className="col-lg-2">
										<label className="col-form-label" htmlFor="M">M size:</label>
									</div>
									<div className="col-lg-8">
										<div className="input-group">
											<div className="input-group-append input-group-text">
												<i style={{"width":"20px"}}>M</i>
											</div>
											<input 
												id="M" 
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
									<div className="invalid-feedback invalid-M"></div>
								</div>
							</div>

							<div className="form-goup ">
								<div className="row g-3 align-items-center mb-3">
									<div className="col-lg-2">
										<label className="col-form-label" htmlFor="L">L size:</label>
									</div>
									<div className="col-lg-8">
										<div className="input-group">
											<div className="input-group-append input-group-text">
												<i style={{"width":"20px"}}>L</i>
											</div>
											<input 
												id="L" 
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
									<div className="invalid-feedback invalid-L"></div>
								</div>
							</div>

							<div className="form-goup ">
								<div className="row g-3 align-items-center mb-3">
									<div className="col-lg-2">
										<label className="col-form-label" htmlFor="XL">XL size:</label>
									</div>
									<div className="col-lg-8">
										<div className="input-group">
											<div className="input-group-append input-group-text">
												<i style={{"width":"20px"}}>XL</i>
											</div>
											<input 
												id="XL" 
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
									<div className="invalid-feedback invalid-XL"></div>
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

	const url = `${apiRoute}/create-stock`
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

const getDataProduct = ()=>{

	const url = `${apiRoute}/show-products`;
	const token = localStorage.getItem("ACCESS_TOKEN");
	const params = {

		method:"GET",
		headers: {

			"Authorization": token,
			"Content-Type":"application/json"
		}
	}

	return fetch(url, params).then(response =>{

		return response.json();
	}).then(result =>{

		return result
	}).catch(err =>{

		return err
	})

}