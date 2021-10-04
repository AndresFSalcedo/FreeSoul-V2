import React from 'react';
import {apiRoute} from '../../../../config/Config';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5';
import 'datatables.net-responsive';

import AdminEdit from './AdminEdit';

export default function Admins() {

	//DATA TABLE FOR ADMIN
	const dataAdmins = async()=>{


		const getAdmins = await getDataAdmin();
		
		
		const dataSet = [];
		

		getAdmins.data.forEach((admin, index)=>{

			dataSet[index] = [(index+1), 
			
								admin.username, 
								[admin._id, admin.username]];
		})
		
		/*=============================================
		EJECUTAR DATA TABLE JQUERY
		=============================================*/
		$(document).ready(function() {
			
			$('table.admins').DataTable({

				data: dataSet,
				columns: [
					{title:"#"},
					{title:"Name"},
					{title:"Actions",

						render: function(data){

							return `
								<a href="" class="inputsEdit" data-toggle="modal" data-target="#editAdmin" data="${data}">
									<svg style="color:black; background:#FFAA33; border-radius:100%; width:35px; line-height:35px; text-align:center; padding:8px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pencil-alt" class="svg-inline--fa fa-pencil-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path></svg>
								</a>`
						}
					}
				],
				destroy: true
			});
			
		})
	}

	dataAdmins();

	return(
		<div>
			<div className="content-header">
				
				<div className="container-fluid">
					
					<div className="row mb-2">

						<div className="col-sm-6">
						  	<h1 className="m-0 text-dark">Admins</h1>
						</div>
					</div>

				</div>

			</div>

			<div className="content">
				
				<div className="container-fluid">
					
					<div className="row">

						<div className="col-lg-12">
						  	
							<div className="card card-info card-outline">

							  	<div className="card-body">
							  		
						  			<table className="dt-responsive admins table table-striped" style={{"width":"100%"}}>
						  			  
						  			</table>
							  		
							  	</div>

							</div>

						</div>

					</div>

				</div>

			</div>

			{/* VENTANA MODAL PARA EDIT ADMIN*/}

			<AdminEdit/>
		</div>
	);
}

/*=============================================
PETICION GET ADMIN
=============================================*/

const getDataAdmin = ()=>{

	const url = `${apiRoute}/show-admins`;
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
