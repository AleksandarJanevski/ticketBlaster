import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { preview, uploadFunc, verifyData } from "../../utils/reusableFunctions";
import { getUser } from "../../../redux/actions/userActions";
import validator from "validator";

export const UserDetails = () => {
  const dispatch = useDispatch();
  const userRedux = useSelector((state) => state.userReducer.user);
  const [user, setUser] = useState({
    email: userRedux.email,
    fullName: userRedux.fullName,
    picture: userRedux.picture,
    role: userRedux.role,
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");
  const [previewPic, setPreviewPic] = useState("");
  const [sent, setSent] = useState(false);
  const [change, setChange] = useState(false);
  const picturePreview = (e) => {
    preview(e, setPreviewPic, setImage);
  };
  useEffect(() => {
    if (sent) {
      updateUser();
    }
  }, [sent]);
  const handleUpload = async (e) => {
    try {
      e.preventDefault();
      let valid = verifyData(user, false);
      if (valid) {
        await uploadFunc(
          previewPic,
          user.picture,
          setUser,
          user,
          setSent,
          true,
          "profile"
        );
      }
    } catch (err) {
      alert(err.message);
    }
  };
  const updateUser = async () => {
    try {
      const isMail = validator.isEmail(user.email);
      if (!isMail) {
        return alert("Please provide a real email");
      }
      const response = await fetch("/api/v1/users", {
        method: "PATCH",
        body: JSON.stringify(user),
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();
      if (result.status === "success") {
        dispatch(getUser(user));
        document.getElementById("fileInput").value = "";
      }
      setSent(false);
      alert("Profile Updated!");
    } catch (err) {
      return console.log(err);
    }
  };
  const changePassword = async () => {
    try {
      if (password !== confirmPassword) {
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
      const response = await fetch(`/api/v1/users/changePassword`, {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();
      if (result.status === "success") {
        setPassword("");
        setConfirmPassword("");
        setChange(false);
        alert("Password Updated!");
      }
    } catch (err) {
      return console.log(err);
    }
  };
  return (
    <div id="user_details">
      {user.picture && (
        <>
          <div id="user_prof_top">
            <div id="user_profile">
              {image ? (
                <div
                  className="previewProfile"
                  style={{
                    backgroundImage: `url(${image})`,
                  }}
                />
              ) : (
                <div
                  className="previewProfile"
                  style={{
                    backgroundImage: `url(/img/profile/${user.picture})`,
                  }}
                />
              )}
              <label htmlFor="" id="fileInput">
                <input
                  type="file"
                  onChange={picturePreview}
                  accept="image/png, image/jpg, image/jpeg"
                />
                Upload Avatar
              </label>

              <button
                className="userSubmit"
                type="button"
                onClick={handleUpload}
              >
                Submit
              </button>
            </div>
            <div id="user_inputs">
              <span>
                <label className="inputLabel" htmlFor="">
                  Full Name
                </label>
                <input
                  type="text"
                  className="inputField"
                  value={user.fullName}
                  onChange={(e) => {
                    setUser({ ...user, fullName: e.target.value });
                  }}
                  required
                  id="user_info"
                />
              </span>
              <span>
                <label className="inputLabel" htmlFor="">
                  Email
                </label>
                <input
                  type="text"
                  className="inputField"
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                  }}
                  value={user.email}
                  required
                  id="user_info"
                />
              </span>
            </div>
          </div>
          <div id="user_pass">
            <div id="user_pass_top">
              <p>Password</p>
              <button
                type="button"
                onClick={() => {
                  setChange(!change);
                }}
              >
                Change Password
              </button>
            </div>
            {change ? (
              <div id="changePassword">
                <div>
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
                </div>
                <button
                  className="userSubmit"
                  type="button"
                  onClick={changePassword}
                >
                  Submit
                </button>
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};
