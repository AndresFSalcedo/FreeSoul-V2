import React from 'react';

export default function Admis(){

	return(

		<div className="content-wrapper" style={{minHeight: "494px"}}>
			
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

								<div className="card-header">Admin List</div>

							  	<div className="card-body">
							  		
						  			<table className="table table-striped">
						  			  <thead>
						  			    <tr>
						  			      <th scope="col">#</th>
						  			      <th scope="col">User Name</th>
						  			      <th scope="col">Actions</th>
						  			    </tr>
						  			  </thead>
						  			  <tbody>
						  			    <tr>
						  			      <th scope="row">1</th>
						  			      <td>Mark</td>
						  			      <td>
						  			      	<div className="btn-group">
						  			      		
						  			      		<button className="btn btn-warning rounded-circle mr-2" type="button">

						  			      			<i className="nav-icon fas fa-pencil-alt"></i>
						  			      			
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
