import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import "../_watch.scss";

const WatchLayout = ({ children }) => {
  const { sidebar } = useSelector((state) => state.style);
  return (
    <>
      <Header burgerMenu={true} />
      <div className="watch__container ">
        {sidebar && <Sidebar />}
        <div className="watch__main ">{children}</div>
      </div>
    </>
  );
};

export default WatchLayout;
