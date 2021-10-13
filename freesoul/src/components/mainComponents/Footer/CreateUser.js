import React, {useState} from 'react';
import {apiRoute} from '../../../config/Config';
import $ from 'jquery';
import Swal from 'sweetalert2';

export default function CreateUser(){

	/*=============================================
	HOOK PARA CAPTURAR DATOS
	=============================================*/
	
	const [user, createUser] = useState({

		username: "",
		email: ""
	})

	/*=============================================
	OnChange
	=============================================*/
	
	const digitForm = e =>{

		createUser({

			...user,
			[e.target.name] : e.target.value
		})
	}

	/*=============================================
	OnSubmit
	=============================================*/

	const submit = async e=>{

		$('.alert').remove();

		e.preventDefault();

		const {username, email} = user;

		//VALIDAR USERNAME
		if(username === ""){

			$(".invalid-username").show();
			$(".invalid-username").html("Completa este campo");
			return;
		}

		//VALIDAR EXPRESION REGULAR DE USERNAME
		const expUsername = /^[A-Za-z]+$/

		if(!expUsername.test(username)){

			$(".invalid-username").show();
			$(".invalid-username").html("Utiliza el formato solicitado");
			return;
		}

		//VALIDAR EMAIL
		if(email === ""){

			$(".invalid-email").show();
			$(".invalid-email").html("Completa este campo");
			return;
		}

		//VALIDAR EXPRESION REGULAR DE EMAIL
		const expEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

		if(!expEmail.test(email)){

			$(".invalid-email").show();
			$(".invalid-email").html("Utiliza el formato solicitado");
			return;
		}


		/*=============================================
		EJECUTAR SERVICIO POST
		=============================================*/
		
		const result = await postData(user)
		
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

			setTimeout(()=>{window.location.href = "/"},3000)
		}

	}

	$(document).on("click", ".cleanForm", function(){

		$(".modal").find('form')[0].reset();
	})

	/*=============================================
	RETORNO DE LA VISTA
	=============================================*/

	return(


		<div className="modal fade" id="createUser">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">

					<div className="modal-header">
						<h4 className="modal-title">Create User</h4>
						<button type="button" className="close" data-dismiss="modal">&times;</button>
					</div>

					<form onChange={digitForm} onSubmit={submit}>
						<div className="modal-body">

							<div className="form-goup">
								<label className="small text-secondary" htmlFor="username">*Ingresar solo texto</label>
								<div className="input-group mb-3">
									<div className="input-group-append input-group-text">
										<i className="fas fa-user"></i>
									</div>
									<input 
										id="username" 
										type="text" 
										className="form-control" 
										name="username" 
										placeholder="Ingresa tu primer nombre*"
										pattern="[A-Za-z]+" 
										required
									/>
									<div className="invalid-feedback invalid-username"></div>
								</div>
							</div>


							<div className="form-goup">
								<label className="small text-secondary" htmlFor="email">*Inseta tu email</label>
								<div className="input-group mb-3">
									<div className="input-group-append input-group-text">
										<i className="fas fa-at"></i>
									</div>
									<input 
										id="email" 
										type="email" 
										className="form-control" 
										name="email" 
										placeholder="Ingresa tu email*"
										pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
										required
									/>
									<div className="invalid-feedback invalid-email"></div>
								</div>
							</div>

						</div>

						<div className="modal-footer">
							<button type="button" className="btn btn-outline-danger" data-dismiss="modal">Cancelar</button>
							<button type="submit" className="btn btn-outline-primary">Guardar mis datos</button>
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

	const url = `${apiRoute}/create-user`
	const params = {

		method: "POST",
		body: JSON.stringify(data),
		headers: {

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