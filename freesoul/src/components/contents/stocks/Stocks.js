import React from 'react';

export default function Admis(){

	return(

		<div className="content-wrapper" style={{minHeight: "494px"}}>
			
			<div className="content-header">
				
				<div className="container-fluid">
					
					<div className="row mb-2">

						<div className="col-sm-6">
						  	<h1 className="m-0 text-dark">Stock</h1>
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
										
										<button className="btn btn-primary">Crear Nuevo Diseño</button>

									</h5>

								</div>

							  	<div className="card-body">
							  		
						  			<table className="table table-striped">
						  			  <thead>
						  			    <tr>
						  			      <th scope="col">#</th>
						  			      <th scope="col">Design</th>
						  			      <th scope="col">Color</th>
						  			      <th scope="col">Price</th>
						  			      <th scope="col">S</th>
						  			      <th scope="col">M</th>
						  			      <th scope="col">L</th>
						  			      <th scope="col">Actions</th>
						  			    </tr>
						  			  </thead>
						  			  <tbody>
						  			    <tr>
						  			      <th scope="row">1</th>
						  			      <td>C-BoobsA</td>
						  			      <td>#FFFFFF</td>
						  			      <td>55000</td>
						  			      <td>3</td>
						  			      <td>0</td>
						  			      <td>1</td>
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
