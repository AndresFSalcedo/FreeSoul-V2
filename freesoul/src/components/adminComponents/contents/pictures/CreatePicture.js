import React from 'react';
import {apiRoute} from '../../../../config/Config';
import $ from 'jquery';
import Swal from 'sweetalert2';

export default function CreatePicture(){

	/*=============================================
	HOOK PARA CAPTURAR DATOS
	=============================================*/
	
	let picture = {

		image: null,
		productType: "",
		design: ""
	}

	/*=============================================
	OnChange
	=============================================*/
	const enterPictures = e =>{

		let images = $("#image").get(0).files
		
		for (let i = 0; i < images.length; i++) {

			//VALIDAR LA EXTENSION DEL ARCHIVO

			if (images[i]["type"] !== "image/jpeg" && images[i]["type"] !== "image/png") {

				$("#image").val("");
				$(".viewImages").html("")

				Swal.fire({

					icon: 'error',
					title: 'The files must be .jpg or .png'
				})

				return;

			}else if(images[i]["size"] > 2100000){

				$("#image").val("");
				$(".viewImages").html("")

				Swal.fire({

					icon: 'error',
					title: 'Size per image must be less than 2MB'
				})
				
				return;
			}else{

				let fileData = new FileReader();

				fileData.readAsDataURL(images[i]);
				$(fileData).on("load", function(event){

					let fileRoute = event.target.result;
					
					$(".viewImages").append(`

						<div class="col-6 pt-2">
							<img src="${fileRoute}" class="img-fluid">
						</div>

					`)

					$("#productType").prop("disabled",false)
					$("#design").prop("disabled",false)

					picture.image = images
					

				})

			}
		}
	}

	/*=============================================
	OnSubmit
	=============================================*/

	const submit = async e=>{

		$('.alert').remove();

		e.preventDefault();

		picture.productType = $("#productType").val()
		picture.design = $("#design").val()
		
		const {image, productType, design} = picture;
		
		for (let i = 0; i < picture.image.length; i++) {
			
			/*VALIDAMOS SI NO VIENE LA IMAGEN*/
			if(image[i] === null){

				$(".invalid-image").show()
				$(".invalid-image").html("The image id required")
				return;
			}
		}
		

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
		EJECUTAR SERVICIO POST PARA VARIAS FOTOS
		=============================================*/
		
		for (let i = 0; i < picture.image.length; i++) {

			let sendData = {
				image: picture.image[i],
				productType: picture.productType,
				design: picture.design
			}

			const result = await postData(sendData)
			
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
	 	$(".viewImages").html("")
	})

	/*=============================================
	RETORNO DE LA VISTA
	=============================================*/

	return(

		<div className="modal fade" id="createPicture">
			<div className="modal-dialog modal-dialog-centered modal-lg">
				<div className="modal-content">

					<div className="modal-header">
						<h4 className="modal-title">Create Picture</h4>
						<button type="button" className="close" data-dismiss="modal">&times;</button>
					</div>

					<form onSubmit={submit} encType="multipart/form-data">
						<div className="modal-body">

							<div className="form-goup mb-3">
								
								<label className="small text-secondary" htmlFor="image">*Image size max 2MB and .jpg or .png</label>

								<input 
									id="image"
									type="file" 
									className="form-control-file border" 
									name="image"
									onChange={enterPictures}
									multiple 
									required
								/>

								<div className="invalid-feedback invalid-image"></div>

								<div className="viewImages row"></div>

							</div>

							<div className="form-goup ">
								<div className="row g-3 align-items-center mb-3">

									<div className="col-lg-2">
										<label className="col-form-label" htmlFor="productType">Product type:</label>
									</div>
									
									<div className="col-lg-8">
										<div className="input-group">
											<div className="input-group-append input-group-text">
												<i className="fas fa-tshirt"></i>
											</div>
											<select className="custom-select" id="productType" disabled>
												
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
												<i className="fas fa-font"></i>
											</div>
											<input 
												id="design" 
												type="text" 
												className="form-control" 
												name="design" 
												placeholder="*"
												pattern="[A-Za-z]+"
												disabled 
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

	const url = `${apiRoute}/create-picture`
	const token = localStorage.getItem("ACCESS_TOKEN")

	let formData = new FormData();

	formData.append("image", data.image);
	formData.append("productType", data.productType);
	formData.append("design", data.design);

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