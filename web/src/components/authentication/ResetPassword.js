import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import validator from "validator";

export const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [toggle, setToggle] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [enter, setEnter] = useState(false);

  useEffect(() => {
    document.addEventListener("keypress", detectEnter, true);
  }, []);
  useEffect(() => {
    if (enter) {
      setToggle(!toggle);
    }
  }, [enter]);
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
      if (
        (!password && confirmPassword && password !== confirmPassword) ||
        password.trim() === ""
      ) {
        return alert("Passwords do not match");
      }
      const isPass = validator.isStrongPassword(password);
      if (!isPass) {
        return alert(
          "Password needs to contain 8 characters, lowercase: 1, uppercase: 1, numbers: 1, symbols: 1."
        );
      }
      const body = {
        newPassword: password,
        confirmPassword: confirmPassword,
      };
      const response = await fetch(`/api/v1/auth/resetPassword/${token}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();
      if (result.status === "success") {
        window.location.href = "/";
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
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
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
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
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
