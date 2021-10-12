import React from "react";
import { apiRoute } from "../../../config/Config";

export default function Blog () {
	
	const dataBlog = async()=>{

		const getBlog = await getData();

		const dataSet = [];
		

		getBlog.data.forEach((blog, index)=>{

			dataSet[index] = [ 			
								blog.image,
								blog.title,
								blog.intro,
								blog.url, 
								];
		})

		const html = document.getElementById('blogData');

		let result = ''

		for (let i =0; i < dataSet.length; i++){

			
			result += `
					<div class="row mb-4">
						<div class="col-lg-4">
							<img class="img-fluid" alt="Blog-Pic" src=${apiRoute}/show-blogImg/${dataSet[i][0]}/>
						</div>
						<div class="col-lg-8">
							<h3>${dataSet[i][1]}</h3>
							<p>${dataSet[i][2]}</p>
							<a href=${dataSet[i][3]}>Leer Mas</a>
						</div>
					</div>`;

			
		}
		html.innerHTML = result
		console.log(dataSet[0][0])
	}
	dataBlog()

	//Return
	return(
		<div className="mt-5 container" id="blogData">
			
		</div>
	)
}

/*=============================================
PETICION GET BLOGS
=============================================*/

const getData = ()=>{

	const url = `${apiRoute}/show-blogs`;
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