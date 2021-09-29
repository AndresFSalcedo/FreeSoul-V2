import React from 'react';
import {apiRoute} from '../../../config/Config';
import $ from 'jquery';
import Swal from 'sweetalert2';

export default function AceptDeleteReserve(){

	/*=============================================
	Captura data a borrar
	=============================================*/
	
	$(document).on("click",".reserveDelete", function(e){

		e.preventDefault();

		let data = $(this).attr("data").split(',')[0];	

		/*PREGUNTAR SI ESTA SEGUR@*/

		Swal.fire({
			title: 'Are you sure?',
		  	text: "You won't be able to revert this!",
		  	icon: 'warning',
		  	showCancelButton: true,
		  	confirmButtonColor: '#3085d6',
		  	cancelButtonColor: '#d33',
		  	confirmButtonText: 'Yes, delete it!'

		}).then((result) => {

		 	if (result.isConfirmed) {

			  	/*=============================================
			  	EJECUTAR SERVICIO DELETE
			  	=============================================*/
			  	
			  	const slideDelete = async ()=>{

			  		const result = await deleteData(data);

			  		if(result.status === 400){

			  			Swal.fire({

			  				icon:"error",
					     	title: result.msg,
					     	showConfirmButton: true,
					     	confirmButtonText: "Cerrar"

			  			}).then(function(result){

			  				if(result.value){

			  					window.location.href="/reserves"
			  				}

			  			})
			  		}

			  		if(result.status === 200){

			  			Swal.fire({

			  				icon:"success",
					     	title: result.msg,
					     	showConfirmButton: true,
					     	confirmButtonText: "Cerrar"

			  			}).then(function(result){

			  				if(result.value){

			  					window.location.href="/reserves"
			  				}

			  			})
			  		}
			  	}

		    	slideDelete();
		  	}
		})
	})

	/*=============================================
	RETORNO DE LA VISTA
	=============================================*/

	return (<></>)
}


/*=============================================
PETICION DELETE
=============================================*/

const deleteData = data =>{

	const url = `${apiRoute}/delete-clientReserve/${data}`

	const token = localStorage.getItem("ACCESS_TOKEN")
	const params = {

		method: "DELETE",
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