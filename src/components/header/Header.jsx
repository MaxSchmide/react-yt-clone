import React, { useRef, useState } from "react";
import "./_header.scss";
import logo from "../../images/Logo.svg";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../redux/styleReducer";

const Header = ({ burgerMenu }) => {
  const [searchTerms, setSearchTerms] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const handleSearching = () => {
    navigate(`/search/${searchTerms}`);
  };
  const handleInput = (e) => {
    e.preventDefault();
    setSearchTerms(e.target.value);
  };
  return (
    <div className="header ">
      <div className="header__menu">
        <div
          onClick={() => dispatch(toggleSidebar())}
          className={`hamburger-lines ${burgerMenu && "active"}`}
        >
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </div>
      </div>
      <div className="header__logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="header__search">
        <form onSubmit={handleSearching}>
          <input
            ref={inputRef}
            type="text"
            value={searchTerms}
            onChange={handleInput}
            placeholder="Search..."
          />
          <button type="submit">
            <AiOutlineSearch size={22} />
          </button>
        </form>
      </div>
      <div className="header__icons">
        <MdApps color="white" size={28} />
        <MdNotifications color="white" size={28} />
        {user && <img src={user.photo} alt="avatar" />}
      </div>
    </div>
  );
};

export default Header;
