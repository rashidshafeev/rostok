import React from 'react'
import ProductAttributeValue from './ProductAttributeValue'


function ProductAttribute({id, attribute, current, handleChangeAttribute}) {

    console.log("attr")
    console.log(attribute)
  return (
    <>
      <div className='flex'><p className='text-colDarkGray mr-1'>{attribute.name}:</p>{current[id].text}</div>
      <div className='flex flex-wrap gap-2'>
        {attribute.values.map((value) => <ProductAttributeValue key={id} id={id} value={value} current={current} handleChangeAttribute={handleChangeAttribute} />)}

      </div>
    </>
  )
}

export default ProductAttribute