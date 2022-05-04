import React, { useEffect, useState ,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../LoadingError/Error";
import Toast from "./../LoadingError/Toast";
import Loading from "./../LoadingError/Loading";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../Redux/Actions/userActions";
import isEmpty from "validator/lib/isEmpty";

const ProfileTabs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [blean, setBlean] = useState(false);
  const [checkbox, setCheckbox] = useState("0");
  const toastId = React.useRef(null);
  const refOldPass = useRef();/// ghi chú
  const refNewPass = useRef();/// ghi chú
  const refCfPass = useRef();/// ghi chú
  const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading: updateLoading } = userUpdateProfile;

  // xư lý phần cập nhật mật khẩu
  function removeAtt(){
    refOldPass.current.removeAttribute("disabled")
    refNewPass.current.removeAttribute("disabled")
    refCfPass.current.removeAttribute("disabled")
  }
  function setAtt(){
    refOldPass.current.setAttribute("disabled", "")
    refNewPass.current.setAttribute("disabled", "")
    refCfPass.current.setAttribute("disabled", "")
  }

  function checkSetPass(){
    let x = Number(checkbox);
      if(x === 0){
          setBlean(true)
          removeAtt()
          setCheckbox("1")
      }else{
          setBlean(false)
          setAtt()
          setCheckbox("0")
      }
  }
  // xử lý login validate profile upload
  const [objFormPass, setObjFromPass] = useState({})
  function checkPassword(){
    const passObj = {}
    if(isEmpty(oldPassword)){
      passObj.oldPassword = "Please input your Password"
    }
    if(isEmpty(password)){
        passObj.password = "Please input your Password"
    }else{
      if(password.length < 6){
        passObj.password = "Password must be at least 6 characters"
      }
    }
    if(isEmpty(confirmPassword)){
        passObj.confirmPassword = "Please input your ConfirmPassword"
    }else{
      if(confirmPassword.length < 6){
        passObj.confirmPassword = "Password must be at least 6 characters"
      }else{
        if(password !== confirmPassword){
          passObj.confirmPassword = "The password entered is incorrect"
        }
      }
    }
    setObjFromPass(passObj)
    if(Object.keys(passObj).length > 0) return false
    return true
  }

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if(blean && !checkPassword()) return // check funtion check pass để kiểm tra xem có các trường bị rổng hay không
    // Password match
    if (password !== confirmPassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Password does not match", Toastobjects);
      }
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));// lưu ý thêm old password vào rồi xử lý bên server
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Profile Updated", Toastobjects);
      }
    }
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <>
      <Toast />
      {error && <Message variant="alert-danger">{error}</Message>}
      {loading && <Loading />}
      {updateLoading && <Loading />}
      <form className="row  form-container" onSubmit={submitHandler}>
        <div className="col-md-6">
          <div className="form">
            <label for="account-fn">UserName</label>
            <input
              className="form-control"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label for="account-email">E-mail Address</label>
            <input
              className="form-control"
              type="email"
              disabled
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-pass">Old Password</label>
            <input
              ref={refOldPass}
              className="form-control"
              type="password"
              disabled
              value={oldPassword}
              onChange={(e) => {
                objFormPass.oldPassword = " "
                setOldPassword(e.target.value)
              }}
            />
            <p className="noti-validate">{objFormPass.oldPassword}</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-pass">New Password</label>
            <input
              ref={refNewPass}
              className="form-control"
              type="password"
              disabled
              value={password}
              onChange={(e) => {
                objFormPass.password = " "
                setPassword(e.target.value)
              }}
            />
            <p className="noti-validate">{objFormPass.password}</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-confirm-pass">Confirm Password</label>
            <input
              ref={refCfPass}
              className="form-control"
              type="password"
              disabled
              value={confirmPassword}
              onChange={(e) => {
                objFormPass.confirmPassword = " "
                setConfirmPassword(e.target.value)
              }}
            />
            <p className="noti-validate">{objFormPass.confirmPassword}</p>
          </div>
        </div>
        <button type="submit">Update Profile</button>
      </form>
      <div className="setpass">
          <p className="setpass-noti">Update password here <input type="checkbox" onClick={checkSetPass}></input></p>
      </div>
    </>
  );
};

export default ProfileTabs;
