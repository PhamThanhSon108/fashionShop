import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import isEmpty from "validator/lib/isEmpty";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import Header from "./../components/Header";
import { login } from "./../Redux/Actions/userActions";

const Login = ({ location, history }) => {
  window.scrollTo(0, 0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginCheck, setLoginCheck] = useState("");

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);
  const funtionCheck = () => {
    const msg = {};
    if (isEmpty(email)) {
      msg.email = "Plesae input your email"
    }
    if (isEmpty(password)) {
      msg.password = "Please input your password";
      // msg.borderRed4 = "border-red";
      // msg.colorRed4 = "color-red";
    } else {
      if (password.length < 6) {
        msg.password = "Password must be at least 6 characters"
        // msg.borderRed4 = "border-red";
        // msg.colorRed4 = "color-red";
      }
    }
    setLoginCheck(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const isEmptyLogin = funtionCheck()
    if (!isEmptyLogin) return;
    dispatch(login(email, password));
  };

  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}
        <form
          className="Login col-md-6 col-lg-4 col-10"
          onSubmit={submitHandler}
        >
          <div className="Login-from from-login">
            <input
              type="email"
              //placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="Login-from from-login">
            <input
              type="password"
              //placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
          <p>
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
