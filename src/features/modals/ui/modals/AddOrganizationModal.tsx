import { useEffect, useState } from 'react';

import { Box, Modal } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import {
  useAddOrganizationMutation,
  useGetOrgSuggestionsMutation,
} from '@/redux/api/organizationEndpoints';
import CTextField from '@/shared/ui/inputs/CTextField';
import { Loading } from '@/shared/ui/Loader';

import ModalSnackbar from './ModalSnackbar';

function AddOrganizationModal({
  open,
  close,
  organizations,
  setOpenAddOrgModal,
}) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [openSnack, setOpenSnack] = useState(false);
  const [isValue, setIsValue] = useState('');
  const [selectedOrg, setSelectedOrg] = useState({ name: null, inn: null });

  const [getOrgSuggestions, { data }] = useGetOrgSuggestionsMutation();
  const [addOrganization, { isLoading, isSuccess }] =
    useAddOrganizationMutation();

  const handleAddOrganization = async () => {
    const data = {
      inn: Number(selectedOrg.inn),
    };
    await addOrganization(data);
    setOpenSnack(true);
    setOpenAddOrgModal(false);
    setSelectedOrg({ name: null, inn: null });
    setIsValue('');
  };

  useEffect(() => {
    if (isValue === '') return;

    const timeoutId = setTimeout(() => {
      getOrgSuggestions(isValue);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [isValue, getOrgSuggestions]);

  useEffect(() => {
    if (selectedOrg.name) {
      setIsValue(`${selectedOrg.name}, ${selectedOrg.inn}`);
    }
  }, [selectedOrg]);

  return (
    <>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none py-10 px-4 mm:px-8 max-w-[500px] w-[95%] mm:w-full">
          <span
            onClick={close}
            className="absolute top-0 right-0 text-4xl text-colGray font-light cursor-pointer pr-4"
          >
            &times;
          </span>
          <h1 className="text-2xl mm:text-3xl text-colBlack mm:text-center pb-5 font-semibold">
            Добавление организации
          </h1>
          {isLoading ? (
            <Loading extraStyle="200px" />
          ) : (
            <form onSubmit={handleSubmit(handleAddOrganization)}>
              <div className="w-full">
                <Controller
                  name="inn"
                  control={control}
                  rules={{
                    validate: {
                      exists: (value) => {
                        return (
                          !organizations.some((org) => org.inn === value) ||
                          'Такая организация уже существует'
                        );
                      },
                    },
                  }}
                  render={({ field }) => (
                    <CTextField
                      {...field}
                      label="Введите ИНН или название организации"
                      type="text"
                      required={true}
                      value={isValue}
                      onChange={(e) => {
                        setIsValue(e.target.value);
                        field.onChange(e);
                      }}
                    />
                  )}
                />
                {data?.suggestions?.length ? (
                  <div className="shadow-md p-3 pb-0">
                    <p className="text-xs opacity-60 mb-1 pb-[2px] border-b">
                      Возможно вы искали:
                    </p>
                    <ul className="max-h-[180px] overflow-y-scroll scrollable space-y-2 pb-1">
                      {data?.suggestions?.map((el) => (
                        <li
                          key={el?.data?.inn}
                          onClick={() =>
                            setSelectedOrg({
                              name: el?.data?.name?.short_with_opf,
                              inn: el?.data?.inn,
                            })
                          }
                          className="text-sm cursor-pointer px-1 border-l-2 border-transparent hover:border-gray-500 duration-200 line-clamp-1 break-all"
                        >
                          {el?.data?.name?.short_with_opf}, ИНН: {el?.data?.inn}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {errors.inn?.type === 'exists' ? (
                  <p className="text-red-600 text-sm font-medium" role="alert">
                    {errors.inn?.message}
                  </p>
                ) : null}
              </div>
              <button
                disabled={!watch('inn')}
                className={` w-full h-[38px] px-6 ${
                  !watch('inn') ? 'bg-colGray' : 'bg-colGreen'
                } rounded mt-5 text-white font-semibold`}
              >
                Сохранить
              </button>
            </form>
          )}
        </Box>
      </Modal>
      <ModalSnackbar
        message={
          isSuccess ? 'Организация успешно добавлена!!' : 'Произошла ошибка'
        }
        open={openSnack}
        onClose={() => setOpenSnack(false)}
      />
    </>
  );
}

export default AddOrganizationModal;
