import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GoBell } from "react-icons/go";
import { BsPencilSquare } from "react-icons/bs";
import UserNav from "./UserNav";
import { CiSearch } from "react-icons/ci";
import { motion as m } from "framer-motion";

const Navbar = () => {
  const userAuth = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuOpenChange = (isOpen) => {
    setMenuOpen(isOpen);
  };

  const handleNewPostClick = () => {
    navigate("/new-post");
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
    >
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
            className="w-[50%] float-left ml-8 py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 hover:bg-slate-200 focus:bg-slate-200"
          />
          <div className="absolute inset-y-0 left-8 pl-3 flex items-center pointer-events-none">
            <CiSearch className="w-6 h-6" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center space-x-4 mr-8">
          <button
            onClick={() => {
              navigate("/guide");
            }}
            className="gap-1 flex items-center px-4 py-2 border rounded-full text-gray-700 bg-white cursor-pointer hover:bg-slate-200"
          >
            Hướng dẫn và Quy tắc
          </button>
          <button
            onClick={handleNewPostClick}
            className="gap-1 flex items-center px-4 py-2 border rounded-full text-gray-700 bg-white cursor-pointer hover:bg-slate-200"
          >
            <BsPencilSquare />
            Viết bài
          </button>

          {userAuth.isAuthenticated ? (
            <div className="gap-2 flex" ref={menuRef}>
              <Link to={"/dashboard/notification"}>
                <button className="w-10 h-10 rounded-full border flex justify-center items-center hover:bg-slate-200">
                  <GoBell className="w-10 h-6 " />
                </button>
              </Link>
              <div>
                <button
                  className="flex items-center space-x-4 rounded-full border-2 h-10 w-10 justify-center hover:bg-slate-100"
                  onClick={toggleMenu}
                >
                  <img
                    src={userAuth.user.user.profile_image}
                    className="h-10 w-10 rounded-full cursor-pointer"
                    alt="User Profile"
                  />
                </button>
                {menuOpen && (
                  <UserNav onMenuOpenChange={handleMenuOpenChange} />
                )}
              </div>
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
    </m.div>
  );
};

export default Navbar;
