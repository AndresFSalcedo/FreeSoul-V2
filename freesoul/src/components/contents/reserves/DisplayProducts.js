import React from 'react';
//import {apiRoute} from '../../../config/Config';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5';
import 'datatables.net-responsive';

export default function DisplayProducts(){

	$(document).on("click",".displayProducts", function(e){

		e.preventDefault();

		let data = $(this).data("foo");
		console.log(data[0].color)

	})


	return(

		<div className="modal fade" id="displayProducts">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">

					<div className="modal-header">
						<h4 className="modal-title">Reserved Products</h4>
						<button type="button" className="close" data-dismiss="modal">&times;</button>
					</div>

					<div className="modal-body tableProducts">
						
					</div>

					<div className="modal-footer">
						
					</div>

				</div>
			</div>
		</div>

	);
}