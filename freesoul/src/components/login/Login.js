import React,{useState} from 'react';
import {apiRoute} from '../../config/Config';
import $ from "jquery";

export default function Login(){

	/*=============================================
	HOOK PARA INICIAR SESION
	=============================================*/

	const [admins, logIn] = useState({

		username:"",
		password:""
	});

	/*=============================================
	CAPTURA DE CAMBIOS EN EL FORMULARIO PARA EL HOOK
	=============================================*/

	const changeForm = e =>{

		logIn({

			...admins,			
			[e.target.name]:e.target.value
		})
	}

	/*=============================================
	EJECUTAR EL SUBMIT
	=============================================*/

	const login = async e =>{

		$(".alert").remove();

		e.preventDefault();
		const result = await loginAPI(admins);
		if(result.status !== 200){

			$("button[type='submit']").before(`<div class="alert alert-danger">${result.mensaje}</div>`);

		}else{

			localStorage.setItem("ACCESS_TOKEN", result.token);
			localStorage.setItem("ID", result.data._id);
			localStorage.setItem("USERNAME", result.data.username);

			window.location.href = "/stocks";
		}

	}

	/*=============================================
	RETORNAMOS LA VISTA
	=============================================*/
	
	

	return(

		<div className="login-page" style={{ minHeight: "512.391px" }}>

			<div className="login-box">

				<div className="login-logo">

					<b>FreeSoul</b>

				</div>			

				<div className="card">

					<div className="card-body login-card-body">

						<p className="login-box-msg">

							Llena los campos para iniciar sesión

						</p>

						<form onChange={changeForm} onSubmit={login}>

							<div className="input-group mb-3">

								<input
									type="text"
									className="form-control"
									placeholder="Usuario"
									name="username"
					
								/>

								<div className="input-group-append">
									<div className="input-group-text">
										<span className="fas fa-user"></span>
									</div>
								</div>

							</div>

							<div className="input-group mb-3">

								<input
									type="password"
									className="form-control"
									placeholder="Password"
									name="password"
								
								/>

								<div className="input-group-append">
									<div className="input-group-text">
										<span className="fas fa-lock"></span>
									</div>
								</div>
					
							</div>

							<button
								type="submit"
								className="btn btn-primary btn-block"
							>
								Ingresar
							</button>

						</form>

					</div>

				</div>

			</div>

		</div>
	);
}

/*=============================================
PETICION POST PARA LOGIN
=============================================*/

const loginAPI = data =>{

	const url = `${apiRoute}/login`;

	const params = {

		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			"Content-Type":"application/json"
		}
	}

	return fetch(url, params).then( response =>{

		return response.json();
	}).catch(err =>{

		return err;
	})
}
