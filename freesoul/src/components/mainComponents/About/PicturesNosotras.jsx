import React from "react";
import Laura from './6054.jpg';
import  Sandra from './4066.jpg';
import Alexandra from './Alexa.jpg';

function PictureNosotras() {
  return (
    <div className="product-list">
      <div className="imagen">
        <img
          className= "img-thumbnail"
          alt="Sandra"
          src={Sandra}
        />
        <h2 className="modalPrice">Sandra Gamboa</h2>
      </div>
      <div className="imagen">
        <img
          className= "img-thumbnail"
          alt="Laura"
          src={Laura}
        />
        <h2 className="modalPrice">Laura Castañeda</h2>
      </div>
      <div className="imagen">
        <img
          className= "img-thumbnail"
          alt="Alexandra"
          src={Alexandra}
        />
        <h2 className="modalPrice">Alexandra Jimenez</h2>
      </div>
    </div>
  );
}
export default PictureNosotras;
