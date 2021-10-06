import React from 'react';
//import $ from 'jquery';

import img1 from './slide01.jpg';
import img2 from './slide02.jpg';
import img3 from './slide03.jpg';

export default function Slide(){

	/*$('.example').jdSlider({
	wrap:'.slide-inner',
	isAuto:true,
	isUse:true,
	isLoop:true,
	interval: 3000

	});*/

	return(

		<div className="container p-0">

			<section className="jd-slider example">
				<div className="slide-inner">
					<ul className="slide-area">
						<li>
							<img alt="" src={img1}/>
						</li>
						<li>
							<img alt="" src={img2}/>
						</li>
						<li>
							<img alt="" src={img3}/>
						</li>
					</ul>
				</div>
				<a className="prev" href="#/">
					<i className="fas fa-angle-left fa-2x text-white pl-5"></i>
				</a>
				<a className="next" href="#/">
					<i className="fas fa-angle-right fa-2x text-white pr-5"></i>
				</a>
				<div className="controller">
					<a href="#/" className="auto d-none">
						<i className="fas fa-play fa-xs"></i>
						<i className="fas fa-pause fa-xs"></i>
					</a>
					<div className="indicate-area d-none d-lg-block"></div>
				</div>
			</section>

		</div>
	)
}