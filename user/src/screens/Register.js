import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import isEmpty from "validator/lib/isEmpty";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import { register } from "../Redux/Actions/userActions";
import Header from "./../components/Header";

const Register = ({ location, history }) => {
  window.scrollTo(0, 0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cfpassword, setCfPassword] = useState("");

  const [checkValidate, setCheckValidate] = useState({}) // tao một usestate mới để check from
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  //xủ lí logic check from
  const validateAll = () => {
    const msg = {}
    if (isEmpty(name)) {
      msg.name = "Please input your name";
      msg.color = "border-red";
    }

    if (isEmpty(email)) {
      msg.email = "Plesae input your email";
      msg.color = "border-red";
    }

    if (isEmpty(phone)) {
      msg.phone = "Plesae input your phone";
      msg.color = "border-red";
    }

    if (isEmpty(password)) {
      msg.password = "Please input your password";
      msg.color = "border-red";
    } else {
      if (password.length < 6) {
        msg.password = "Password must be at least 6 characters"
        msg.color = "border-red";
      }
    }

    if (isEmpty(cfpassword)) {
      msg.cfpassword = "Please input your cfpassword";
      msg.color = "border-red";
    } else {
      if (cfpassword.length < 6) {
        msg.cfpassword = "CfPassword must be at least 6 characters"
        msg.color = "border-red";
      } else {
        if (cfpassword !== password) {
          msg.cfpassword = "The password entered is incorrect"
          msg.color = "border-red";
        }
      }
    }
    setCheckValidate(msg)
    if (Object.keys(msg).length > 0) return false
    return true
  }
  console.log(checkValidate)

  const submitHandler = (e) => {
    e.preventDefault();
    const isValid = validateAll()
    if (!isValid) return
    dispatch(register(name, email, phone, password));
  };

  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}

        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <div className="Login-from">
            <input
              type="text"
              className={checkValidate.color}
              //placeholder="Username"
              value={name}
              onClick={() => {
                setCheckValidate((object) => {
                  const x = { ...object }
                  x.color = " ";
                  x.name = " ";
                  return x
                })
              }}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
            <p className="noti-validate">{checkValidate.name}</p>
            <p className="Login-from__name">Username</p>
          </div>

          <div className="Login-from">
            <input
              type="email"
              //placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                checkValidate.email = " "
              }}
            />
            <p className="noti-validate">{checkValidate.email}</p>
            <p className="Login-from__email">Email</p>
          </div>

          <div className="Login-from">
            <input
              type="text"
              //placeholder="Phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value)
                checkValidate.phone = " "
              }}
            />
            <p className="noti-validate">{checkValidate.phone}</p>
            <p className="Login-from__phone">Phone</p>
          </div>

          <div className="Login-from">
            <input
              type="password"
              //placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                checkValidate.password = " "
              }}
            />
            <p className="noti-validate">{checkValidate.password}</p>
            <p className="Login-from__password">Password</p>
          </div>

          <div className="Login-from">
            <input
              type="password"
              //placeholder="Cfpassword"
              value={cfpassword}
              onChange={(e) => {
                setCfPassword(e.target.value)
                checkValidate.cfpassword = " "
              }}
            />
            <p className="noti-validate">{checkValidate.cfpassword}</p>
            <p className="Login-from__cfpassword">Cfpassword</p>
          </div>

          <button type="submit">Register</button>
          <p>
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              I Have Account <strong>Login</strong>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
