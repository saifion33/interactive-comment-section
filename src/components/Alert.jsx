import React from 'react'


const Alert = (props) => {
    return (
        <div className={`p-3 rounded-3xl z-50 ${props.alertType === 'successful' ? 'bg-green-600' : 'bg-red-600 '}`}>
            {props.alertMessage}
        </div>
    )
}

export default Alert
