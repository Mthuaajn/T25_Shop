import { Navigate, Outlet, useNavigate } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import { useSelector } from "react-redux";

const PublicLayout = () => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  if (userInfo?.role === "admin") return <Navigate to="/admin" replace />;

  return (
    <>
      <div className="bg-[#f5f5f5]">
        <Header title={title} setTitle={setTitle} />
        <div className="min-h-[calc(100vh-300px)]">
          <Outlet context={[title, setTitle]} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PublicLayout;
