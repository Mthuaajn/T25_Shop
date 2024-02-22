import { Navigate, Outlet, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const AdminLayout = () => {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  if (userInfo?.role !== "admin") return <Navigate to="/" replace />;

  return (
    <div className="bg-[#f5f5f6] ">
      <div className="flex min-h-screen mx-auto">
        <SideBar />
        <div className="w-full">
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
