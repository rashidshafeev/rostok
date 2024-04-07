import React, { useState } from 'react'
import inactive from '../../assets/icons/comparison-card-inactive.svg'
import active from '../../assets/icons/comparison-card-active.svg'
import hover from '../../assets/icons/comparison-green.svg'

function ComparisonIcon(props) {
  const [iconState, setIconState] =  useState(props.comparison ? 'active' : 'inactive');
  if((props.comparison ? 'active' : 'inactive') != iconState) {
  setIconState(props.comparison ? 'active' : 'inactive')

  }

  // const handleMouseEnter = () => {
  //   console.log(iconState === 'inactive')
  //   if (iconState === 'inactive') {
  //     console.log(iconState)
  //     setIconState('hover');
  //   console.log(iconState)
  //   }

  // };

  // const handleMouseLeave = () => {
  //   if (iconState === 'hover') {
  //     setIconState('inactive');
  //   }
  // };



  return (
    <div
      { ...props}>
      {/* // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}> */}

      {iconState === 'active' && <img className='w-3 h-3' src={active} alt='icon' />}
      {iconState === 'inactive' && <img className='w-3 h-3' src={inactive} alt='icon' />}
      {iconState === 'hover' && <img className='w-3 h-3' src={hover} alt='icon' />}

    </div>
  )
}

export default ComparisonIcon
