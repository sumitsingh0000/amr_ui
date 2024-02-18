import React from 'react'
import './InputData.css';

const InputData = ({ data, name }) => {
    //  console.log(data);
    return (
        <div className='input_Data-main' >
            <div className='input_Data-main_1'>{name}</div>
            <div className='input_Data-main_2'>
                {data.map((e, i) => {
                    return <div key={i+"a"} className={`input_Data-main_2_${e.data?"green":"red"}`} >{e.name}</div>
                })}
            </div>

        </div>
    )
}

export default InputData
