import copyicon from '@assets/icons/copy-icon.svg';
import { toast } from 'sonner';
import CopyButton from '../common/CopyButton';

function CharacteristicsList({ current, product, setTabIndex }) {
 
    return (
        <>
            <div className='flex flex-col gap-[10px]'>
                <div className='flex items-end'>
                    <div className='shrink leading-none text-colDarkGray mr-1'>Код товара</div>
                    <div className='grow border-b-2 border-dotted'></div>
                    <div className='flex items-end leading-none shrink ml-1'>
                        {current?.sku}
                        <CopyButton 
                            textToCopy={current?.sku} 
                            toastMessage="Код товара скопирован"
                            containerClassName="ml-1"
                        />
                    </div>
                </div>
                {
                    current?.attributes?.slice(0,6).map((attribute) => {
                        {/* Если атрибут модификационный выводит значение актуальное для выбранной на данный момент модификации, если нет, то общее значение атрибута */}

                        if (current?.attributes?.some( modAttr => modAttr.id === attribute.id)) {
                            return(
                                <div key={attribute.id} className='flex items-end'>
                                    <div className='shrink self-start leading-none text-colDarkGray mr-1'>{attribute.name}</div>
                                    <div className='grow self-start h-4 border-b-2 border-dotted'></div>
                                    <div className='flex text-end leading-none shrink ml-1 max-w-[50%] break-all'>
                                        {current?.attributes?.find( modAttr => modAttr.id === attribute?.id).text}
                                    </div>
                                </div>
                            ) 
                        } else if ( attribute.values[0].text ) {
                            return(
                                <div key={attribute.id} className='flex items-end'>
                                <div className='shrink self-start leading-none text-colDarkGray mr-1'>{attribute.name}</div>
                                <div className='grow self-start h-4 border-b-2 border-dotted'></div>
                                <div className='flex text-end leading-none shrink ml-1 max-w-[50%] break-all'>
                                    { attribute.values[0].text }
                                </div>
                            </div>
                            ) 
                        }
                    })

                }
                {
                    product?.attributes?.slice(0,6).map((attribute) => {
                        {/* Если атрибут модификационный выводит значение актуальное для выбранной на данный момент модификации, если нет, то общее значение атрибута */}

                        if (current?.attributes?.some( modAttr => modAttr.id === attribute.id)) {
                            return(
                                <div key={attribute.id} className='flex items-end'>
                                    <div className='shrink self-start leading-none text-colDarkGray mr-1'>{attribute.name}</div>
                                    <div className='grow self-start h-4 border-b-2 border-dotted'></div>
                                    <div className='flex text-end leading-none shrink ml-1 max-w-[50%] break-all'>
                                        {current?.attributes?.find( modAttr => modAttr.id === attribute.id).text}
                                    </div>
                                </div>
                            ) 
                        } else if ( attribute.values[0].text ) {
                            return(
                                <div key={attribute.id} className='flex items-end'>
                                <div className='shrink self-start leading-none text-colDarkGray mr-1'>{attribute.name}</div>
                                <div className='grow self-start h-4 border-b-2 border-dotted'></div>
                                <div className='flex text-end leading-none shrink ml-1 max-w-[50%] break-all'>
                                    { attribute.values[0].text }
                                </div>
                            </div>
                            ) 
                        }
                    })

                }
                
               

            </div>
            
            {product?.attributes?.length > 7 && <a  href="#char"><div onClick={() => { setTabIndex(0)}} className='text-colGreen font-semibold underline underline-offset-8 cursor-pointer mt-3'>Все характеристики</div></a>}
        </>
    )
}

export default CharacteristicsList