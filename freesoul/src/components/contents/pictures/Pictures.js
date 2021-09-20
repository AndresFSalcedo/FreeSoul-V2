import React from 'react';

export default function Admis(){

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
										
										<button className="btn btn-primary">Crear Nueva Imagen</button>

									</h5>

								</div>

							  	<div className="card-body">
							  		
						  			<table className="table table-striped">
						  			  <thead>
						  			    <tr>
						  			      <th scope="col">#</th>
						  			      <th scope="col">Image</th>
						  			      <th scope="col">Design</th>
						  			      <th scope="col">Action</th>
						  			    </tr>
						  			  </thead>
						  			  <tbody>
						  			    <tr>
						  			      <th scope="row">1</th>
						  			      <td>image.jpg</td>
						  			      <td>C-BoobsA</td>
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
