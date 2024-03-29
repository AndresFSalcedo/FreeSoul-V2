import React from 'react';
import {apiRoute} from '../../../../config/Config';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5';
import 'datatables.net-responsive';

import CreatePicture from './CreatePicture';
import EditDeletePicture from './EditDeletePicture';

export default function Pictures(){

	const dataPicture = async()=>{


		const getPicture = await getData();
		
		
		const dataSet = [];
		

		getPicture.data.forEach((picture, index)=>{

			dataSet[index] = [(index+1), 			
								picture.image,
								picture.productType,
								picture.design, 
								[picture._id,
								picture.image,
								picture.productType,
								picture.design
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
					{title:"Image",

						render: function(data){

							return `<img alt="img" src="${apiRoute}/show-pictureImg/${data}" style="width:150px">`
						}
					},
					{title:"Product Type"},
					{title:"Design"},
					{title:"Actions",

						render: function(data){

							return `
								<a href="" class="inputsEdit" data-toggle="modal" data-target="#editPicture" data="${data}">
									<svg style="color:black; background:#FFAA33; border-radius:100%; width:35px; line-height:35px; text-align:center; padding:8px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pencil-alt" class="svg-inline--fa fa-pencil-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path></svg>
								</a>
								<a href="" class="pictureDelete" data="${data}">
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

	dataPicture();
		
	/*=============================================
	RETORNA VISTA DEL COMPONENTE
	=============================================*/

	return(

		<div className="content-wrapper" style={{minHeight: "494px"}}>
			
			<div className="content-header">
				
				<div className="container-fluid">
					
					<div className="row mb-2">

						<div className="col-sm-6">
						  	<h1 className="m-0 text-dark">Pictures</h1>
						</div>
					</div>

				</div>

			</div>

			<div className="content">
				
				<div className="container-fluid">
					
					<div className="row">

						<div className="col-lg-12">
						  	
							<div className="card card-info card-outline">

								<div className="card-header">
									
									<h5 className="m-0">
										
										<button className="btn btn-primary cleanForm" data-toggle="modal" data-target="#createPicture">New Picture(s)</button>

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
			VENTANA MODAL PARA CREACION DE IMAGEN
			=============================================*/}
			
			<CreatePicture/>

			{/*=============================================
			VENTANA MODAL PARA CREACION DE IMAGEN
			=============================================*/}
			
			<EditDeletePicture/>

		</div>
	);

}


/*=============================================
PETICION GET PICTURES
=============================================*/

const getData = ()=>{

	const url = `${apiRoute}/show-pictures`;
	const params = {

		method:"GET",
		headers: {

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
