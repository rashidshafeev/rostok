import { api } from '@/shared/api/api';
import type { ErrorResponse } from '@/entities/order/api/orderApi';

export const fastOrderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    oneClickOrder: builder.mutation<
      { success: string },
      { name: string; phone: string; item_id: number }
    >({
      query: (data) => ({
        url: '/api/ProductOrders/oneClick',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [
        { type: 'Cart', id: 'LIST' },
        { type: 'Order', id: 'LIST' },
      ],
      transformErrorResponse: (response: ErrorResponse) => {
        if (response?.data?.err_code) {
          switch (response.data.err_code) {
            case 'productorders_one_click__name_not_passed':
              return { message: 'Имя не передано' };
            case 'productorders_one_click__phone_not_passed':
              return { message: 'Телефон не передан' };
            case 'productorders_one_click__incorrect_phone_number':
              return { message: 'Некорректный номер телефона' };
            case 'productorders_one_click__message_not_sended':
              return { message: 'Не могу послать сообщение, попробуйте позже' };
          }
        }
        return { message: 'Ошибка при оформлении заказа' };
      },
    }),
  }),
});

export const { useOneClickOrderMutation } = fastOrderApi;