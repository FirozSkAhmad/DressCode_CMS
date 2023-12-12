import "./ForgotPassword.css";
import { useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import sharedContext from "../context/SharedContext";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const ForgotPassword = () => {
  const { setLoader } = useContext(sharedContext);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setFormData((preState) => {
      return {
        ...preState,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    sendPasswordResetEmail(auth, formData.email)
      .then((data) => {
        console.log(data);
        setLoader(false);
        navigate("/login");
        toast.success("check yor mail to reset password");
      })
      .catch((err) => {
        alert(err.code);
        setLoader(false);
      });
  };

  return (
    <div className="forPass_pg">
      <Loader />
      <h3>ProSquad</h3>
      <div>
        <h1>Reset Password</h1>
        <form onSubmit={(e) => handleSubmit(e)} className="forPass_con">
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
          <div className="sbt__Btn">
            <button type="submit">Submint</button>
          </div>
          <div className="lgn__Act">
            <p>
              back to{" "}
              <span>
                <NavLink
                  style={{
                    textDecoration: "none",
                    color: "white",
                    cursor: "pointer",
                  }}
                  to="/login"
                >
                  login page
                </NavLink>
              </span>
            </p>
          </div>
        </form>
        <div className="ck__Act">
          <p>©2023 Prosquad. All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
