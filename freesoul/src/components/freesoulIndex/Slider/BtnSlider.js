import React from "react";
import "../../../App.css";
import { IconContext } from "react-icons";
import {VscChevronLeft} from "react-icons/vsc";
import {VscChevronRight} from "react-icons/vsc";

export default function BtnSlider({ direction, moveSlide }) {
  var icon;
  if(direction === "next"){
    icon = <VscChevronRight/>; 
  }
  else{
    icon = <VscChevronLeft/>;
  }
  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
      <IconContext.Provider value={{ style:{ color:"#000", width:"auto", height:"70px"}}}>
        {icon}
      </IconContext.Provider>
    </button>
  );
}
