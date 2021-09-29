import React, {useState} from 'react';
import $ from 'jquery';
import Swal from 'sweetalert2';

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

			$(".invalid-username").show()
			$(".invalid-username").html("Username required")
			return;
		}

		if(password === ""){

			$(".invalid-password").show()
			$(".invalid-password").html("Password required")
			return;
		}
		
		/*=============================================
		Expresion regular usuario
		=============================================*/
		
		const expUsername = /^(?=.*[A-Za-z]).{5,}$/;

		if(!expUsername.test(username)){

			$(".invalid-username").show()
			$(".invalid-username").html("Use the required format")
			return;
		}

		/*=============================================
		Expresion regular password
		=============================================*/


		if(password !== ""){

			const expPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

			if(!expPassword.test(password)){
				$(".invalid-password").show()
				$(".invalid-password").html("Use the required format")
				return;
			}
		}

		/*=============================================
		EJECUTAR SERVICIO PUT
		=============================================*/

		const result = await putData(admin);

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

			setTimeout(()=>{window.location.href = "/admins"},2000)
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

		<div className="modal fade" id="editAdmin">
			<div className="modal-dialog modal-dialog-centered modal-lg">
				<div className="modal-content">

					<div className="modal-header">
						<h4 className="modal-title">Edit Admin</h4>
						<button type="button" className="close" data-dismiss="modal">&times;</button>
					</div>

					<form onChange={digitForm} onSubmit={submit}>
						<div className="modal-body">

							<div className="form-goup">
								<div className="row g-3 align-items-center mb-3">
									<div className="col-lg-2">
										<label className="col-form-label" htmlFor="username">Admin name:</label>
									</div>
									
									<div className="col-lg-6">
										<div className="input-group">
											<div className="input-group-append input-group-text">
												<i className="fas fa-user" style={{"width":"16px"}}></i>
											</div>

											<input 
												id="username" 
												type="text" 
												className="form-control text-lowercase" 
												name="username" 
												placeholder="Ingrese el usuario*"
												minLength="5"
												pattern="(?=.*[A-Za-z]).{5,}" 
												required
											/>
										</div>
									</div>

									<div className="col-lg-4">
										<div className="small text-secondary">*Min 5 characters</div>
									</div>

									<div className="invalid-feedback invalid-username"></div>
								</div>
							</div>

							<div className="form-goup">
								
								<div className="row g-3 align-items-center mb-3">

									<div className="col-lg-2">
										<label className="col-form-label" htmlFor="password">Password:</label>
									</div>

									<div className="col-lg-6">
										<div className="input-group">
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
												required
											/>
										</div>
									</div>

									<div className="col-lg-4">
										<div className="small text-secondary">*Min 8 characters, uppercase, lowercase and numbers</div>
									</div>

									<div className="invalid-feedback invalid-password"></div>
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
