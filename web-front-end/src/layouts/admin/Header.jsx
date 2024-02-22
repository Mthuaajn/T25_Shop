import {
  faAngleDown,
  faAngleUp,
  faBell,
  faSearch,
  faSun,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../Redux/Actions/UserActions";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  const page =
    location.pathname === "/admin"
      ? "Dashboard"
      : location.pathname.split("/")[2].charAt(0).toUpperCase() +
        location.pathname.split("/")[2].slice(1);

  const { userInfo } = useSelector((state) => state.userLogin);

  return (
    <div className="px-4  bg-white py-4 flex justify-between">
      <p className="text-2xl font-semibold">{page}</p>
      <div className="bg-[#eeeeef] flex gap-3 items-center rounded-xl px-4">
        <FontAwesomeIcon icon={faSearch} color="#5D5FEF" />
        <input
          type="text"
          placeholder="Search here..."
          className="bg-[#eeeeef] min-w-[300px] outline-none"
        />
      </div>

      <div className="flex shadow-outer  bg-red-400 p-2 items-center gap-2 rounded-3xl">
        <button
          className="font-semibold px-2 text-white"
          onClick={() => handleLogout()}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Header;
