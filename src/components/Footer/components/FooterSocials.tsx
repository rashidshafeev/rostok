import vk from '@assets/images/vk.svg';
import telegram from '@assets/images/telegram.svg';
import whatsapp from '@assets/images/whatsapp.svg';

const FooterSocials = () => {
  return (
    <div className='flex items-center space-x-5'>
      <a href='#' target='_blank' rel='noopener noreferrer'>
        <img src={vk} alt='VK' />
      </a>
      <a href='#' target='_blank' rel='noopener noreferrer'>
        <img src={telegram} alt='Telegram' />
      </a>
      <a href='#' target='_blank' rel='noopener noreferrer'>
        <img src={whatsapp} alt='WhatsApp' />
      </a>
    </div>
  );
};

export default FooterSocials;
