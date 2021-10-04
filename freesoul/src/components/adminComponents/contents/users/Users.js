import React from 'react';
import {apiRoute} from '../../../../config/Config';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5';
import 'datatables.net-responsive';

import CreateUser from './CreateUser';
import DeleteUser from './DeleteUser';

export default function Users(){

	const dataUser = async()=>{


		const getUser = await getData();
		
		
		const dataSet = [];
		

		getUser.data.forEach((user, index)=>{

			dataSet[index] = [(index+1), 			
								user.username,
								user.email,
								[user._id,
								user.username,
								user.email
								]];
		})

		/*=============================================
		EJECUTAR DATA TABLE JQUERY
		=============================================*/

		$(document).ready(function() {

			$('.table').DataTable({

				data: dataSet,
				columns: [
					{title:"#"},
					{title:"User Name"},
					{title:"Email"},
					{title:"Actions",

						render: function(data){

							return `
								<a href="" class="userDelete" data="${data}">
									<svg style="color:white; background:#dc3543; border-radius:100%; width:35px; line-height:35px; text-align:center; padding:10px" aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path></svg>
								</a>
							`
						}
					}
				],
				destroy: true
			});
		})
	}

	dataUser();	

	return(

		<div className="content-wrapper" style={{minHeight: "494px"}}>
			
			<div className="content-header">
				
				<div className="container-fluid">
					
					<div className="row mb-2">

						<div className="col-sm-6">
						  	<h1 className="m-0 text-dark">Users</h1>
						</div>
					</div>

				</div>

			</div>

			<div className="content">
				
				<div className="container-fluid">
					
					<div className="row">

						<div className="col-lg-12">
						  	
							<div className="card card-info card-outline">

								<div className="card-header ">

									<h5 className="m-0">
										
										<button className="cleanForm btn btn-primary" data-toggle="modal" data-target="#createUser">New User</button>

									</h5>

								</div>

							  	<div className="card-body">
							  		
						  			<table className="dt-responsive table table-striped" style={{"width":"100%"}}>
						  			</table>
							  		
							  	</div>

							</div>

						</div>

					</div>

				</div>

			</div>

			{/*=============================================
			VENTANA MODAL PARA CREACION DE USUARIO
			=============================================*/}
			
			<CreateUser/>

			{/*=============================================
			VENTANA MODAL PARA ELIMINACION DE USUARIO
			=============================================*/}
			
			<DeleteUser/>
			
		</div>
	);

}

/*=============================================
PETICION GET PICTURES
=============================================*/

const getData = ()=>{

	const url = `${apiRoute}/show-user`;
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
