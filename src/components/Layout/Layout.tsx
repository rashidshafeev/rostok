import { Outlet, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import MobileNavbar from "@components/Header/MobileNavbar";
import LogoutModal from "@helpers/CModal/LogoutModal";
import { ModalProvider } from "@context/ModalContext";
import AuthModal from "@helpers/CModal/AuthModal/AuthModal";
import ShareModal from "@helpers/CModal/ShareModal";
import { Toaster } from "sonner";
import QuestionModal from "@helpers/CModal/QuestionModal";
import ConfirmationModal from "@helpers/CModal/ConfirmationModal";
import ModificationAttributesModal from "@/helpers/CModal/ModificationAttributesModal";

import Footer from "@components/Footer/Footer";
import Header from "@components/Header/Header";
import ShareCartModal from "@/helpers/CModal/ShareCartModal";
import ShowSharedCartModal from "@/helpers/CModal/ShowSharedCartModal";
import { ErrorBoundaryWrapper } from "@components/ErrorBoundary/ErrorBoundaryWrapper";
import {
  CheckCircleOutlineRounded,
  ErrorOutlineRounded,
  InfoRounded,
  WarningAmberRounded,
} from "@mui/icons-material";

const Layout = () => {
  const [showCatalog, setShowCatalog] = useState(false);
  const navigate = useNavigate();

  const ErrorFallback = (error: Error, reset: () => void) => (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center p-8">
        <h2 className="text-xl font-semibold text-colGreen mb-4">
          Что-то пошло не так
        </h2>
        <p className="text-colDarkGray mb-6">
          Произошла непредвиденная ошибка. Мы уже работаем над её исправлением.

        </p>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="px-4 py-2 bg-colGreen text-white rounded hover:opacity-90"
          >
            Попробовать снова
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 border border-colGreen text-colGreen rounded hover:bg-colSuperLight"
          >
            На главную
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <ModalProvider>
      <div className="flex flex-col min-h-screen">
        <Header showCatalog={showCatalog} setShowCatalog={setShowCatalog} />
        <main className="flex-grow">
          <ErrorBoundaryWrapper 
            fallback={ErrorFallback} 
            showToast={true}>
            <Outlet />
          </ErrorBoundaryWrapper>
        </main>
        <MobileNavbar />
        <Footer />
      </div>
      
      <LogoutModal />
      <AuthModal />
      <ShareModal />
      <QuestionModal />
      <ConfirmationModal />
      <ModificationAttributesModal />
      <ShareCartModal />
      <ShowSharedCartModal />
      <Toaster
        visibleToasts={1}
        position="bottom-center"
        toastOptions={{ duration: 3000 }}
        icons={{
          success: <CheckCircleOutlineRounded sx={{ color: "green", fontSize: "3rem", paddingRight: "4px" }} />,
          error: <ErrorOutlineRounded sx={{ color: "red", fontSize: "3rem", paddingRight: "4px" }} />,
          warning: <WarningAmberRounded sx={{ color: "orange", fontSize: "3rem", paddingRight: "4px" }} />,
          info: <InfoRounded sx={{ color: "blue", fontSize: "3rem", paddingRight: "4px" }} />,
        }}
      />
    </ModalProvider>
  );
};

export default Layout;
