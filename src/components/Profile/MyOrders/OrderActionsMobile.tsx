import React from 'react';
import { Close, Cached, DescriptionOutlined, MoreVert } from '@mui/icons-material';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { useOrderActions } from './useOrderActions';

interface OrderOptionsMobileProps {
  orderNumber: string;
}

export const OrderActionsMobile = ({ orderNumber }: OrderOptionsMobileProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { handleCancelClick, handleRepeatClick, handleDownloadClick } = useOrderActions(orderNumber);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
      >
        <MoreVert />
      </IconButton>
      
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: '200px',
          },
        }}
      >
        <MenuItem
          onClick={() => {
            void handleCancelClick();
            handleMenuClose();
          }}
          className="flex items-center !p-2"
        >
          <Close className="!w-[18px] font-light text-colGreen mr-1" />
          <span>Отменить</span>
        </MenuItem>
        <MenuItem
          onClick={() => {
            void handleRepeatClick();
            handleMenuClose();
          }}
          className="flex items-center !p-2"
        >
          <Cached className="!w-[18px] font-light text-colGreen mr-1" />
          <span>Повторить заказ</span>
        </MenuItem>
        {/* <MenuItem
          onClick={() => {
            void handleDownloadClick();
            handleMenuClose();
          }}
          className="flex items-center !p-2"
        >
          <DescriptionOutlined className="!w-4 font-light text-colGreen mr-1" />
          <span>Скачать документы</span>
        </MenuItem> */}
      </Menu>
    </>
  );
};