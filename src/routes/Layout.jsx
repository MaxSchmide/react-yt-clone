import React from "react";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import "../_app.scss";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="app__container ">
        <Sidebar />
        <div className="app__main ">{children}</div>
      </div>
    </>
  );
};

export default Layout;
