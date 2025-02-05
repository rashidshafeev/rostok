import type React from 'react';
import { useState } from 'react';

import { Box, Modal } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { toast } from 'sonner';

import { useModal } from '@/features/modals/model/context';
import { CPhoneField } from '@/shared/ui/inputs/CPhoneField';
import { CTextField } from '@/shared/ui/inputs/CTextField';

import { useOneClickOrderMutation } from '../api/fastOrderApi';

interface FormValues {
  name: string;
  phone: string;
}

export const FastOrderModal: React.FC = () => {
  const { hideModal, isModalVisible, modalContent } = useModal();
  const { product } = modalContent || {};

  const [privacyPolicy, setPrivacyPolicy] = useState(true);
  const [privacyError, setPrivacyError] = useState(false);
  const [triggerOneClick, { isLoading, error }] = useOneClickOrderMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  const onSubmit = async (data: FormValues) => {
    if (!privacyPolicy) {
      setPrivacyError(true);
      return;
    }

    try {
      await triggerOneClick({
        ...data,
        item_id: product.id,
      }).unwrap();
      reset();
      hideModal();
      toast.success('Заказ успешно отправлен');
    } catch (err) {
      console.error('Order submission failed:', err);
    }
  };

  return (
    <Modal
      open={isModalVisible ? modalContent.type === 'fastOrder' : false}
      onClose={hideModal}
      aria-labelledby="fast-order-modal-title"
      aria-describedby="fast-order-modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none py-10 px-8 max-w-[500px] w-full">
        <span
          onClick={hideModal}
          className="absolute top-0 right-0 text-4xl text-colGray font-light cursor-pointer pr-4"
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && hideModal()}
        >
          &times;
        </span>

        <div className="font-semibold text-3xl mb-3">Быстрый заказ</div>
        <div className="mb-5">
          Укажите контактные данные, менеджер свяжется в ближайшее время для
          уточнения деталей
        </div>

        {(error as any)?.message ? (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {(error as any).message}
          </div>
        ) : null}

        {privacyError ? (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            Необходимо согласие с условиями
          </div>
        ) : null}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: 'Обязательное поле' }}
              render={({ field }) => (
                <CTextField
                  {...field}
                  label="Имя"
                  type="text"
                  required
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />

            <Controller
              name="phone"
              control={control}
              defaultValue=""
              rules={{
                required: 'Обязательное поле',
                pattern: {
                  value: /^(\+7|7|8)?[\s-]?(\(?\d{3}\)?[\s-]?)?[\d\s-]{10}$/,
                  message: 'Некорректный номер телефона',
                },
              }}
              render={({ field }) => (
                <CPhoneField
                  {...field}
                  label="Телефон"
                  required
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              )}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-colGreen rounded p-3 text-white font-semibold disabled:opacity-50"
          >
            {isLoading ? 'Отправка...' : 'Отправить'}
          </button>

          <div className="flex items-center">
            <div
              className={`w-5 h-5 min-w-[20px] mr-2 flex justify-center items-center rounded-sm cursor-pointer
                ${privacyPolicy ? 'bg-colGreen' : 'bg-gray-200'}`}
              role="checkbox"
              aria-checked={privacyPolicy}
              tabIndex={0}
              onClick={() => {
                setPrivacyPolicy(!privacyPolicy);
                setPrivacyError(false);
              }}
              onKeyPress={(e) =>
                e.key === 'Enter' && setPrivacyPolicy(!privacyPolicy)
              }
            >
              {privacyPolicy ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="9"
                  viewBox="0 0 12 9"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.8546 0.646894C11.9012 0.693339 11.9381 0.748515 11.9633 0.80926C11.9886 0.870005 12.0015 0.935127 12.0015 1.00089C12.0015 1.06666 11.9886 1.13178 11.9633 1.19253C11.9381 1.25327 11.9012 1.30845 11.8546 1.35489L4.85463 8.35489C4.80819 8.40146 4.75301 8.4384 4.69227 8.46361C4.63152 8.48881 4.5664 8.50179 4.50063 8.50179C4.43486 8.50179 4.36974 8.48881 4.309 8.46361C4.24825 8.4384 4.19308 8.40146 4.14663 8.35489L0.646631 4.85489C0.552745 4.76101 0.5 4.63367 0.5 4.50089C0.5 4.36812 0.552745 4.24078 0.646631 4.14689C0.740518 4.05301 0.867856 4.00026 1.00063 4.00026C1.13341 4.00026 1.26075 4.05301 1.35463 4.14689L4.50063 7.29389L11.1466 0.646894C11.1931 0.600331 11.2483 0.563388 11.309 0.538181C11.3697 0.512975 11.4349 0.5 11.5006 0.5C11.5664 0.5 11.6315 0.512975 11.6923 0.538181C11.753 0.563388 11.8082 0.600331 11.8546 0.646894Z"
                    fill="white"
                  />
                </svg>
              ) : null}
            </div>
            <p className="text-[10px] leading-3 text-colDarkGray">
              Я даю согласие на обработку персональных данных и принимаю условия
              <NavLink className="ml-1 text-colGreen" to="#">
                Пользовательского соглашения
              </NavLink>
            </p>
          </div>
        </form>
      </Box>
    </Modal>
  );
};
