import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Filters, FiltersState } from '@/types/Filters/Filters';
import { Category } from '@/types/catalog/Category';

interface CatProductsProps {
  initialFilters?: FiltersState;
}

const CatProducts: React.FC<CatProductsProps> = ({ initialFilters }) => {
  const [filters, setFilters] = useState<FiltersState>(initialFilters || { basics: {}, dynamics: [] });
  const [filtersLoading, setFiltersLoading] = useState<boolean>(false);
  const [filtersBlock, setFiltersBlock] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<'categoryId' | 'tags' | 'brands' | 'filters' | ''>('');
  
  const previousFilters = useRef<FiltersState>({ basics: {}, dynamics: [] });
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  const getNewFiltersList = async (sendObject: FiltersSendObject, trigger: typeof trigger) => {
    if (trigger === 'categoryId' || trigger === 'tags' || trigger === 'brands') {
      setFiltersLoading(true);
    } else if (trigger === 'filters') {
      setFiltersBlock(true);
    }

    try {
      const newFilters = await getFilters(sendObject).unwrap();
      const more = newFilters.more.map(obj => ({
        ...obj,
        additional_filter: true
      }));

      const newDynamics = [...newFilters.dynamics, ...more];
      const newFiltersState: FiltersState = {
        basics: newFilters.basics,
        dynamics: newDynamics,
      };

      navigate(`?${buildQueryParams(getSendFiltersObject2(newFiltersState), sort, page)}`, { replace: true });

      previousFilters.current = newFiltersState;
      setFilters(newFiltersState);
      setTrigger(trigger);
    } finally {
      if (trigger === 'categoryId' || trigger === 'tags' || trigger === 'brands') {
        setFiltersLoading(false);
      } else if (trigger === 'filters') {
        setFiltersBlock(false);
      }
    }
  };

  return (
    <div>
      {/* Ваш JSX код */}
    </div>
  );
};

export default CatProducts; 