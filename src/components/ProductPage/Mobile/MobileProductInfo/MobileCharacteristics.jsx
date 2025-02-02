import React from 'react'

function MobileCharacteristics({ current, product }) {
  return (
    <>
            <h3 className='text-2xl my-5 font-semibold'>Характеристики</h3>

            <div className='flex flex-wrap flex-col gap-3'>
                <div className='flex items-end basis-[calc(100%/2-10px)]'>
                    <div className='shrink leading-none text-colDarkGray mr-1'>Код товара</div>
                    <div className='grow border-b-2 border-dotted'></div>
                    <div className='flex items-end leading-none shrink ml-1'>
                        {current?.sku}
                    </div>
                </div>
                {
                    product?.attributes?.map((attribute, index) => {
                        {/* Если атрибут модификационный выводит значение актуальное для модификации, если нет, то общее значение атрибута */}

                        if (current?.attributes?.some( modAttr => modAttr.id === attribute.id)) {
                            return(
                                <div className='flex items-end'>
                                    <div className='shrink self-start leading-none text-colDarkGray mr-1'>{attribute.name}</div>
                                    <div className='grow self-start h-4 border-b-2 border-dotted'></div>
                                    <div className='flex text-end leading-none shrink ml-1 max-w-[50%] break-all'>
                                        {current?.attributes?.find( modAttr => modAttr.id === attribute.id).text }
                                    </div>
                                </div>
                            ) 
                        } else if ( attribute.values[0].text ) {
                            return(
                                <div className='flex items-end'>
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

            <h3 className='text-2xl mt-5 mb-[10px] font-semibold'>Описание</h3>
            <div className='text-[14px]'>
                {product.description || 'Интерьерное напольное велюровое кресло для отдыха - это винтаж кресло в современном исполнении, которое станем ярким аксессуаром в вашем доме. Кресло изготовлено в России, на фабрике, которая занимает одно из ведущих мест в мебельном рынке. Невероятно удобное широкое мебельное кресло с подлокотниками буквально окутывает своим комфортом, располагая выпить чашечку чая за столиком, провести время за чтением любимой книги или посмотреть телевизор. Особую статность придают высокие деревянные ножки в цвете тёмный венге. Кресло имеет деревянный каркас из хвойного бруса и березовой фанеры. Наше интерьерное стулкресло отлично подойдет в гостиную и спальню, прекрасно впишется на кухню и в детскую комнату. А так же послужит дополнением для веранды или как мебель для дачи и сада, а так же просторной прихожей, коридора и балкона. Просторная лоджия может стать уголком релакса, если наше кресло и пуф окажутся там. Станет ярким элементом в салоне красоты, спа или в педикюрном кабинете, станет отличным местом работы для бровиста, так же подойдет для зон ожидания клиентов, шикарно дополнит офисное пространство в конференц зале. В нашем магазине представлены прикроватные тумбы, пуфики из этой же коллекции мебели, а также декоративные подушки, поэтому вы с лёгкостью под себя сможете составить комплект, а также купить его в подарок близкому человеку. Товар сертифицирован! Сборка комфортна и не требует подручных инструментов, достаточно лишь вкрутить опоры, которые идут в комплекте и ваше кресло готово. Почувствуйте домашний уют и насладитесь комфортом наших кресел!'}
            </div>

            {/* <h3 className='text-2xl mt-5 mb-[10px] font-semibold'>Комплектация</h3>
            <div className='text-[14px]'>
                Комплект ножек 1шт, подпятники, паспорт изделия, инструкция
            </div> */}
        </>
  )
}

export default MobileCharacteristics