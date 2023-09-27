import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import { useSelector } from "react-redux";

export const ForgotPassword = () => {
  const client = useSelector((state) => state.userReducer.user);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [toggle, setToggle] = useState(true);
  const [enter, setEnter] = useState(false);
  useEffect(() => {
    document.addEventListener("keypress", detectEnter);
    return () => {
      document.removeEventListener("keypress", detectEnter);
    };
  }, []);
  useEffect(() => {
    if (client.fullName) {
      navigate("/");
    }
  }, [client]);
  useEffect(() => {
    if (enter) {
      sendReset();
    }
  }, [enter]);

  const detectEnter = (e) => {
    if (e.key === "Enter") {
      setEnter(true);
    }
  };
  const sendReset = async () => {
    try {
      const isMail = validator.isEmail(email);
      if (!isMail) {
        return alert("Invalid email");
      }
      const response = await fetch("/api/v1/auth/forgotPassword", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          site: window.location.href.split("/")[2],
          protocol: window.location.href.split("/")[0],
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.status === 404) {
        return alert("User does not exist");
      }
      const result = await response.json();
      if (result.status === "success") {
        setToggle(false);
      }
    } catch (err) {
      alert("Internal server error");
      setEnter(false);
      return console.log(err);
    }
  };
  return (
    <div id="forgot_password">
      <h1>Forgot Password</h1>
      {toggle ? (
        <div id="forgot_info">
          <span>
            <label className="inputLabel" htmlFor="">
              Email
            </label>
            <input
              className="inputField"
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </span>
          <button id="authBtn" type="button" onClick={sendReset}>
            Send password reset email
          </button>
          <Link to={"/login"}>
            <button id="authBtn2" type="button">
              Back to login
            </button>
          </Link>
        </div>
      ) : (
        <span>
          <h2 style={{ marginBottom: "20px" }}>
            A password reset link has been sent to your email.
          </h2>
          <Link to={"/login"}>
            <button id="authBtn2" type="button">
              Back to login
            </button>
          </Link>
        </span>
      )}
    </div>
  );
};
