import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { verifyData } from "../utils/reusableFunctions";
import validator from "validator";
// import {
//   getUser,
//   getBasket,
//   getTickets,
// } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
// import { redux } from "../utils/reusableFunctions";

export const SignUp = () => {
  const client = useSelector((state) => state.userReducer.user);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirm: "",
    fullName: "",
  });
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
      singUp();
    }
  }, [enter]);

  const detectEnter = (e) => {
    if (e.key === "Enter") {
      setEnter(true);
    }
  };
  // const fetchCart = async () => {
  //   await redux("/api/v1/ecommerce/basket", dispatch, getBasket, 1);
  // };
  // const fetchUser = async () => {
  //   await redux(`/api/v1/users/one`, dispatch, getUser, 2);
  // };
  // const fetchTickets = async () => {
  //   await redux(`/api/v1/ecommerce/order`, dispatch, getTickets, 3);
  // };
  async function singUp() {
    const verified = verifyData(user, true);
    if (!verified) return;
    let twoNameCheck = user.fullName.split(" ");
    if (twoNameCheck.length < 2) return alert("Please provide Full Name");
    if (user.password !== user.confirm) {
      return alert("Passwords do not match");
    }
    const isMail = validator.isEmail(user.email);
    if (!isMail) {
      return alert("Please provide a real email");
    }
    const isPass = validator.isStrongPassword(user.password);
    if (!isPass) {
      return alert(
        "Password needs to contain 8 characters, at least lowercase: 1, uppercase: 1, numbers: 1, symbols: 1."
      );
    }
    try {
      const response = await fetch("/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
      });
      if (response.status === 401) {
        return alert("User already exists with that email address!");
      }
      const result = await response.json();
      if (result.status === "success") {
        navigate("/login");
      }
    } catch (err) {
      setEnter(false);
      return console.log(err);
    }
  }
  return (
    <div id="signUp">
      <h1>Sign Up</h1>
      <div>
        <span>
          <label className="inputLabel" htmlFor="">
            Full Name
          </label>
          <input
            type="text"
            className="inputField"
            required
            value={user.fullName}
            onChange={(e) => {
              setUser({ ...user, fullName: e.target.value });
            }}
          />
        </span>
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
            title="Password must include 8 characters, of which 1 lowercase, 1 uppercase, 1 number and 1 symbol"
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
          <label className="inputLabel" htmlFor="">
            Re-type Password
          </label>
          <input
            title="Password must include 8 characters, of which 1 lowercase, 1 uppercase, 1 number and 1 symbol"
            type="password"
            className="inputField"
            required
            value={user.confirm}
            onChange={(e) => {
              setUser({ ...user, confirm: e.target.value });
            }}
          />
        </span>
        <button id="authBtn" type="button" onClick={singUp}>
          Create Account
        </button>
        <Link to={"/login"}>
          <button id="authBtn2" type="button">
            Already have an account?
          </button>
        </Link>
      </div>
    </div>
  );
};
