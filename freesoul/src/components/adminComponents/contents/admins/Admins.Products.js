import React from 'react';

import Admin from './admin/Admin';
import Products from './products/Products';

export default function AdminsProducts() {

	return(

		<div className="content-wrapper" style={{minHeight: "494px"}}>

			<div className="col-lg-12">
				
				<Admin/>
			</div>
			
			<div className="col-lg-12">
				
				<Products/>
			</div>
			
		</div>
	);
}
