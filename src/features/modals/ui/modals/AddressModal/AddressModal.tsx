import React, { createRef, useEffect, useRef, useState } from 'react';

import { Box, Modal } from '@mui/material';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { Controller, useForm } from 'react-hook-form';
import { useDebounce } from 'react-use';

import { SubwayIcon } from '@/shared/ui/icons';
import { CSearchField } from '@/shared/ui/inputs/CSearchField';
// import CustomRadioButton from '@/shared/ui/CustomRadioButton';

export const AddressModal = ({
  open,
  handleClose,
  addressList,
  setAddressList,
}) => {
  const map = createRef(null);
  const throttleInProgress = useRef();
  const timerDebounceRef = useRef();

  // const coords = useRef();
  const [coords, setCoords] = useState([55.75, 37.57]);
  const [newAddress, setNewAddress] = useState({});

  const handleNewAddress = (coords) => {
    if (timerDebounceRef.current) {
      clearTimeout(timerDebounceRef.current);
    }
    timerDebounceRef.current = setTimeout(() => {
      setCoords(coords);
    }, 1000);
  };

  const fetchSuggest = async (text) => {
    try {
      const suggest = await fetch(
        `https://suggest-maps.yandex.ru/v1/suggest?apikey=358e06a3-dbaf-4e30-aafa-e7f34291e8ec&text=${text}`
      );
      const data = await suggest.json();
    } catch (error) {}
  };

  const fetchCoords = async (text) => {
    try {
      const suggest = await fetch(
        `https://geocode-maps.yandex.ru/1.x/?apikey=d624f793-a72c-4bca-8293-119601027ed7&geocode=${text.replace(' ', '+')}&format=json`
      );
      const data = await suggest.json();
      const c =
        data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(
          ' '
        );
      setCoords([c[1], c[0]]);
    } catch (error) {}
  };

  const handleSearch = (e) => {
    if (timerDebounceRef.current) {
      clearTimeout(timerDebounceRef.current);
    }
    timerDebounceRef.current = setTimeout(() => {
      fetchSuggest(e.target.value);
      fetchCoords(e.target.value);
    }, 1000);
  };

  const fetchAddress = async () => {
    try {
      const address = await fetch(
        `https://geocode-maps.yandex.ru/1.x/?apikey=d624f793-a72c-4bca-8293-119601027ed7&geocode=${coords[1]},${coords[0]}&format=json`
      );
      const data = await address.json();
      setNewAddress(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchAddress();
  }, [coords]);

  // const [filter, setFilter] = useState('');

  // const handleFilter = (e) => {
  //     setFilter(e.target.value);
  // }

  // console.log(pickupPoint);

  // const handlePointChange = (e) => {
  //     console.log(e.currentTarget.getAttribute("data-customvalue"));
  //     setPickupPoint(points.find((point) => point.id.toString() === e.currentTarget.getAttribute("data-customvalue")))
  //     console.log(pickupPoint);
  // }

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

  // const {
  //     control,
  //     handleSubmit,
  //     reset,
  //     register,
  //     watch,
  //     formState: { errors, isValid },
  // } = useForm({
  //     mode: 'onChange',
  // });

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
          <div className="p-5 flex flex-col justify-between overflow-hidden h-[500px] w-[40%]">
            <div className="flex flex-col gap-2 mb-5 overflow-hidden ">
              <div className="font-semibold text-lg">
                Выберите адрес доставки
              </div>
              <CSearchField
                label="Город, улица, дом, корпус"
                name="search"
                type="search"
                // value={newAddress}
                handleChange={handleSearch}
              />
              <div className="scrollable overflow-y-scroll flex flex-col gap-2 pr-2">
                {/* {points?.map((point, index) => {
                                    return (
                                        <CustomRadioButton key={point.id} value={point.id} handleChange={handlePointChange} checked={point.id.toString() === pickupPoint.id.toString()}>
                                            <div className='flex flex-col gap-2 '>
                                                <div className='flex gap-1'>
                                                    <SubwayIcon />
                                                    <div className=''>Кузьминки</div>
                                                </div>
                                                <div className='font-medium'>{point.address}</div>
                                                <div className='text-[12px] text-colDarkGray'>Пн-Сб: с 9:00 до 21:00 Вс: с 10:00 до 18:00</div>
                                                <div className='font-semibold text-colGreen'>Забирайте сегодня</div>
                                            </div>

                                        </CustomRadioButton>

                                    )

                                })} */}
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
                defaultState={{ center: coords, zoom: 9 }}
                instanceRef={map}
              >
                <Placemark
                  geometry={coords}
                  options={{ draggable: true }}
                  instanceRef={(ref) => {
                    if (ref) {
                      ref.geometry.events.add('change', function (e) {
                        const newCoords = e.get('newCoordinates');
                        // coords.current = newCoords
                        handleNewAddress(newCoords);
                      });
                    }
                  }}
                />
              </Map>
            </div>
          </YMaps>
          <div className="bg-white rounded h-10 w-[30%] absolute bottom-[10%] left-1/2 -translate-x-1/2 z-10">
            {`${newAddress?.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.name}, ${newAddress?.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.description}` ||
              'Выберите адрес'}
          </div>
        </div>
      </Box>
    </Modal>
  );
};
