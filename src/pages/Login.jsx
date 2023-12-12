import "./Login.css";
import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import sharedContext from "../context/SharedContext";
import toast from "react-hot-toast";

import { auth } from "../firebase";
import Loader from "../components/Loader";

const Login = () => {
  const { setLoader } = useContext(sharedContext);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setFormData((preState) => {
      return {
        ...preState,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    if (!formData.email || !formData.password) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then(async (res) => {
        console.log(res);
        setLoader(false);
        navigate("/blog");
        toast.success("logined Successfully");
      })
      .catch((err) => {
        toast.error(err.message);
        setLoader(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <div className="login_pg">
      <Loader />
      <h3>Brand Elevate</h3>
      <div>
        <h4>Login</h4>
        <form onSubmit={handleSubmit} className="login_con">
          <div className="input__Fld">
            <input
              type="email"
              value={formData.email}
              onChange={onChangeInput}
              placeholder="Email"
              required
              autoComplete="off"
              name="email"
            />
          </div>
          <div className="input__Fld">
            <input
              type="password"
              value={formData.password}
              onChange={onChangeInput}
              placeholder="Password"
              required
              autoComplete="off"
              name="password"
            />
          </div>
          <div className="rem__Div">
            <div className="rm_Pass">
              <label>
                <input
                  name="rememberMe"
                  type="checkbox"
                  checked={""}
                  onChange={onChangeInput}
                />{" "}
                <p>Remember me</p>
              </label>
            </div>
            <NavLink
              style={{
                textDecoration: "none",
                color: "white",
              }}
              to="/forgotPassword"
            >
              <div className="frg__Pas">
                <p style={{ cursor: "pointer" }}>Forgot password</p>
              </div>
            </NavLink>
          </div>
          <div>{/* <span style={{ color: "red" }}>{error}</span> */}</div>
          <div className="sbt__Btn">
            <button type="submit">Login</button>
          </div>
        </form>
        <div className="ck__Act">
          <p>©2023 BrandElevate. All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
