import React, {useState} from 'react';
import $ from 'jquery';
//import Swal from 'sweetalert2';

import {apiRoute} from '../../../config/Config';

export default function AdminEdit(){

	/*=============================================
	Hook para captura de datos
	=============================================*/
	
	const [admin, editAdmin] = useState({

		username:"",
		password:"",
		id:""
	})
	

	/*=============================================
	OnChange
	=============================================*/
	
	const digitForm = e =>{

		editAdmin({

			...admin,
			[e.target.name]: e.target.value
		})

	}

	/*=============================================
	OnSubmit
	=============================================*/

	const submit = async e =>{

		$('alert').remove();

		e.preventDefault();

		const {username ,password} = admin;

		/*=============================================
		Usuario no puede venir vacio
		=============================================*/
		
		if(username === ""){

			$(".invalid-usuario").show()
			$(".invalid-usuario").html("Completa este campo")
			return;
		}
		
		/*=============================================
		Expresion regular usuario
		=============================================*/
		
		const expUsername = /^(?=.*[A-Za-z]).{2,6}$/;

		if(!expUsername.test(username)){

			$(".invalid-usuario").show()
			$(".invalid-usuario").html("Utiliza un formato que coincida con lo solicitado")
			return;
		}

		/*=============================================
		Expresion regular password
		=============================================*/


		if(password !== ""){

			const expPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

			if(!expPassword.test(password)){
				$(".invalid-usuario").show()
				$(".invalid-usuario").html("Utiliza un formato que coincida con lo solicitado")
				return;
			}
		}

		/*=============================================
		EJECUTAR SERVICIO PUT
		=============================================*/

		const result = await putData(admin);

		if(result.status === 400){

			$(".modal-footer").before(`<div class="alert alert-danged">${result.msg}</div>`);
		}

		if(result.status === 200){

			$(".modal-footer").before(`<div class="alert alert-success">${result.msg}</div>`);
			$('button[type="submit"]').remove();

			setTimeout(()=>{window.location.href = "/admins"},3000)
		}
	}


	/*=============================================
	Captura data a editar
	=============================================*/
	
	$(document).on("click",".inputsEdit", function(e){

		e.preventDefault();

		let data = $(this).attr("data").split(',');

		$('#username').val(data[1]);

		editAdmin({

			'username': $('#username').val(),
			'password': $('#password').val(),
			'id': data[0]
		})

	})
	

	/*=============================================
	Retono de la vista del componente
	=============================================*/
	
	return(

		<div className="modal" id="editAdmin">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">

					<div className="modal-header">
						<h4 className="modal-title">Edit Admin</h4>
						<button type="button" className="close" data-dismiss="modal">&times;</button>
					</div>

					<form onChange={digitForm} onSubmit={submit}>
						<div className="modal-body">

							<div className="form-goup">
								
								<label className="small text-secondary" htmlFor="username">*Minimo 2 caracteres, maximo 6, sin numeros</label>

								<div className="input-group mb-3">
										
									<div className="input-group-append input-group-text">
										<i className="far fa-user"></i>
									</div>

									<input 
										id="username" 
										type="text" 
										className="form-control text-lowercase" 
										name="username" 
										placeholder="Ingrese el usuario*"
										minLength="2"
										maxLength="6"
										pattern="(?=.*[A-Za-z]).{2,6}" 
										required
									/>


									<div className="invalid-feedback invalid-picture"></div>
								</div>

							</div>
							<div className="form-goup">
								
								<label className="small text-secondary" htmlFor="password">*Minimo 8 caracteres, letras en mayuscula, en minuscula y numeros</label>

								<div className="input-group mb-3">
										
									<div className="input-group-append input-group-text">
										<i className="fas fa-key"></i>
									</div>

									<input 
										id="password" 
										type="password" 
										className="form-control" 
										name="password" 
										placeholder="Ingrese la contraseña*"
										minLength="8"
										pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}" 
									/>


									<div className="invalid-feedback invalid-picture"></div>
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
PETICION PUT PARA ADMINS
=============================================*/

const putData = data =>{

	const url = `${apiRoute}/edit-admin/${data.id}`;
	const token = localStorage.getItem("ACCESS_TOKEN");
	const params = {

		method:"PUT",
		body:JSON.stringify(data),
		headers: {
			"Authorization":token,
			"Content-Type":"application/json"
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
