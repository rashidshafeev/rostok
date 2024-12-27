import { Box, Modal } from '@mui/material';

import { useModal } from '@/features/modals/model/context';
import QuestionForm from '@/helpers/QuestionForm';

function QuestionModal() {
  const { hideModal, modalContent, isModalVisible } = useModal();

  return (
    <Modal
      open={isModalVisible ? modalContent?.type === 'question' : null}
      onClose={hideModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none py-10 px-8 max-w-[500px] w-full">
        <span
          onClick={hideModal}
          className="absolute top-0 right-0 text-4xl text-colGray font-light cursor-pointer pr-4"
        >
          &times;
        </span>
        <div className=" font-semibold text-3xl mb-3">Задайте вопрос</div>
        <div className="mb-5">
          Укажите контактные данные, менеджер свяжется в ближайшее время и
          ответит на все вопросы
        </div>
        <QuestionForm data={modalContent?.data} hideModal={hideModal} />
      </Box>
    </Modal>
  );
}

export default QuestionModal;
