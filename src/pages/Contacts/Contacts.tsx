import React, { useEffect } from 'react'
import QuestionForm from '@helpers/QuestionForm'
import { NavLink } from 'react-router-dom'
import vk from '@assets/images/vk.svg';
import telegram from '@assets/images/telegram.svg';
import whatsapp from '@assets/images/whatsapp.svg';
import { scrollToTop } from '@/shared/lib/scrollToTop';
import { useGetContactsQuery } from '@/redux/api/contentEndpoints';
import { Loading } from '@/shared/ui/Loader';
import { BranchCard } from '@/components/Contacts/BranchCard';
import { RequisitesTable } from '@/components/Contacts/RequisitesTable';

function Contacts() {
  const { data: contactsData, isLoading } = useGetContactsQuery();

  useEffect(() => {
    scrollToTop();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const branches = contactsData?.ProjectPageBranches || [];
  const companyData = contactsData?.props.data || [];

  return (
    <div className="content lining-nums proportional-nums">
      <h1 className='text-[32px] md:text-[40px] font-semibold text-colBlack my-3 md:my-5'>
        Контакты
      </h1>
      <div className="flex flex-col md:flex-row gap-5 items-start">
        <div className='w-full md:basis-[calc(50%-20px/2)] border border-colGreen rounded-xl p-4 md:p-5'>
          <div className='font-semibold text-xl md:text-2xl mb-3'>Мы всегда на связи</div>
          <div className='text-sm md:text-base'>Вы можете задать вопрос, который вас интересует. Мы постараемся ответить в ближайшее время. Будьте уверены, ваш вопрос не останется без внимания</div>

          <div className='flex flex-col md:flex-row gap-5 my-5'>
            <div className='w-full md:basis-[calc(50%-20px/2)]'>
              <p className='leading-[120%] pb-2 text-sm md:text-base'>
                Звоните по горячей линии
              </p>
              <h4 className='text-colBlack text-lg md:text-xl font-semibold lining-nums proportional-nums'>
                {companyData.find(item => item.id === 'Тел. /факс:')?.value || ''}
              </h4>
            </div>
            <div className='w-full md:basis-[calc(50%-20px/2)]'>
              <p className='leading-[120%] pb-2 text-sm md:text-base'>
                Пишите в соцсетях и мессенджерах
              </p>
              <div className='flex justify-start items-center space-x-4 md:space-x-3 pt-1'>
                <NavLink to='#' className="w-8 md:w-auto">
                  <img src={telegram} alt='*' className="w-full h-auto" />
                </NavLink>
                <NavLink to='#' className="w-8 md:w-auto">
                  <img src={whatsapp} alt='*' className="w-full h-auto" />
                </NavLink>
                <NavLink to='#' className="w-8 md:w-auto">
                  <img src={vk} alt='*' className="w-full h-auto" />
                </NavLink>
              </div>
            </div>
          </div>
          <div className='text-sm md:text-base'>Или оставляйте заявку</div>
          <QuestionForm />
        </div>
        <div className='w-full md:basis-[calc(50%-20px/2)] bg-colSuperLight rounded-xl p-4 md:p-5 flex flex-col'>
          <div className='font-semibold text-xl md:text-2xl mb-4 md:mb-5'>Реквизиты</div>
          <div className='flex flex-col gap-2 justify-between grow'>
            <RequisitesTable data={companyData} file={contactsData?.props.file} />
          </div>
        </div>
      </div>
      <h2 className='text-[32px] md:text-[40px] font-semibold text-colBlack my-3 md:my-5'>
        Контакты офисов и производств
      </h2>
      <div className="flex flex-col md:flex-row gap-5 mb-10 md:mb-20">
        {branches.map((branch) => (
          <BranchCard key={branch.id} branch={branch} />
        ))}
      </div>
    </div>
  )
}

export default Contacts