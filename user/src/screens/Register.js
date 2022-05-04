import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import isEmpty from "validator/lib/isEmpty";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import { register } from "../Redux/Actions/userActions";
import Header from "./../components/Header";

const Register = ({ location, history }) => {
  window.scrollTo(0, 0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cfpassword, setCfPassword] = useState("");

  const [checkValidate, setCheckValidate] = useState("") // tao một usestate mới để check from
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
  const validateAll = () =>{
     const msg = {}
     if(isEmpty(name)){
        msg.name = "Please input your name";
     }

     if(isEmpty(email)){
        msg.email = "Plesae input your email";
     }

     if(isEmpty(password)){
        msg.password = "Please input your password";
     }else{
       if(password.length < 6){
         msg.password = "Password must be at least 6 characters"
       }
     }

     if(isEmpty(cfpassword)){
      msg.cfpassword = "Please input your cfpassword";
      }else{
        if(cfpassword.length < 6){
          msg.cfpassword = "CfPassword must be at least 6 characters"
        }else{
          if(cfpassword !== password){
            msg.cfpassword = "The password entered is incorrect"
          }
        }
      }
     setCheckValidate(msg)
     if(Object.keys(msg).length > 0) return false
     return true
  }
 

  const submitHandler = (e) => {
    e.preventDefault();
    const isValid = validateAll()
    if(!isValid) return
    dispatch(register(name, email, password));
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
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              checkValidate.name = " "
            }}
          />
          <p className="noti-validate">{checkValidate.name}</p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              checkValidate.email = " "
            }}
          />
          <p className="noti-validate">{checkValidate.email}</p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              checkValidate.password = " "
            }}
          />
          <p className="noti-validate">{checkValidate.password}</p>
          <input
            type="password"
            placeholder="Cfpassword"
            value={cfpassword}
            onChange={(e) => {
              setCfPassword(e.target.value)
              checkValidate.cfpassword = " "
            }}
          />
          <p className="noti-validate">{checkValidate.cfpassword}</p>
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
