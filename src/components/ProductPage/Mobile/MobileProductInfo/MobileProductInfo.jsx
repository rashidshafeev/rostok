import React from 'react'
import MobileCharacteristics from './MobileCharacteristics'
import MobileFiles from './MobileFiles'
import MobileReviews from './MobileReviews'
import MobileInfo from './MobileInfo'

function MobileProductInfo({ current, product }) {
    return (
        <>
            <div className='mt-10'>
                <MobileCharacteristics current={current} product={product} />

            </div>
            <div className='mt-20'>
                <MobileFiles product={product} />

            </div>
            <div className='mt-20'>
                <MobileReviews reviews={product.reviews} />

            </div>
            <div className='mt-20 mb-10'>
                <MobileInfo />

            </div>


        </>
    )
}

export default MobileProductInfo