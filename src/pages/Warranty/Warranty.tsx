import { useEffect, useState } from 'react'
import fizlico from '@/shared/assets/icons/fizlico-inactive.svg';
import urlico from '@/shared/assets/icons/urlico-inactive.svg';
import { scrollToTop } from '@/shared/lib/scrollToTop';
import { useModal } from '@/features/modals/model/context';
import { useGetGuaranteeQuery } from '@/redux/api/contentEndpoints';
import { Loading } from '@/shared/ui/Loader';

function Warranty() {
    const [type, setType] = useState<'individual' | 'legal'>('legal');
    const { data: guarantee, isLoading } = useGetGuaranteeQuery();

    const { showModal } = useModal();

    useEffect(() => {
        scrollToTop();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    const content = guarantee?.data[type] || [];

    return (
        <div className="content lining-nums">
            <h3 className='text-2xl my-5 font-semibold'>Гарантия и возврат</h3>

            <div className="flex gap-5 mb-[40px]">
                <div className='flex flex-col gap-5 shrink basis-[calc(30%-10px)]'>
                    <div 
                        className={`flex items-center p-5 border ${type === 'individual' ? 'border-colGreen' : 'border-colLightGray'} rounded-[10px] gap-3 cursor-pointer`} 
                        onClick={() => setType('individual')}
                    >
                        <div className='mb-[10px]'>
                            <img className='w-10 h-10' src={fizlico} alt="Физическое лицо" />
                        </div>
                        <span className='font-semibold'>Физическое лицо</span>
                    </div>

                    <div 
                        className={`flex items-center p-5 border ${type === 'legal' ? 'border-colGreen' : 'border-colLightGray'} rounded-[10px] gap-3 cursor-pointer`}
                        onClick={() => setType('legal')}
                    >
                        <div className='mb-[10px]'>
                            <img className='w-10 h-10' src={urlico} alt="Юридическое лицо" />
                        </div>
                        <span className='font-semibold'>Юридическое лицо</span>
                    </div>
                </div>

                <div className='grow basis-[calc(70%-10px)]'>
                    <div className='border border-colLightGray rounded-[10px] p-5'>
                        {content.map((block: any) => {
                            switch (block.type) {
                                case 'header':
                                    const HeaderTag = `h${block.data.level}` as keyof JSX.IntrinsicElements;
                                    return (
                                        <HeaderTag key={block.id} className="font-semibold my-4">
                                            {block.data.text}
                                        </HeaderTag>
                                    );
                                case 'paragraph':
                                    return (
                                        <p key={block.id} className="mb-4" dangerouslySetInnerHTML={{ __html: block.data.text }} />
                                    );
                                case 'list':
                                    return (
                                        <ul key={block.id} className={`ml-6 mb-4 ${block.data.style === 'ordered' ? 'list-decimal' : 'list-disc'}`}>
                                            {block.data.items.map((item: any, index: number) => (
                                                <li key={index} className="mb-2">
                                                    {item.content}
                                                    {item.items.length > 0 && (
                                                        <ul className="list-disc mt-2">
                                                            {item.items.map((subItem: any, subIndex: number) => (
                                                                <li key={subIndex} className="ml-6 mb-2">
                                                                    {subItem.content}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    );
                                default:
                                    return null;
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Warranty;