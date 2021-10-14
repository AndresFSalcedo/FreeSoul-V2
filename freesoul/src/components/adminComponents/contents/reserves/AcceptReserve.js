import React,{useState} from 'react';
import {apiRoute} from '../../../../config/Config';
import $ from 'jquery';
import Swal from 'sweetalert2';
import { GetColorName } from 'hex-color-to-color-name';

export default function DeleteReserve(){

	const [dataSetStock, setDataStock] = useState([''])
	// const [objectNewData, setObjectNewData] = useState({
	// 	productType: "",
	// 	design: "",
	// 	codColor: "",
	// 	price: "",
	// 	S: "",
	// 	M: "",
	// 	L: "",
	// 	XL: "",
	// 	id:""
	// })
	/*=============================================
	Captura data a borrar
	=============================================*/
	
	$(document).on("click",".acceptReserve", function(e){

		e.preventDefault();

		let data = JSON.parse($(this).attr("data"));
		
		let dataSetReserve = [];

		data.forEach((data, index)=>{

			dataSetReserve[index] = [			
								`${data.productCode}-${data.color}`,
								data.size,
								data.quantity,
								];
		})

		/*PREGUNTAR SI ESTA SEGUR@*/

		 Swal.fire({
		 	title: 'Confirm',
		   	text: "The units will be discount from the stock!",
		   	icon: 'success',
		  	showCancelButton: true,
		   	confirmButtonColor: '#3085d6',
		   	cancelButtonColor: '#d33',
		   	confirmButtonText: 'Yes, Accept it!'

		 }).then((result) => {

		  	if (result.isConfirmed) {

		  		/*=============================================
		 	  	EJECUTAR SERVICIO GET STOCK
		 	  	=============================================*/

		 	  	const dataStock = async()=>{


					const getStock1 = await getStock();
					console.log("getStock1", getStock1);
					
					
					const dataSetStock = [];
					

					getStock1.data.forEach((stock, index)=>{

						const first = stock.codColor;
					    let finalColor = '';
					    if(first.charAt(0) === '#'){
					    	finalColor = (GetColorName(first)).toLowerCase();
					    }else{
					        finalColor = first
					    }

						dataSetStock[index] = [			
											`${stock.productType}-${stock.design}-${finalColor}`,
											stock.S,
											stock.M,
											stock.L,
											stock.XL,
											stock.price,
											stock._id
											];
					})

					setDataStock(dataSetStock)				
				}

				dataStock();
				
				let datosNuevos = []

				for(let i=0; i < dataSetReserve.length; i++){

					for(let j=0; j < dataSetStock.length; j++){

						if(dataSetReserve[i][0] === dataSetStock[j][0]){

							if(dataSetReserve[i][1] === 'S'){
								dataSetStock[j][1] = dataSetStock[j][1] - dataSetReserve[i][2]
								datosNuevos.push(dataSetStock[j])
								
							}
							if(dataSetReserve[i][1] === 'M'){
								dataSetStock[j][2] = dataSetStock[j][2] - dataSetReserve[i][2]
								datosNuevos.push(dataSetStock[j])
							}
							if(dataSetReserve[i][1] === 'L'){
								dataSetStock[j][3] = dataSetStock[j][3] - dataSetReserve[i][2]
								datosNuevos.push(dataSetStock[j])
							}
							if(dataSetReserve[i][1] === 'XL'){
								dataSetStock[j][4] = dataSetStock[j][4] - dataSetReserve[i][2]
								datosNuevos.push(dataSetStock[j])
							}
						}
					}
				}

				console.log("datosNuevos", datosNuevos);

				// for(let i=0; i<datosNuevos.length;i++){
				// 	setObjectNewData(
				// 		productType: "",
				// 		design: "",
				// 		codColor: "",
				// 		price: "",
				// 		S: "",
				// 		M: "",
				// 		L: "",
				// 		XL: "",
				// 		id:""
				// 	)
				// }



				return

	 	  		/*=============================================
		 	  	EJECUTAR SERVICIO PUT
		 	  	=============================================*/
			  	
			  	// const slideDelete = async ()=>{

			  	// 	const result = await deleteData(data);

			  	// 	if(result.status === 400){

			  	// 		Swal.fire({

			  	// 			icon:"error",
					 //     	title: result.msg,
					 //     	showConfirmButton: true,
					 //     	confirmButtonText: "Cerrar"

			  	// 		}).then(function(result){

			  	// 			if(result.value){

			  	// 				window.location.href="/reserves"
			  	// 			}

			  	// 		})
			  	// 	}

			  	// 	if(result.status === 200){

			  	// 		Swal.fire({

			  	// 			icon:"success",
					 //     	title: result.msg,
					 //     	showConfirmButton: true,
					 //     	confirmButtonText: "Cerrar"

			  	// 		}).then(function(result){

			  	// 			if(result.value){

			  	// 				window.location.href="/reserves"
			  	// 			}

			  	// 		})
			  	// 	}
			  	// }

		    // 	slideDelete();
		  	}
		})
	})

	/*=============================================
	RETORNO DE LA VISTA
	=============================================*/

	return (<></>)
}

//Servicios HTTP

/*=============================================
PETICION GET STOCKS
=============================================*/

const getStock = ()=>{

	const url = `${apiRoute}/show-stock`;
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
