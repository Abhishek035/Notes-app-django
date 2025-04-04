import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const MainLayouts = ({ searchText, handleSearchText }) => {
  return (
    <>
      <Navbar searchText={searchText} handleSearchText={handleSearchText}/>
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default MainLayouts;
