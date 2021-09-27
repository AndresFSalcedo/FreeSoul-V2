/* JD SLIDER */

$('.example').jdSlider({
	wrap:'.slide-inner',
	isAuto:true,
	isUse:true,
	isLoop:true,
	interval: 3000

});

/* PINTEREST GRID */
$('#pinterest_grid').pinterest_grid({
	no_columns: 4,
	padding_x: 10,
	padding_y: 10,
	margin_bottom: 50,
	single_column_breakpoint: 769
});

/* EKKO LIGHTBOX */
$(document).on("click","[data-toggle='lightbox']", function(e){
	e.preventDefault(); //Quitar efectos del navegador
	$(this).ekkoLightbox();	// Activar accion del plugin
})