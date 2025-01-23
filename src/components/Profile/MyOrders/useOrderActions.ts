import {
  useCancelOrderMutation,
  useRepeatOrderMutation,
  useCreatePDFOrderMutation,
} from '@/entities/order';
import { useModal } from '@/features/modals';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useOrderActions = (orderNumber: string) => {
  const navigate = useNavigate();
  const [cancelOrder] = useCancelOrderMutation();
  const [repeatOrder] = useRepeatOrderMutation();
  const [createPDFOrder] = useCreatePDFOrderMutation();
  const { showModal } = useModal();

  const handleCancelClick = async () => {
    try {
      await cancelOrder({
        order_number: orderNumber,
        reason: 'User requested cancellation',
      }).unwrap();
    } catch (err: unknown) {
      console.error('Error canceling order:', err);
    }
  };

  const handleRepeatClick = async () => {
    try {
      const result = await repeatOrder({
        order_number: orderNumber,
      }).unwrap();
      if (result.success === 'ok') {
        navigate('/profile/orders/');
        toast.success('Заказ успешно повторен');
      }
    } catch (err: unknown) {
      console.error('Error repeating order:', err);
      showModal({
        type: 'confirmation',
        title: 'Ошибка',
        text: 'Не удалось повторить заказ. Пожалуйста, попробуйте позже.',
        action: () => {},
      });
    }
  };

  const handleDownloadClick = async () => {
    try {
      const result = await createPDFOrder({
        order_number: orderNumber,
      }).unwrap();

      if (result.success === 'ok' && result.file) {
        const url = window.URL.createObjectURL(result.file);
        const link = document.createElement('a');
        link.href = url;
        link.download = `order-${orderNumber}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (err: unknown) {
      console.error('Error downloading PDF:', err);
      showModal({
        type: 'confirmation',
        title: 'Ошибка',
        text: 'Не удалось скачать PDF. Пожалуйста, попробуйте позже.',
        action: () => {},
      });
    }
  };

  return {
    handleCancelClick,
    handleRepeatClick,
    handleDownloadClick,
  };
};
