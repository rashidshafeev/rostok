import { Outlet, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import MobileNavbar from "@components/Header/MobileNavbar";
import { ModalProvider } from "@/features/modals/model/context";
import { ModalManager } from "@/features/modals/ui/ModalManager";
import { Toaster } from "sonner";
import Footer from "@components/Footer/Footer";
import Header from "@components/Header/Header";
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
      <div className="flex flex-col min-h-screen relative">
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
      
      <ModalManager />
      <Toaster
        visibleToasts={1}
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          classNames: {
            toast: "p-2 flex items-center",
            title: "text-sm font-semibold text-black",
            description: "text-sm text-colDarkGray",
            closeButton: "text-sm text-colDarkGray",
            icon: "w-8"
          }
        }}
        icons={{
          success: <CheckCircleOutlineRounded sx={{ color: "green", fontSize: "2rem", paddingRight: "2px" }} />,
          error: <ErrorOutlineRounded sx={{ color: "red", fontSize: "2rem", paddingRight: "2px" }} />,
          warning: <WarningAmberRounded sx={{ color: "orange", fontSize: "2rem", paddingRight: "2px" }} />,
          info: <InfoRounded sx={{ color: "blue", fontSize: "2rem", paddingRight: "2px" }} />,
        }}
      />
    </ModalProvider>
  );
};

export default Layout;
