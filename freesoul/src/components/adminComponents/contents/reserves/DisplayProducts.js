import React from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5';
import 'datatables.net-responsive';

export default function DisplayProducts(){

	$(document).on("click",".displayProducts", function(e){

		e.preventDefault();

		let data = JSON.parse($(this).attr("data"));

		let dataTable = []

		data.forEach((element, index)=>{
			dataTable[index] = [
				element.productCode,
				element.color,
				element.size,
				element.quantity
			]
		})
		
		$(document).ready(()=>{
			$('.details').DataTable({

				data: dataTable,
				columns: [
							{title:"Type - Product"},
							{title:"Color"},
							{title:"Size"},
							{title:"Quantity"}
						 ],
				destroy: true
			})
		})

	})


	return(

		<div className="modal fade" id="displayProducts">
			<div className="modal-lg modal-dialog modal-dialog-centered">
				<div className="modal-content">

					<div className="modal-header">
						<h4 className="modal-title">Reserved Products</h4>
						<button type="button" className="close" data-dismiss="modal">&times;</button>
					</div>

					<div className="modal-body">
						<table className="table details table-striped dt-responsive" style={{"width":"100%"}}>
						</table>
					</div>

					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
					</div>

				</div>
			</div>
		</div>

	);
}