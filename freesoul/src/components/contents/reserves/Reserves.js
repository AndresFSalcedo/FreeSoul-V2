import React from 'react';
import {apiRoute} from '../../../config/Config';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5';
import 'datatables.net-responsive';

import AceptDeleteReserve from './AceptDeleteReserve';
import DisplayProducts from './DisplayProducts';

export default function Reservs(){

	const dataReserves = async()=>{


		const getReserves = await getData();
		
		const dataSet = [];
	
		getReserves.data.forEach((reserve, index)=>{

			dataSet[index] = [(index+1), 			
								reserve.date,
								reserve.name,
								reserve.lastName,
								reserve.cC,
								reserve.phone,
								reserve.email,
								reserve.city,
								reserve.address,
								reserve.totalCost,
								reserve.status,
								reserve.products = JSON.stringify(reserve.products),
								[reserve._id,
								reserve.date,
								reserve.name,
								reserve.lasName,
								reserve.cC,
								reserve.phone,
								reserve.email,
								reserve.city,
								reserve.address,
								reserve.totalCost,
								reserve.status,
								reserve.products,
								]];
		})

		/*=============================================
		EJECUTAR DATA TABLE JQUERY
		=============================================*/

		$(document).ready(function() {

			$('.client').DataTable({

				data: dataSet,
				columns: [
					{title:"#"},
					{title:"Date"},
					{title:"Name"},
					{title:"Last Name"},
					{title:"C.C."},
					{title:"Phone"},
					{title:"Email"},
					{title:"City"},
					{title:"Address"},
					{title:"Total Cost"},
					{title:"Status"},
					{title:"Products",

						render: function (products){

							return `
								<a class="displayProducts" data-toggle="modal" data-target="#displayProducts" data='${products}'>
									
									<svg style="color:white; background:#24b4ad; border-radius:100%; width:35px; line-height:35px; text-align:center; padding:10px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
								</a>
							`
						}

					},
					{title:"Actions",

						render: function(data){

							return `
								<a href="" class="editData" data-toggle="modal" data-target="#editStock" data="${data}">
									
									<svg style="color:white; background:#00a135; border-radius:100%; width:35px; line-height:35px; text-align:center; padding:10px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" class="svg-inline--fa fa-check fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
								</a>
								<a href="" class="reserveDelete" data="${data}">
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

	dataReserves();

	/*=============================================
	RETORNA VISTA DEL COMPONENTE
	=============================================*/

	return(

		<div className="content-wrapper" style={{minHeight: "494px"}}>
			
			<div className="content-header">
				
				<div className="container-fluid">
					
					<div className="row mb-2">

						<div className="col-sm-6">
						  	<h1 className="m-0 text-dark">Reserves</h1>
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
							  		
						  			<table className="table client table-striped dt-responsive" style={{"width":"100%"}}>
						  			</table>
							  		
							  	</div>

							</div>

						</div>

					</div>

				</div>

			</div>


			<DisplayProducts/>

			{/*=============================================
			VENTANA MODAL PARA ACEPT DELETE DE RESERVA
			=============================================*/}
			
			<AceptDeleteReserve/>

		</div>
	);

}

/*=============================================
PETICION GET PICTURES
=============================================*/

const getData = ()=>{

	const url = `${apiRoute}/show-clientReserve`;
	const token = localStorage.getItem("ACCESS_TOKEN")
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