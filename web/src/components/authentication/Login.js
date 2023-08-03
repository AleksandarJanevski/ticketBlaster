import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";

export const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [enter, setEnter] = useState(false);
  const [fail, setFail] = useState(false);

  useEffect(() => {
    document.addEventListener("keypress", detectEnter, true);
  }, []);
  useEffect(() => {
    if (enter) {
      login();
    }
  }, [enter]);
  const detectEnter = (e) => {
    if (e.key === "Enter") {
      setEnter(true);
    }
  };
  async function login() {
    try {
      const isMail = validator.isEmail(user.email);
      if (!isMail) {
        setFail(true);
      }
      const isPass = validator.isStrongPassword(user.password);
      if (!isPass) {
        setFail(true);
      }
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
      });
      const result = await response.json();
      console.log(result);
      if (result.status === "success") {
        window.location.href = "/";
      }
    } catch (err) {
      setEnter(false);
      setFail(true);
      return console.log(err);
    }
  }
  return (
    <div id="login">
      <h1>Log In</h1>
      <div>
        <span>
          <label className="inputLabel" htmlFor="">
            Email
          </label>
          <input
            type="text"
            className="inputField"
            required
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
        </span>
        <span>
          <label className="inputLabel" htmlFor="">
            Password
          </label>
          <input
            type="password"
            className="inputField"
            required
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
        </span>
        <span>
          <Link to="/forgotPassword">Forgot Password?</Link>
          <button id="authBtn" type="button" onClick={login}>
            Log In
          </button>
        </span>
        <Link to={"/signUp"}>
          <button id="authBtn2" type="button">
            Dont have an account?
          </button>
        </Link>
        {fail ? (
          <div style={{ color: "red" }}>Invalid email or password!</div>
        ) : null}
      </div>
    </div>
  );
};
