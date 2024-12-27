import { Close, Cached, DescriptionOutlined } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';

const options = [
  {
    id: 1,
    name: 'Отменить',
    icon: <Close className="!w-[18px] font-light text-colGreen mr-1" />,
  },
  {
    id: 2,
    name: 'Повторить заказ',
    icon: <Cached className="!w-[18px] font-light text-colGreen mr-1" />,
  },
  {
    id: 3,
    name: 'Скачать документы',
    icon: (
      <DescriptionOutlined className="!w-4 font-light text-colGreen mr-1" />
    ),
  },
];

interface OrderOptionsProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
}

export const OrderOptions = ({
  anchorEl,
  open,
  onClose,
}: OrderOptionsProps) => {
  return (
    <Menu
      id="long-menu"
      MenuListProps={{
        'aria-labelledby': 'long-button',
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          maxHeight: 48 * 4.5,
          width: '200px',
        },
      }}
    >
      {options.map((el) => (
        <MenuItem
          key={el?.id}
          selected={el === 'Pyxis'}
          onClick={onClose}
          className="flex items-center !p-2"
        >
          {el?.icon}
          <span>{el?.name}</span>
        </MenuItem>
      ))}
    </Menu>
  );
};
