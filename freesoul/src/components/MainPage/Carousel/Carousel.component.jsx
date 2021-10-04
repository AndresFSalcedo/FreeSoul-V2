import React from 'react';
// import "../../../scripts/jdSlider"
// import "../../../scripts/script";

function Carousel() {
  
  return (
    <div>
      <div className="container p-0">

        <section className="jd-slider example">
          <div className="slide-inner">
            <ul className="slide-area">
              <li>
                <img src={process.env.PUBLIC_URL + `/Imgs/img1.jpg`} alt="pic"/>
              </li>
              <li>
                <img src={process.env.PUBLIC_URL + `/Imgs/img2.jpg`} alt="pic"/>
              </li>
              <li>
                <img src={process.env.PUBLIC_URL + `/Imgs/img3.jpg`} alt="pic"/>
              </li>
            </ul>
          </div>
          <a className="prev" href="#">
            <i className="fas fa-angle-left fa-2x text-white pl-5"></i>
          </a>
          <a className="next" href="#">
            <i className="fas fa-angle-right fa-2x text-white pr-5"></i>
          </a>
          <div className="controller">
            <a href="#" className="auto d-none">
              <i className="fas fa-play fa-xs"></i>
              <i className="fas fa-pause fa-xs"></i>
            </a>
            <div className="indicate-area d-none d-lg-block"></div>
          </div>
        </section>

      </div>

    </div>
  )
}

export default Carousel;
