import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const ModalSnackbar = ({ message, open, onClose }) => {
  const action = (
    <>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={onClose}
      >
        <CloseIcon fontSize='small' />
      </IconButton>
    </>
  );

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
        message={message}
        vertical={`top`}
        horizontal={`right`}
        action={action}
        style={{ maxWidth: '400px' }}
      />
    </div>
  );
};

export default ModalSnackbar;
