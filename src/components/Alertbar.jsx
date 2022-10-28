import React from 'react'
import Alert from './Alert'
const Alertbar = (props) => {

    return (
        <div className="alertbar sticky top-20 z-40 mx-auto w-fit h-12 flex justify-center items-center py-8 ">
            {
                props.alertVisible && <Alert alertType={props.alertType} alertMessage={props.alertMessage} />
            }
        </div>
    )
}

export default Alertbar

