import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import validator from "validator";
import { useSelector } from "react-redux";

export const ResetPassword = () => {
  const client = useSelector((state) => state.userReducer.user);
  const navigate = useNavigate();
  const { token } = useParams();
  const [reset, setReset] = useState({
    password: "",
    confirm: "",
  });
  const [toggle, setToggle] = useState(false);
  const [enter, setEnter] = useState(false);

  useEffect(() => {
    document
      .getElementById("reset_password")
      .addEventListener("keypress", detectEnter, true);
    // return () => {
    //   document
    //     .getElementById("reset_password")
    //     .removeEventListener("keypress", detectEnter, true);
    // };
  }, []);
  useEffect(() => {
    if (enter) {
      setToggle(!toggle);
    }
  }, [enter]);
  useEffect(() => {
    if (client.fullName) {
      navigate("/");
    }
  }, [client]);
  const detectEnter = (e) => {
    if (e.key === "Enter") {
      setEnter(true);
    }
  };
  useEffect(() => {
    if (token && toggle) {
      resetPassword();
    }
  }, [toggle]);
  const resetPassword = async () => {
    try {
      if (reset.password !== reset.confirm) {
        return alert("Passwords do not match");
      }
      const isPass = validator.isStrongPassword(reset.password);
      if (!isPass) {
        return alert(
          "Password needs to contain 8 characters, lowercase: 1, uppercase: 1, numbers: 1, symbols: 1."
        );
      }
      const response = await fetch(`/api/v1/auth/resetPassword/${token}`, {
        method: "PATCH",
        body: JSON.stringify(reset),
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();
      if (result.status === "success") {
        navigate("/login");
      }
    } catch (err) {
      setToggle(false);
      alert("Unauthorized");
      return console.log(err);
    }
  };
  return (
    <div id="reset_password">
      <h1>Reset Password</h1>
      <div id="reset_info">
        <span>
          <label className="inputLabel" htmlFor="">
            Password
          </label>
          <input
            type="password"
            className="inputField"
            required
            value={reset.password}
            onChange={(e) => {
              setReset({ ...reset, password: e.target.value });
            }}
          />
        </span>
        <span>
          <label className="inputLabel" htmlFor="">
            Re-Type Password
          </label>
          <input
            type="password"
            className="inputField"
            required
            value={reset.confirm}
            onChange={(e) => {
              setReset({ ...reset, confirm: e.target.value });
            }}
          />
        </span>
        <button
          id="authBtn"
          type="button"
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          Reset Password
        </button>
        <Link to={"/login"}>
          <button id="authBtn2" type="button">
            Back to login
          </button>
        </Link>
      </div>
    </div>
  );
};
