import React, {useState} from 'react'
import "./Slide.css";
import BtnSlider from './BtnSlider'
import dataSlider from './dataSlider'
import {apiRoute} from '../../../config/Config';

export default function Slider() {

    const [slideIndex, setSlideIndex] = useState(1)

    const nextSlide = () => {
        if(slideIndex !== dataSlider.length){
            setSlideIndex(slideIndex + 1)
        } 
        else if (slideIndex === dataSlider.length){
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if(slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1){
            setSlideIndex(dataSlider.length)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }

    dataSlider.sort( (first, second) =>{
        
        if (first.position < second.position){
            return -1
        }if (first.position > second.position){
            return 1
        }
        return 0
    })
   
    return (
        <div className="container-fluid">
            <div className="img-fluid container-slider mt-2"> 
                {dataSlider.map((obj, index) => {
                    return (
                        <div
                        key={dataSlider[index]._id}
                        className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
                        >
                            <img 
                            src={`${apiRoute}/show-slideImg/${dataSlider[index].picture}`}
                            alt={`img${index + 1}`}
                            />
                        </div>
                    )
                })}
                <BtnSlider moveSlide={nextSlide} direction={"next"} />
                <BtnSlider moveSlide={prevSlide} direction={"prev"}/>

                <div className="container-dots">
                    {Array.from({length: `${dataSlider.length}`}).map((item, index) => (
                        <div
                        key={`${dataSlider[index]._id}`}
                        onClick={() => moveDot(index + 1)}
                        className={slideIndex === index + 1 ? "dot active" : "dot"}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    )
}
