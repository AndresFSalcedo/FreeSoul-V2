import React, {useState} from 'react';
import {apiRoute} from '../../../config/Config';
import $ from 'jquery';

export default function CreateStock(){

	/*=============================================
	HOOK PARA CAPTURAR DATOS
	=============================================*/
	
	const [stock, createStock] = useState({

		productType: "",
		design: "",
		codColor: "",
		price: "",
		S: "",
		M: "",
		L: "",
		XL: ""
	})

	/*=============================================
	OnChange
	=============================================*/
	
	const digitForm = e =>{

		createStock({

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
		EJECUTAR SERVICIO POST
		=============================================*/
		
		const result = await postData(stock)
		
		if(result.status === 400){

			$(".modal-footer").before(`<div class="alert alert-danger">${result.msg}</div>`);
		}

		if(result.status === 200){

			$(".modal-footer").before(`<div class="alert alert-success">${result.msg}</div>`);
			$('button[type="submit"]').remove();

			setTimeout(()=>{window.location.href = "/stocks"},3000)
		}

	}

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

					<form onChange={digitForm} onSubmit={submit}>
						<div className="modal-body">


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
										required
									/>
									<div className="invalid-feedback invalid-design"></div>
								</div>
							</div>


							<div className="form-goup">
								<label className="small text-secondary" htmlFor="codColor">*Ingresar solo texto</label>
								<div className="input-group mb-3">
									<div className="input-group-append input-group-text">
										<i className="fas fa-paint-brush"></i>
									</div>
									<input 
										id="codColor" 
										type="text" 
										className="form-control text-lowercase" 
										name="codColor" 
										placeholder="Ingrese el color del producto*"
										pattern="[A-Za-z]+" 
										required
									/>
									<div className="invalid-feedback invalid-codColor"></div>
								</div>
							</div>


							<div className="form-goup">
								<label className="small text-secondary" htmlFor="price">*Ingresar solo numeros</label>
								<div className="input-group mb-3">
									<div className="input-group-append input-group-text">
										<i className="fas fa-dollar-sign"></i>
									</div>
									<input 
										id="price" 
										type="text" 
										className="form-control" 
										name="price" 
										placeholder="Ingrese el precio del producto*"
										pattern="[0-9]+" 
										required
									/>
									<div className="invalid-feedback invalid-price"></div>
								</div>
							</div>


							<div className="form-goup">
								<label className="small text-secondary" htmlFor="S">*Ingresar solo numeros</label>
								<div className="input-group mb-3">
									<div className="input-group-append input-group-text">
										<i></i>
									</div>
									<input 
										id="S" 
										type="text" 
										className="form-control" 
										name="S" 
										placeholder="Ingrese las unidades de talla S*"
										pattern="[0-9]+" 
										required
									/>
									<div className="invalid-feedback invalid-S"></div>
								</div>
							</div>


							<div className="form-goup">
								<label className="small text-secondary" htmlFor="M">*Ingresar solo numeros</label>
								<div className="input-group mb-3">
									<div className="input-group-append input-group-text">
										<i></i>
									</div>
									<input 
										id="M" 
										type="text" 
										className="form-control" 
										name="M" 
										placeholder="Ingrese las unidades de talla M*"
										pattern="[0-9]+" 
										required
									/>
									<div className="invalid-feedback invalid-M"></div>
								</div>
							</div>


							<div className="form-goup">
								<label className="small text-secondary" htmlFor="L">*Ingresar solo numeros</label>
								<div className="input-group mb-3">
									<div className="input-group-append input-group-text">
										<i></i>
									</div>
									<input 
										id="L" 
										type="text" 
										className="form-control" 
										name="L" 
										placeholder="Ingrese las unidades de talla L*"
										pattern="[0-9]+" 
										required
									/>
									<div className="invalid-feedback invalid-L"></div>
								</div>
							</div>


							<div className="form-goup">
								<label className="small text-secondary" htmlFor="XL">*Ingresar solo numeros</label>
								<div className="input-group mb-3">
									<div className="input-group-append input-group-text">
										<i></i>
									</div>
									<input 
										id="XL" 
										type="text" 
										className="form-control" 
										name="XL" 
										placeholder="Ingrese las unidades de talla XL*"
										pattern="[0-9]+" 
										required
									/>
									<div className="invalid-feedback invalid-XL"></div>
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