import { useGetOrdersFiltersQuery } from '@/entities/order/api/orderEndpoints';
import CSearchField from '@/shared/ui/inputs/CSearchField';
import CSelectField from '@/shared/ui/inputs/CSelectField';

export const OrderFilters = () => {
  const {
    data: filters,
    isLoading: filtersIsLoading,
    isSuccess: filtersIsSuccess,
  } = useGetOrdersFiltersQuery();

  const statuses =
    filters?.statuses?.map((el) => ({
      id: el.id,
      option: el.id,
      label: el.name,
    })) || [];

  return (
    <div className="max-w-[700px] w-full space-y-4 mb-5">
      <CSearchField
        label="Название/код товара или номер заказа"
        name="search"
        type="search"
      />
      <div className="grid grid-cols-2 gap-4">
        <CSelectField label="Статус заказа" name="status" options={statuses} />
      </div>
    </div>
  );
};
