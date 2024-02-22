import { useEffect } from "react";
import { useState } from "react";
import { Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Message from "../LoadingError/Message";
import Loading from "../LoadingError/Loading";
import axios from "axios";
import { api } from "../../constants/api";

const ResetPassword = () => {
  window.scrollTo(0, 0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [noti, setNoti] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [isFirstForm, setIsFirstForm] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirect = "/";

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate]);
  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data } = await axios.post(
      api.resetPassword,
      { username, email },
      api.config
    );
    setLoading(false);
    if (typeof data === "object") {
      setSessionId(data.sessionId);
      setIsFirstForm(true);
    } else {
      setError(data);
    }
  };
  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setNoti("Mật khẩu không khớp");
    } else if (password.length < 8) {
      setNoti("Mật khẩu tối thiểu 8 ký tự");
    } else {
      setNoti("");

      setLoading(true);
      const { data } = await axios.post(
        api.verifyCode,
        { username, password, verifyCode, sessionId },
        api.config
      );
      setLoading(false);
      if (data === "success") {
        navigate("/login");
        return;
      }
      setError(data);
    }
  };
  return (
    <div className="shadow-2xl mt-4 max-w-[450px] mx-auto bg-white rounded-sm">
      <Toast />

      <div className="py-4 text-center h-100">
        <div className="text-center rounded-full">
          {error && !isFirstForm && (
            <Message variant="warning">{error}</Message>
          )}
          {loading && <Loading></Loading>}
          <div className="flex flex-row justify-center">
            <h5 className=" font-bold">Reset Password</h5>
          </div>

          {isFirstForm ? (
            <form className="row form-container mx-3" onSubmit={handleReset}>
              <div className="form mb-4 text-left">
                <label className="text-start font-bold" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form mb-4 text-left">
                <label
                  className="text-start font-bold"
                  htmlFor="confirmPassword"
                >
                  ConfirmPassword
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  className="form-control"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {noti !== "" && <p className="text-red-500">{noti}</p>}
              </div>
              <div className="form mb-4 text-left">
                <label className="text-start font-bold" htmlFor="code">
                  Verify Code
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={verifyCode}
                  className="form-control"
                  onChange={(e) => setVerifyCode(e.target.value)}
                  required
                />
              </div>

              <button className=" bg-[#10b981] p-2 rounded-md text-white flex flex-row justify-center font-semibold max-w-[300px] mx-auto">
                CONFIRM
              </button>
            </form>
          ) : (
            <form className="row form-container mx-3" onSubmit={handleVerify}>
              <div className="form mb-4 text-left">
                <label className="text-start font-bold" htmlFor="username">
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
                <label className="text-start font-bold" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button className=" bg-[#10b981] p-2 rounded-md text-white flex flex-row justify-center font-semibold max-w-[300px] mx-auto">
                CONFIRM
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
