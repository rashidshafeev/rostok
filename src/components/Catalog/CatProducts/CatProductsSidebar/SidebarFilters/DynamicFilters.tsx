import { Filters } from '@/types/Filters/Filters';

interface DynamicFiltersProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  hideAdditional?: boolean;
}

const DynamicFilters: React.FC<DynamicFiltersProps> = ({ filters, setFilters, hideAdditional = true }) => {
  return (
    filters?.dynamics?.map((filter) => {
      if (filter.additional_filter !== hideAdditional) return (
        <div key={filter.id} className="sm:basis-[calc(33%-(20px*2/3))] md:basis-[calc(25%-(20px*3/4))] basis-full">
          <CheckboxFilter filter={filter} filters={filters} setFilters={setFilters} />
        </div>
      );
    })
  );
}

export default DynamicFilters; 