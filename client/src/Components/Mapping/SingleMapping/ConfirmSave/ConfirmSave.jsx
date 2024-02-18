import React, { useState } from 'react'
import "./ConfirmSave.css"
import { IP_ADDERESS, PORT } from '../../../../config/config'
import axios from 'axios'
import { Spinner } from '@chakra-ui/react'
const ConfirmSave = ({ setShowConfirmSave, ip }) => {

    const [loading, setLoading] = useState(false)

    async function saveMap() {
        try {
            setLoading(true)
            // console.log(ip);
            const { data } = await axios.post(`http://${IP_ADDERESS}:${PORT}/map/save`, { ip })
            console.log(data);
            setShowConfirmSave(false)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }

    }

    return (
        <div className='mapping-confirmSave' >
            <div className='mapping-confirmSave-main'>
                <h1>CONFIRM SAVING MAP ?</h1>
                {loading && <Spinner

                    thickness='5px'

                    speed='0.65s'

                    emptyColor='gray.200'

                    color='blue.500'

                    size='s'

                />}
                <div className='mapping-confirmSave-main-1'>
                    <button className='mapping-confirmSave-cancel' onClick={() => { setShowConfirmSave(false) }} >CANCEL</button>
                    <button className='mapping-confirmSave-yes' onClick={saveMap} >YES</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmSave
