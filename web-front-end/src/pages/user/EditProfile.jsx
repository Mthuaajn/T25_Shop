import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { api } from "../../constants/api";
import { Link } from "react-router-dom";
export default function EditProfile() {
  const userLogin = useSelector((state) => state.userLogin);

  const [username, setUsername] = useState(userLogin?.userInfo?.username || "");
  const [email, setEmail] = useState(userLogin?.userInfo?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = userLogin;
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Mật khẩu không khớp!");
    } else if (password.length < 8) {
      toast.error("Mật khẩu tối thiểu 8 ký tự!");
    } else {
      const { data } = await axios.post(
        api.changePassword + userLogin?.userInfo?._id,
        { password },
        {
          ...api.config,
          headers: { ...api.config.headers, sessionId: userInfo.sessionId },
        }
      );
      if (data === "success") {
        toast.info("Cập nhật thành công!");
      } else {
        toast.error("Cập nhật thất bại!");
      }
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto mt-4">
      <ToastContainer />
      <Link to="/profile" className="p-2 my-3 rounded-lg bg-danger text-white">
        <button>Return to profile page</button>
      </Link>
      <form
        className="row form-container mx-3 my-2 border bg-white"
        onSubmit={submitHandler}
      >
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-fn">Username</label>
            <input
              className="form-control"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled
            ></input>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-email">Email address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled
            ></input>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-pass">New password</label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-confirm-pass">Confirm password</label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            ></input>
          </div>
        </div>
        <button
          type="submit"
          className="flex flex-row justify-center mx-3 my-2"
        >
          <p className="bg-[#10b981] px-4 mt-4 text-white rounded-sm py-2">
            Update Profile
          </p>
        </button>
      </form>
    </div>
  );
}
/* <div className="container mt-lg-5 mt-3">
            <div className="row align-items-start">
                <div className="col-lg-4 p-0 shadow">
                    <div className="author-card pb-0 pb-md-3">
                        <div className="author-card-cover"></div>
                        <div className="author-card-profile row">
                            <div className="author-card-avatar col-md-5">
                                <img src="" alt="userprofileimage"/>

                            </div>
                            <div className="author-card-details col-md-7">
                                <h5 className="author-card-name mb=2">
                                    <strong>username</strong>
                                </h5>
                                <span className="author-card-position">
                                    <>Joined date</>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="wizard pt-3">
                        <div className="d-flex align-items-start">
                            <div className="nav align-items-start flex-column col-12 nav-pills me-3"
                                id="v-pills-tab"
                                role="tablist"
                                aria-orientation="vertical"
                            >
                                <button className="nav-link active">
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>*/
