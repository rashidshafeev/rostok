import React from 'react'
import formcheck from '@/shared/assets/icons/form-check-input.svg';
import formcheckactive from '@/shared/assets/icons/form-check-input-active.svg';


function CustomRadioButton({ value, checked, handleChange, children, className }) {



  return (
    <div className={`${className} p-4 border ${checked ? 'border-colGreen' : 'border-colLightGray'} hover:border-colGreen rounded cursor-pointer flex gap-3`} data-customvalue={value} onClick={handleChange}>
        <div >{checked ? <img src={formcheckactive} /> : <img src={formcheck} />}</div>
            {children}</div>
  )
}

export default CustomRadioButton