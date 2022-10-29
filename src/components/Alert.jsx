import React from 'react'


const Alert = (props) => {
    return (
        <div className={`p-3 rounded-3xl z-50 font-semibold text-white ${props.alertType === 'successful' ? 'bg-green-600 dark:bg-[#7EBAFF] dark:text-slate-900 ' : 'bg-red-600 dark:bg-[#FF9389] dark:text-slate-900'}`}>
            {props.alertMessage}
        </div>
    )
}

export default Alert
