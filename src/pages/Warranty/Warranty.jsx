import { useEffect, useState } from 'react'

import fizlico from '../../assets/icons/fizlico-inactive.svg';
import urlico from '../../assets/icons/urlico-inactive.svg';
import { scrollToTop } from '../../helpers/scrollToTop/scrollToTop';
import { useModal } from '../../context/ModalContext';

function Warranty() {
    const [type, setType] = useState('urlico');


    const { showModal } = useModal();

    useEffect(() => {
        scrollToTop();
      }, []);
    


  return (
    <div className="content lining-nums ">
            <h3 className='text-2xl my-5 font-semibold'>Гарантия и возврат</h3>

            <div className="flex gap-5 mb-[40px]">
                <div className='flex flex-col gap-5 shrink basis-[calc(30%-10px)]'>

                    <div className={`flex items-end p-5 border ${ type === 'fizlico' ? 'border-colGreen' : 'border-colLightGray'}  rounded-[10px] gap-3`} onClick={() => setType('fizlico')}>
                        <div className='mb-[10px]'>
                            <img className='w-10 h-10' src={fizlico} alt="" />

                        </div>
                        
                        <div className='mb-[10px] font-semibold cursor-pointer mr-2 text-xl text-colGreen'>Для физических лиц</div>
                        

                    </div>
                    <div className={`flex items-end  p-5 border ${ type === 'urlico' ? 'border-colGreen' : 'border-colLightGray'}  rounded-[10px] gap-3`} onClick={() => setType('urlico')}>
                        <div className='mb-[10px]'>
                            <img className='w-10 h-10' src={urlico} alt="" />
                        </div>
                            <div className='mb-[10px] font-semibold cursor-pointer mr-2 text-xl text-colGreen'>Для юридических лиц</div>
                        

                    </div>
                    <button className={`flex items-center justify-center  p-5 border  bg-colGreen  rounded-[10px] gap-3`} onClick={() => showModal({ type: 'question'})}>
                        {/* <div className='mb-[10px]'>
                            <img className='w-10 h-10' src={urlico} alt="" />
                        </div> */}
                            <div className='font-semibold cursor-pointer mr-2 text-xl text-white'>Задать вопрос</div>
                        

                    </button>



                </div>

                {type === 'fizlico' &&  <div className='bg-colSuperLight h-full  p-5 rounded-[10px] basis-[calc(70%-10px)]'>
                <div className=' text-xl font-semibold mb-5'>Правила</div>
                <div className=' font-semibold mb-4'>Условия возврата мебельной фурнитуры надлежащего качества</div>
                <div className=' '>В соответствии с правилами, установленными гражданским законодательством, в том числе нормами законодательства о защите прав потребителей, право на возврат товара надлежащего качества имеют потребители — физические лица, приобретающие товар для личных, семейных, бытовых нужд.</div>
                <div className='flex gap-2 items-start mb-1'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div>Если вы самостоятельно забирали заказ,  у вас есть 14 дней на возврат качественной фурнитуры. Если заказ доставлялся транспортной компанией — 7 дней, не считая дня его получения.</div>
                <div className='flex gap-2 items-start mb-1'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div>К возврату принимаются только те изделия, которые не были в употреблении и у которых были сохранены товарный вид, упаковка, потребительские свойства, а также документ, подтверждающий факт и условия покупки, указанного товара. Отсутствие документа, подтверждающего факт и условия покупки, не лишает вас возможности ссылаться на другие доказательства приобретения товара в компании Росток</div>
                <div className='flex gap-2 items-start mb-1'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div>Транспортные расходы при возврате качественной фурнитуры несет покупатель</div>
                <div className='flex gap-2 items-start mb-4'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div>В случае отказа покупателем от заказа до его получения в транспортной компании, оплаченная за заказ денежная сумма возвращается покупателю за вычетом стоимости транспортных расходов за возврат. Сумма расходов за возврат заказа в данном случае является расходами, понесенными продавцом в связи с выполнением обязательств по доставке перед покупателем</div>

                <div className=' font-semibold mb-4'>Условия возврата брака</div>
                <div className='flex gap-2 items-start mb-1'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div>Если комплектующие вышли из строя, стали работать или выглядеть хуже по причине скрытых производственных дефектов, то компания в обязательном порядке устранит проблему — заменит неисправные детали или, если это невозможно, сам товар</div>
                    <div className='flex gap-2 items-start'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div>Для получения сервисного обслуживания достаточно направить претензию в личном кабинете с подробным описанием проблемы</div>
                    <div className='flex gap-2 items-start mb-4'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div>Для экспертизы могут потребоваться фото/видео материалы, фиксирующие неисправности продукта</div>
             
                <div className=' font-semibold mb-4'>Условия возврата средств</div>
                <div className=' mb-4'>В случае возврата всего заказа или его части, его стоимость будет возвращена в соответствии со способом оплаты, выбранном в заказе, и на основании заявления покупателя</div>
                <div className='flex gap-2 items-start mb-1'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div>При покупке мебельной фурнитуры за наличный расчет, возврат осуществляется наличными денежными средствами при предъявлении паспорта РФ, необходимого для оформления кассовых документов, и заявления о возврате</div>
                    <div className='flex gap-2 items-start mb-4'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div>При оплате банковской картой через терминал, возврат производится в кассе на банковскую карту по терминалу. Зачисление денежных средств на карточные счета физических лиц происходит в сроки, установленные банком, выпустившим карту</div>
                    <div className='flex gap-2 items-start mb-4'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div>При оплате онлайн, возврат осуществляется на расчетный счет по реквизитам банковского счета, указанного покупателем в заявлении, в течение 10 дней. Возврат производится только на реквизиты плательщика</div>
             
                    </div>}




                    
                {type === 'urlico' &&  <div className='bg-colSuperLight h-full p-5 rounded-[10px] basis-[calc(70%-10px)]'>
                <div className=' text-xl font-semibold mb-5'>Правила</div>
                <div className=' font-semibold mb-4'>Условия возврата мебельной фурнитуры надлежащего качества</div>
                    <div className=''>
                        <div className='flex gap-2 items-start mb-1'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div> Вы оформляете и отправляете на e-mail или передаете лично письмо на возврат товара в свободной форме на официальном бланке компании с реквизитами. В письме необходимо указать дату, кому адресовано письмо, номер счета (договора-оферты) или договора поставки, товар, который возвращается, количество, сумма, причина возврата. Возврат товара должен быть кратный упаковке и артикулы находиться в рабочей товарной матрице ООО «БОЯРД».
Письмо заверяется печатью и подписью руководителя компании.
Письмо на возврат товара не является основанием для возврата или зачета денежных средств</div>
                        <div className='flex gap-2 items-start mb-1'><div className=' min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div > 
                        <div>
                        В случае принятия продавцом положительного решения о возврате товара надлежащего качества, продавец направляет покупателю по электронной почте соглашение о возврате товара надлежащего качества.
После получения от менеджера 2 файлов соглашения о возврате товара надлежащего качества:

<div className='flex gap-2 items-start'> <div className=' min-w-1 min-h-1 rounded-full bg-colGreen mt-2'></div >  1-ый файл в формате PDF соглашение о возврате товара надлежащего качества, вы распечатываете и ставите свои печать и подпись и отправляете оригинал почтой или передаете с товаром продавцу, </div>
<div className='flex gap-2 items-start '> <div className=' min-w-1 min-h-1 rounded-full bg-colGreen mt-2'></div >  2-ой файл — скан подписанного со стороны продавца соглашения о возврате товара надлежащего качества, вы распечатываете и ставите свою печать и подпись, скан направляете менеджеру на электронную почту </div>
   
    
    
   
</div>



</div>
                    </div>
                        <div className='flex gap-2 items-start mb-1'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div> Вы передаете фурнитуру по оригиналу соглашения и накладной (при наличии). На складе продукция проходит проверку по номенклатуре, количеству и качеству</div>
                                
                                 <div className=' mb-4'>В случае если не будет претензий по количеству и качеству возвращенного товара, Продавец в течение 5 рабочих дней с момента приема товара выставит корректировочный счет-фактуру.
Если возврат товара не был согласован заранее и отсутствует дополнительное соглашение, фурнитура продавцом не принимается</div>ььт
                    <div className=' font-semibold mb-4'>Условия возврата средств</div>
                    <div className='flex gap-2 items-start mb-1'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div>Если при возврате товара образовался аванс, продавец вправе, уведомив покупателя, зачесть денежные средства в счет имеющейся задолженности, либо в счет иных поставок, если покупатель без промедления не заявит о ином</div>
                    <div className='flex gap-2 items-start mb-4'><div className='min-w-2 min-h-2 rounded-full bg-colGreen mt-2'></div>Возврат денежных средств осуществляется на основании письменного требования покупателя, с указанием платежных реквизитов с обязательной сверкой расчетов</div>
                   
                    
                    </div>}



            </div>


        </div>
  )
}

export default Warranty