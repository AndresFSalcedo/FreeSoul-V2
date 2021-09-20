import React from 'react';
import {apiRoute} from '../../../config/Config';

export default function Admis(){

	const Slide01 = `${apiRoute}/show-img/1071.jpg`;

	return(

		<div className="content-wrapper" style={{minHeight: "494px"}}>
			
			<div className="content-header">
				
				<div className="container-fluid">
					
					<div className="row mb-2">

						<div className="col-sm-6">
						  	<h1 className="m-0 text-dark">Slides</h1>
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
										
										<button className="btn btn-primary">Crear Nuevo Slide</button>

									</h5>

								</div>

							  	<div className="card-body">
							  		
						  			<table className="table table-striped">
						  			  <thead>
						  			    <tr>
						  			      <th scope="col">#</th>
						  			      <th width="320px" scope="col">Image</th>
						  			      <th scope="col">Actions</th>
						  			    </tr>
						  			  </thead>
						  			  <tbody>
						  			    <tr>
						  			      <th scope="row">1</th>
						  			      <td>
						  			      	<img alt="" className="img-fluid" src={Slide01}/>
						  			      </td>
						  			      <td>
						  			      	<div className="btn-group">
						  			      		
						  			      		<button className="btn btn-warning rounded-circle mr-2" type="button">
						  			      			<i className="nav-icon fas fa-pencil-alt"></i>
						  			      		</button>
						  			      		<button className="btn btn-danger rounded-circle mr-2" type="button">
						  			      			<i className="nav-icon fas fa-trash"></i>
						  			      		</button>

						  			      	</div>
						  			      </td>
						  			    </tr>
						  			    
						  			  </tbody>
						  			</table>
							  		
							  	</div>

							</div>

						</div>

					</div>

				</div>

			</div>

		</div>
	);

}
