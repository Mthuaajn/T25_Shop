import React, { useEffect, useState } from "react";
import Toast from "../LoadingError/Toast";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  loginGoogle,
  clearError,
} from "./../../Redux/Actions/UserActions";
import Message from "../LoadingError/Message";
import Loading from "../LoadingError/Loading";

const Login = ({ location, history }) => {
  window.scrollTo(0, 0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirect = "/";

  const userLogin = useSelector((state) => state.userLogin);

  const { error, loading, userInfo } = userLogin;

  const email = searchParams.get("email");
  useEffect(() => {
    if (email) dispatch(loginGoogle(email));
  }, [email, dispatch]);

  useEffect(() => {
    return () => dispatch(clearError());
  }, []);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };
  return (
    <div className="shadow-2xl max-w-[450px] mx-auto bg-white rounded-sm">
      <Toast />

      <div className="py-4 text-center h-100">
        <div className="text-center rounded-full">
          {error && <Message variant="danger mx-3">{error}</Message>}
          {loading && <Loading></Loading>}
          <div className="flex flex-row justify-center">
            <h5 className=" font-bold">Login</h5>
          </div>

          <form className="row form-container mx-3" onSubmit={submitHandler}>
            <div className="form mb-4 text-left">
              <label className="text-start font-bold" name="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form mb-4 text-left">
              <label className="text-start font-bold" type="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <p className="mb-4 text-left">
              Forgot password?{" "}
              <Link to={"/resetpassword"}>
                <u> Reset here</u>
              </Link>
            </p>
            <button className=" bg-[#10b981] p-2 rounded-md text-white flex flex-row justify-center font-semibold max-w-[300px] mx-auto">
              LOGIN
            </button>
          </form>

          <form className="row form-container mx-auto mt-4">
            <div className="mb-1">
              <button className="flex items-center justify-center border-2 rounded-md border-[#10b981] px-2 py-1 mx-auto ">
                <i className="fab text-[#ef4444] fa-google me-2"></i>
                <a href="http://localhost:3000/auth/google" className="">
                  Login with google
                </a>
              </button>
            </div>
          </form>

          <p className="mt-3">
            {" "}
            You don't have an account?{" "}
            <Link to={redirect ? `/signup?redirect=${redirect}` : "/signup"}>
              <u> Sign up here</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
