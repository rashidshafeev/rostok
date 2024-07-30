// src/AuthModal/AuthModal.tsx

import { useState } from "react"; 
import { Modal, Box } from "@mui/material"; 
import { useModal } from "../../../context/ModalContext";

import modalLogo from "../../../assets/images/modal-logo.svg";

import CheckAuth from "./CheckAuth";
import AuthWithEmail from "./AuthWithEmail";
import ResetPassword from "./ResetPassword";
import Register from "./Register";
import { KeyboardArrowLeft } from "@mui/icons-material";

const AuthModal = () => {
  const { hideModal, modalContent, isModalVisible } = useModal();
  const [content, setContent] = useState(modalContent?.content || "checkAuth");

  if (!isModalVisible) return null;

  return (
    <Modal
      open={isModalVisible && modalContent.type === "auth"}
      onClose={() => hideModal()}
    >
      <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none pt-10 pb-4 px-4 mm:py-10 mm:px-8 max-w-[500px] w-[95%] mm:w-full">
      {content !== 'checkAuth' && <span
        onClick={() => {
          setContent("checkAuth");
        //   setResError(null);
        //   reset();
        }}
        className="absolute top-3 left-3 text-sm text-colBlack font-semibold cursor-pointer pr-4"
      >
        <KeyboardArrowLeft className="!w-4 pb-[2px]" />
        Назад
      </span>}
        <span
          onClick={() => hideModal()}
          className="absolute top-0 right-0 text-4xl text-colGray font-light cursor-pointer pr-4"
        >
          &times;
        </span>
        <img className="w-[116px] mb-4 mx-auto" src={modalLogo} alt="*" />
        {content === "checkAuth" && <CheckAuth setContent={setContent} />}
        {content === "authWithEmail" && (
          <AuthWithEmail hideModal={hideModal} setContent={setContent} />
        )}
        {content === "resetPassword" && (
          <ResetPassword
            // control={control}
            // handleSubmit={handleSubmit}
            setContent={setContent}
          />
        )}
        {content === "register" && <Register setContent={setContent} />}
      </Box>
    </Modal>
  );
};

export default AuthModal;
