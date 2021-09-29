import React from "react";

function PictureNosotras() {
  return (
    <div className="product-list">
      <img
        className= "imagen"
        alt="Product"
        src={process.env.PUBLIC_URL + `/Camisetas/rsz_img_9818.jpg`}
      ></img>
            <img
        className= "imagen"
        alt="Product"
        src={process.env.PUBLIC_URL + `/Camisetas/rsz_img_9818.jpg`}
      ></img>
            <img
        className= "imagen"
        alt="Product"
        src={process.env.PUBLIC_URL + `/Camisetas/rsz_img_9818.jpg`}
      ></img>
    </div>
  );
}
export default PictureNosotras;
