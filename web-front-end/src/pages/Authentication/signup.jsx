import React, { useEffect, useState } from "react";
import Toast from "../LoadingError/Toast";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../Redux/Actions/UserActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Message";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";

export default function Signup({ location, history }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [noti, setNoti] = useState("");
  const [serverError, setServerError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirect = "/login";

  const userRegister = useSelector((state) => state.userRegister);

  const { error, loading, registerState } = userRegister;

  useEffect(() => {
    if (registerState === "success") {
      navigate(redirect);
    } else {
      setServerError(registerState);
    }
  }, [registerState, navigate]);

  const emailPattern = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,}){1,3}$/;
  const usernamePattern = /^[a-zA-Z0-9_]{6,20}$/
  const submitHandler = (e) => {
    e.preventDefault();

    if (!emailPattern.test(email)){
      setNoti("Invalid email!");
    } else if (!usernamePattern.test(username)) {
      setNoti("Username should has at least 6 character, include letters, digits, and underscore")
    } else if (password !== confirmPassword) {
      setNoti("Mật khẩu không khớp");
    } else if (password.length < 8) {
      setNoti("Mật khẩu tối thiểu 8 ký tự");
    } else {
      setNoti("");
      dispatch(register(username, email, password));
    }
  };
  return (
    <div className="shadow-2xl max-w-[450px] mx-auto bg-white rounded-sm">
      <Toast />

      <div className="py-4 text-center h-100">
        <div className="text-center rounded-full">
          {error && <Message variant="danger">{error}</Message>}
          {!error && serverError && (
            <Message variant="danger">{serverError}</Message>
          )}
          {loading && <Loading></Loading>}
          <div className="flex flex-row justify-center">
            <h5 className=" font-bold">Signup</h5>
          </div>

          <form className="row form-container mx-3" onSubmit={submitHandler}>
            <div className="form mb-4 text-left">
              <label className="text-left font-bold" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
              />
            </div>
            <div className="form mb-4 text-left">
              <label className="text-left font-bold" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                required
                value={email}
              />
            </div>

            <div className="form mb-4 text-left">
              <label className="text-start font-bold" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                required
                value={password}
              />
            </div>
            <div className="form mb-4 text-left">
              <label className="text-start font-bold" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                value={confirmPassword}
              />
              {noti !== "" && <p className="text-red-500">{noti}</p>}
            </div>

            <button className=" bg-[#10b981] p-2 rounded-md text-white flex flex-row justify-center font-semibold max-w-[300px] mx-auto">
              SIGN UP
            </button>
          </form>

          <div className="mt-3 mx-auto">
            <button className="flex items-center justify-center border-2 rounded-md border-[#10b981] px-2 py-1 mx-auto">
              <i className="fab text-[#ef4444] fa-google me-2"></i>

              <a href="http://localhost:3000/auth/google" className="">
                Login with google
              </a>
            </button>
          </div>

          <p className="">
            {" "}
            You already have an account?{" "}
            {/* redirect ? `/login?redirect=${redirect}` : "/login" */}
            <Link to={"/login"}>
              <u>Login here</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
