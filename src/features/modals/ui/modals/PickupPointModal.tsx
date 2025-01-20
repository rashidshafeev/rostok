import React, { useState } from 'react';

import { Box, Modal } from '@mui/material';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

import { CSearchField } from '@/shared/ui';
import { SubwayIcon } from '@/shared/ui/icons';
import { CustomRadioButton } from '@pages/Checkout/CustomRadioButton';

const PickupPointModal = ({
  open,
  handleClose,
  pickupPoint,
  setPickupPoint,
}) => {
  const [filter, setFilter] = useState('');

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handlePointChange = (e) => {
    setPickupPoint(
      points.find(
        (point) =>
          point.id.toString() ===
          e.currentTarget.getAttribute('data-customvalue')
      )
    );
  };

  const points = [
    {
      id: 1,
      address: 'г. Москва, Волгоградский проспект, д. 120',
      coord: [55.684758, 37.738521],
    },
    {
      id: 2,
      address: 'г. Москва, Волгоградский проспект, д. 122',
      coord: [55.884758, 37.438521],
    },
    {
      id: 3,
      address: 'г. Москва, Волгоградский проспект, д. 123',
      coord: [55.584758, 37.438521],
    },
    {
      id: 4,
      address: 'г. Москва, Волгоградский проспект, д. 124',
      coord: [55.584758, 37.138521],
    },
  ];

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="overflow-hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none w-[80%] ">
        <span
          onClick={handleClose}
          className="absolute top-0 right-0 text-4xl text-colGray font-light cursor-pointer pr-4"
        >
          &times;
        </span>

        <div className="flex justify-between items-start border border-colLightGray rounded-[10px] max-h-[500px] overflow-hidden">
          <div className="p-5 flex flex-col justify-between overflow-hidden h-[500px]">
            <div className="flex flex-col gap-2 mb-5 overflow-hidden">
              <div className="font-semibold text-lg">
                Выберите пункт самовывоза
              </div>
              <CSearchField
                label="Город, адрес или метро"
                name="search"
                type="search"
                handleChange={handleFilter}
              />
              <div className="scrollable overflow-y-scroll flex flex-col gap-2 pr-2">
                {points?.map((point, index) => {
                  return (
                    <CustomRadioButton
                      key={point.id}
                      value={point.id}
                      handleChange={handlePointChange}
                      checked={
                        point.id.toString() === pickupPoint.id.toString()
                      }
                    >
                      <div className="flex flex-col gap-2 ">
                        <div className="flex gap-1">
                          <SubwayIcon />
                          <div className="">Кузьминки</div>
                        </div>
                        <div className="font-medium">{point.address}</div>
                        <div className="text-[12px] text-colDarkGray">
                          Пн-Сб: с 9:00 до 21:00 Вс: с 10:00 до 18:00
                        </div>
                        <div className="font-semibold text-colGreen">
                          Забирайте сегодня
                        </div>
                      </div>
                    </CustomRadioButton>
                  );
                })}
              </div>
              <button
                onClick={handleClose}
                className="bg-colGreen text-white py-4 rounded font-semibold"
              >
                Выбрать
              </button>
            </div>
          </div>

          <YMaps>
            <div className="rounded overflow-hidden grow ">
              <Map
                className="w-full h-[500px] grow"
                defaultState={{ center: [55.75, 37.57], zoom: 9 }}
              >
                {points?.map((point, index) => {
                  return <Placemark geometry={point.coord} />;
                })}
              </Map>
            </div>
          </YMaps>
        </div>
      </Box>
    </Modal>
  );
};

export default PickupPointModal;
