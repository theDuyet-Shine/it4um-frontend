import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const DashboardLayout = () => (
  <div className="flex">
    <SideBar />
    <div className="mx-8 my-4">
      <Outlet />
    </div>
  </div>
);

export default DashboardLayout;
