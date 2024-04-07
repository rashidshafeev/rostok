import React from 'react'

function ProductAttributeValue({ id, value, current, handleChangeAttribute }) {
 
  return (
    <>
      <div data-id={id} data-value={value.value} data-text={value.text} onClick={handleChangeAttribute}
        className={`h-12 px-3 border ${value.value == current[id].value ? 'border-colGreen' : 'border-colLightGray'} hover:border-colGreen ${value.availible ? 'bg-transparent' : 'bg-colLightGray'} rounded-[10px] flex justify-center items-center `} >

        {value.color ? (<div style={{ backgroundColor: `${value.color}` }} className={`w-10 h-10 rounded-full border`}></div>) : (value.text)}


      </div>
    </>

  )
}

export default ProductAttributeValue