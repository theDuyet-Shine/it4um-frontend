import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
  const { userAuth } = useContext(UserContext);
  return (
    <nav className="flex justify-between items-center bg-white border-b-2">
      {/* Logo */}
      <Link to={"/"} className="flex items-center">
        <img src={logo} alt="Logo" className="h-20 w-20 ml-8" />
      </Link>

      {/* Search */}
      <div className="relative flex-1 mx-4">
        <input
          type="text"
          placeholder="Tìm kiếm"
          className="w-[50%] float-left ml-8 py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
        <div className="absolute inset-y-0 left-8 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19a9 9 0 100-18 9 9 0 000 18zM21 21l-4.35-4.35"
            />
          </svg>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4 mr-8">
        <button className="hidden md:inline-flex items-center px-4 py-2 rounded-full text-gray-700 bg-white cursor-pointer hover:bg-slate-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-2.5 w-2.5 m-2"
            viewBox="0 0 512 512"
          >
            <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
          </svg>
          Viết bài
        </button>

        {userAuth ? (
          <div className="flex items-center space-x-4">
            <img
              src={userAuth.user.profile_image} // Giả sử có trường profile_image trong userAuth
              className="h-10 w-10 rounded-full"
            />
          </div>
        ) : (
          <>
            <Link to="/login">
              <button className="px-4 py-2 bg-black text-white rounded-full shadow-md">
                Đăng nhập
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-4 py-2 border rounded-full text-gray-700 bg-gray-100 shadow-md">
                Đăng ký
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
