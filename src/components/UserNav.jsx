import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";

import { Link } from "react-router-dom";
import { UserContext } from "../App";

const UserNav = ({ onMenuOpenChange }) => {
  const { userAuth, logoutContext } = useContext(UserContext);

  const handleLogout = () => {
    onMenuOpenChange(false);
    setTimeout(() => {
      logoutContext();
    }, 2000);
  };

  return (
    <div className="bg-white absolute mt-1 right-2 border w-40 overflow-hidden font-bold">
      <Link
        to="/dashboard/notification"
        className="flex link pl-2 py-2 items-center gap-3"
      >
        <CgProfile />
        <p>Trang cá nhân</p>
      </Link>
      <div className="link pl-2 py-2 " onClick={handleLogout}>
        <div className="flex items-center gap-3 ">
          <IoMdLogOut />
          Đăng xuất
        </div>
        {userAuth && (
          <p className="text-xs mt-3 mr-12 font-thin italic">
            @{userAuth.user.fullname}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserNav;
