import React, {useState} from 'react';
import {apiRoute} from '../../../config/Config';
import $ from 'jquery';

export default function CreatePicture(){

	/*=============================================
	HOOK PARA CAPTURAR DATOS
	=============================================*/
	
	const [picture, createPicture] = useState({

		image: null,
		productType: "",
		design: ""
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

				$("#productType").prop("disabled",false)
				$("#design").prop("disabled",false)

				createPicture({

					'image': image,
					'productType': $("#productType").val(),
					'design': $("#design").val()
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

		const {image, productType, design} = picture;

		/*VALIDAMOS SI NO VIENE LA IMAGEN*/
		if(image === null){

			$(".invalid-image").show()
			$(".invalid-image").html("La imagen no puede ir vacia")
			return;
		}

		/*VALIDAMOS SI NO VIENE EL PRODUCTO Y DISEÑO*/
		if(productType === ""){

			$(".invalid-productType").show()
			$(".invalid-productType").html("El tipo de producto no puede ir vacio")
			return;
		}
		if(design === ""){

			$(".invalid-design").show()
			$(".invalid-design").html("El diseño no puede ir vacio")
			return;
		}

		/*VALIDAMOS EXPRESION REGULAR DEL PRODUCTO Y DISEÑO*/
		if(productType !== ""){

			const expProductType = /^[A-Za-z]+$/;

			if(!expProductType.test(productType)){

				$(".invalid-productType").show()
				$(".invalid-productType").html("El producto debe tener solo texto")
				return;
			}
		}
		if(design !== ""){

			const expDesign = /^[A-Za-z]+$/;

			if(!expDesign.test(design)){

				$(".invalid-design").show()
				$(".invalid-design").html("El diseño debe tener solo texto")
				return;
			}
		}

		/*=============================================
		EJECUTAR SERVICIO POST
		=============================================*/
		
		const result = await postData(picture)
		
		if(result.status === 400){

			$(".modal-footer").before(`<div class="alert alert-danged">${result.msg}</div>`);
		}

		if(result.status === 200){

			$(".modal-footer").before(`<div class="alert alert-success">${result.msg}</div>`);
			$('button[type="submit"]').remove();

			setTimeout(()=>{window.location.href = "/pictures"},3000)
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

		<div className="modal fade" id="createPicture">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">

					<div className="modal-header">
						<h4 className="modal-title">Create Picture</h4>
						<button type="button" className="close" data-dismiss="modal">&times;</button>
					</div>

					<form onChange={digitForm} onSubmit={submit} encType="multipart/form-data">
						<div className="modal-body">

							<div className="form-goup">
								
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
								
								<label className="small text-secondary" htmlFor="productType">*Ingresar solo texto</label>

								<div className="input-group mb-3">
										
									<div className="input-group-append input-group-text">
										<i className="fas fa-tshirt"></i>
									</div>

									<input 
										id="productType" 
										type="text" 
										className="form-control" 
										name="productType" 
										placeholder="Ingrese el tipo de producto*"
										pattern="[A-Za-z]+"
										disabled 
										required
									/>


									<div className="invalid-feedback invalid-productType"></div>
								</div>

							</div>
							<div className="form-goup">
								
								<label className="small text-secondary" htmlFor="design">*Ingresar solo texto</label>

								<div className="input-group mb-3">
										
									<div className="input-group-append input-group-text">
										<i className="fas fa-font"></i>
									</div>

									<input 
										id="design" 
										type="text" 
										className="form-control" 
										name="design" 
										placeholder="Ingrese el diseño del producto*"
										pattern="[A-Za-z]+"
										disabled 
										required
									/>


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