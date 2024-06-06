import React, { useEffect, useState } from 'react'
import questions from './faq'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { StyledAccordion, StyledAccordionDetails, StyledAccordionSummary } from '../../helpers/FAQStyledAccordion';

function FAQ() {

  const [currentGroup, setCurrentGroup] = useState(questions[0].id)

  useEffect(() => {
    scrollToTop();
  }, []);


  return (
    <div className='pb-6 content'>
        <h1 className='  text-[40px] font-semibold text-colBlack py-5'>
            Сравнение товаров
          </h1>
          <div className='flex gap-[20px]'>
            <div className=' basis-[calc(20%-20px/2)] gap-2'>
              {questions.map((question, index) => {
                return (
                  <div class={`p-2  rounded font-semibold cursor-pointer ${ question.id === currentGroup ? 'bg-colLightGray' : ''}`}
                  onClick={() => setCurrentGroup(question.id)}>
                     {question.group}
                  </div>
                )
              })}
            </div>
            <div className=' basis-[calc(80%-20px/2)]'>
              <div className=' text-2xl font-semibold pb-5'> Частые вопросы   </div>
              <div className='flex flex-wrap gap-5'>
                {questions.find(question => question.id === currentGroup).qa.map((question, index)  =>  {
                  return  (
                    <StyledAccordion className=' basis-[calc(50%-20px/2)] p-5 rounded-xl shadow h-full mt-0'>
                    <StyledAccordionSummary
                    className='font-semibold'
                      expandIcon={<KeyboardArrowDownIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                               {question.question}             
                    </StyledAccordionSummary>
                    <StyledAccordionDetails>
                    {question.answer}
                    </StyledAccordionDetails>
                  </StyledAccordion>
                  )
                })}
                <div></div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default FAQ