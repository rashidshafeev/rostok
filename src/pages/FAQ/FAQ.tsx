import React, { useEffect, useState, useMemo } from 'react'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { StyledAccordion, StyledAccordionDetails, StyledAccordionSummary } from '@helpers/FAQStyledAccordion';
import { scrollToTop } from '@utils/scrollToTop';
import { useGetFaqQuery } from '@/redux/api/contentEndpoints';
import { Loading } from '@/helpers/Loader/Loader';

interface TextBlock {
  id: string;
  type: string;
  data: {
    text: string;
    level?: number;
    items?: Array<{ content: string }>;
  };
}

interface FaqItem {
  title: string;
  text: TextBlock[];
  group: string;
}

const renderTextBlock = (block: TextBlock) => {
  switch (block.type) {
    case 'header':
      const HeaderTag = `h${block.data.level || 3}` as keyof JSX.IntrinsicElements;
      return (
        <HeaderTag key={block.id} className="font-semibold my-2">
          {block.data.text}
        </HeaderTag>
      );
    case 'paragraph':
      return (
        <p key={block.id} className="mb-2" dangerouslySetInnerHTML={{ __html: block.data.text }} />
      );
    case 'list':
      return (
        <ul key={block.id} className="list-disc ml-6 mb-2">
          {block.data.items?.map((item, index) => (
            <li key={index}>{item.content}</li>
          ))}
        </ul>
      );
    default:
      return null;
  }
};

function FAQ() {
  const { data: faqData, isLoading } = useGetFaqQuery();
  const [currentGroup, setCurrentGroup] = useState<string>('');

  const groupedQuestions = useMemo(() => {
    if (!faqData?.data) return [];
    
    const groups = new Set(faqData.data.map(item => item.group));
    return Array.from(groups).map(groupName => ({
      group: groupName,
      questions: faqData.data.filter(item => item.group === groupName)
    }));
  }, [faqData]);

  useEffect(() => {
    scrollToTop();
    if (groupedQuestions.length > 0) {
      setCurrentGroup(groupedQuestions[0].group);
    }
  }, [groupedQuestions]);

  if (isLoading) {
    return <Loading />;
  }

  const currentQuestions = groupedQuestions.find(g => g.group === currentGroup)?.questions || [];

  return (
    <div className='pb-6 content'>
      <h1 className='text-[40px] font-semibold text-colBlack py-5'>
        Часто задаваемые вопросы
      </h1>
      {groupedQuestions.length > 0 ? (
        <div className='flex gap-[20px]'>
          <div className='basis-[calc(20%-20px/2)] gap-2'>
            {groupedQuestions.map((group) => (
              <div 
                key={group.group}
                className={`p-2 rounded font-semibold cursor-pointer ${group.group === currentGroup ? 'bg-colLightGray' : ''}`}
                onClick={() => setCurrentGroup(group.group)}
              >
                {group.group}
              </div>
            ))}
          </div>
          <div className='basis-[calc(80%-20px/2)]'>
            <div className='text-2xl font-semibold pb-5'>
              {currentGroup}
            </div>
            <div className='flex flex-wrap gap-5'>
              {currentQuestions.map((question, index) => (
                <StyledAccordion 
                  key={index}
                  className='basis-[calc(50%-20px/2)] p-5 rounded-xl shadow h-full mt-0'
                >
                  <StyledAccordionSummary
                    className='font-semibold'
                    expandIcon={<KeyboardArrowDownIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                  >
                    {question.title}
                  </StyledAccordionSummary>
                  <StyledAccordionDetails>
                    {question.text.map((block) => renderTextBlock(block))}
                  </StyledAccordionDetails>
                </StyledAccordion>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          Нет доступных вопросов
        </div>
      )}
    </div>
  )
}

export default FAQ