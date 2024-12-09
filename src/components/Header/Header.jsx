import React from "react";

import { NavLink } from "react-router-dom";
import PreHeader from "./PreHeader";
import CatalogFastAccess from "./CatalogFastAccess";
import SearchBar from "./SearchBar";
import HeaderControls from "./HeaderControls";
import logo from "@assets/images/logo.svg";
import CatalogModal from "@helpers/CModal/CatalogModal";
import CatalogModalMobile from "@helpers/CModal/CatalogModalMobile";
import useInitialDataFetch from "@/hooks/useInitialDataFetch";

const Header = ({ showCatalog, setShowCatalog }) => {

  useInitialDataFetch();
  
  return (
    <>
      <PreHeader />
      <div className="mx-auto sticky top-0  py-3 lg:space-x-5 bg-white z-[40]">
        <div className="content flex justify-between items-center">
          <NavLink
            onClick={() => setShowCatalog(false)}
            className="min-w-[90px] w-[90px] hidden lg:block"
            to="/"
          >
            <img src={logo} alt="logo" />
          </NavLink>
          <button
            onClick={() => setShowCatalog(!showCatalog)}
            className="bg-colGreen text-white flex justify-center items-center max-w-[40px] mm:max-w-[140px] w-full min-h-[40px] rounded mr-3 lg:mr-0"
          >
            {!showCatalog ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.5 2H15.5C15.7652 2 16.0196 2.10536 16.2071 2.29289C16.3946 2.48043 16.5 2.73478 16.5 3C16.5 3.26522 16.3946 3.51957 16.2071 3.70711C16.0196 3.89464 15.7652 4 15.5 4H2.5C2.23478 4 1.98043 3.89464 1.79289 3.70711C1.60536 3.51957 1.5 3.26522 1.5 3C1.5 2.73478 1.60536 2.48043 1.79289 2.29289C1.98043 2.10536 2.23478 2 2.5 2V2ZM2.5 7H15.5C15.7652 7 16.0196 7.10536 16.2071 7.29289C16.3946 7.48043 16.5 7.73478 16.5 8C16.5 8.26522 16.3946 8.51957 16.2071 8.70711C16.0196 8.89464 15.7652 9 15.5 9H2.5C2.23478 9 1.98043 8.89464 1.79289 8.70711C1.60536 8.51957 1.5 8.26522 1.5 8C1.5 7.73478 1.60536 7.48043 1.79289 7.29289C1.98043 7.10536 2.23478 7 2.5 7ZM2.5 12H15.5C15.7652 12 16.0196 12.1054 16.2071 12.2929C16.3946 12.4804 16.5 12.7348 16.5 13C16.5 13.2652 16.3946 13.5196 16.2071 13.7071C16.0196 13.8946 15.7652 14 15.5 14H2.5C2.23478 14 1.98043 13.8946 1.79289 13.7071C1.60536 13.5196 1.5 13.2652 1.5 13C1.5 12.7348 1.60536 12.4804 1.79289 12.2929C1.98043 12.1054 2.23478 12 2.5 12Z"
                  fill="white"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.20711 11.8993L12.3995 2.70695C12.587 2.51941 12.8414 2.41406 13.1066 2.41406C13.3718 2.41406 13.6262 2.51941 13.8137 2.70695C14.0012 2.89449 14.1066 3.14884 14.1066 3.41406C14.1066 3.67927 14.0012 3.93363 13.8137 4.12116L4.62132 13.3136C4.43378 13.5011 4.17943 13.6064 3.91421 13.6064C3.649 13.6064 3.39464 13.5011 3.20711 13.3136C3.01957 13.126 2.91421 12.8717 2.91421 12.6064C2.91421 12.3412 3.01957 12.0869 3.20711 11.8993Z"
                  fill="white"
                />
                <path
                  d="M13.8137 11.8995L4.62129 2.70711C4.43375 2.51957 4.1794 2.41421 3.91418 2.41421C3.64897 2.41421 3.39461 2.51957 3.20708 2.70711C3.01954 2.89464 2.91418 3.149 2.91418 3.41421C2.91418 3.67943 3.01954 3.93378 3.20708 4.12132L12.3995 13.3137C12.587 13.5012 12.8414 13.6066 13.1066 13.6066C13.3718 13.6066 13.6261 13.5012 13.8137 13.3137C14.0012 13.1262 14.1066 12.8718 14.1066 12.6066C14.1066 12.3414 14.0012 12.087 13.8137 11.8995Z"
                  fill="white"
                />
              </svg>
            )}
            <span className="hidden mm:block ml-2">Каталог</span>
          </button>
          <SearchBar setShowCatalog={setShowCatalog} />
          <HeaderControls />
        </div>
      </div>
      <CatalogFastAccess />
      <div
        className={`${
          showCatalog ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <CatalogModal
          showCatalog={showCatalog}
          setShowCatalog={setShowCatalog}
        />
        <CatalogModalMobile
          showCatalog={showCatalog}
          setShowCatalog={setShowCatalog}
        />
      </div>
    </>
  );
};

export default Header;
