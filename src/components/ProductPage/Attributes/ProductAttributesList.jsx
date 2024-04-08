import React, { useState } from 'react'
import { ClickAwayListener, Popover } from '@mui/material';
import ProductAttribute from './ProductAttribute';
import ProductAttributeValue from './ProductAttributeValue';




function ProductAttributesList({list, current, handleChangeAttribute}) {

    console.log(list, current)
    
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handlePopoverClose = () => {
      setAnchorEl(null);
    };
  
    open = Boolean(anchorEl)

  
  
    
    return (
        <>
        {Object.keys(list).map( attr => {
            return (
                // <ProductAttribute  key={attr} id={attr} attribute={list[attr]} current={current} handleChangeAttribute={handleChangeAttribute}/>
                <div key={attr}>
                    <div className='flex' ><p className='text-colDarkGray mr-1'>{list[attr].name}:</p>{current[attr].text ?? 'test'}</div>
                    <Popover
                        id="mouse-over-popover"
                        sx={{
                            pointerEvents: 'none',
                        }}
                        open={open}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                    // container={anchorEl.parentNode}
                    >
                        <div className='h-[100px]'>
                            I use Popover.
                        </div>

                    </Popover>
                    <div className='flex flex-wrap gap-2'>
                        {list[attr].values.map((value, i) => <ProductAttributeValue key={i} id={attr} value={value} current={current} handleChangeAttribute={handleChangeAttribute} />)}
                       
                        
                    </div>
                </div>
            )
        })}
        

            {/* <div className='flex'><p className='text-colDarkGray mr-1'>Цвет:</p>Черный</div>

            <div className='flex flex-wrap gap-2'>

                <div className='w-12 h-12 border border-colLightGray hover:border-colGreen rounded-[10px] flex justify-center items-center' onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}>

                    <Popover
                        id="mouse-over-popover"
                        sx={{
                            pointerEvents: 'none',
                        }}
                        open={open}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                    // container={anchorEl.parentNode}
                    >
                        <div className='h-[100px]'>
                            I use Popover.
                        </div>

                    </Popover>

                    <img src="" alt="" className='w-10 h-10 rounded-full' />
                </div>

                <div className='w-12 h-12 border border-colLightGray hover:border-colGreen rounded-[10px] flex justify-center items-center' >
                    <img src="" alt="" className='w-10 h-10 rounded-full' />
                </div>
                <div className='w-12 h-12 border border-colLightGray hover:border-colGreen rounded-[10px] flex justify-center items-center' >
                    <img src="" alt="" className='w-10 h-10 rounded-full' />
                </div>
                <div className='w-12 h-12 border border-colLightGray hover:border-colGreen rounded-[10px] flex justify-center items-center' >
                    <img src="" alt="" className='w-10 h-10 rounded-full' />
                </div>
            </div> */}
            
        </>
    )
}

export default ProductAttributesList