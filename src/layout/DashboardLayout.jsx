import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const DashboardLayout = () => (
  <>
    <SideBar />
    <Outlet />
  </>
);

export default DashboardLayout;
