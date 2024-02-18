import React, { useEffect } from 'react'
import "./SliderButton.css"

export const SliderButton = ({ on, off, onClick, isOn, name, id }) => {
  
    return (
        <div id="slider-div1" onClick={onClick} >
            <div>
                {off}
            </div>
            <div>
                {on}
            </div>
            <div id="slider_on" className={`slider_${isOn?"right":"left"}`} >
                {
                   isOn?on:off 
                }
            </div>
        </div>
    )
}
