import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AdminDelete } from "./AdminDelete";
import { AdminRole } from "./AdminRole";

export const AdminUsers = () => {
  const admin = useSelector((state) => state.userReducer.user.role);
  const op = useSelector((state) => state.idReducer.id.id);
  const [toggle, setToggle] = useState(false);
  const [toggleB, setToggleB] = useState(false);
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (admin && admin !== "admin") {
      window.location.href = "/";
    }
    if (op) {
      getUsers();
    }
  }, [op]);
  const getUsers = async () => {
    try {
      const response = await fetch("/api/v1/users", {
        method: "GET",
        headers: {
          "Content-type": "aplication/json",
        },
        credentials: "include",
      });
      const result = await response.json();
      if (result.status === "success") {
        const filter = result.data.users.filter((users) => users._id !== op);
        setUsers(filter);
      }
    } catch (err) {
      return console.log(err);
    }
  };
  const updateRole = async (user, type) => {
    try {
      let update = {
        role: "admin",
      };
      if (type === "admin") {
        update.role = "user";
      }

      console.log(update.role);
      const response = await fetch(`/api/v1/users/role/${user}`, {
        method: "POST",
        body: JSON.stringify(update),
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();
      if (result.status === "success") {
        setToggleB(false);
        getUsers();
      }
    } catch (err) {
      return console.log(err);
    }
  };
  const deleteUser = async () => {
    try {
      const response = await fetch(`/api/v1/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });

      if (response.status === 204) {
        const filter = users.filter((element) => element._id !== userId);
        setUsers(filter);
        setToggle(false);
      }
    } catch (err) {
      return console.log(err);
    }
  };

  return (
    <div id="admin_users">
      {users && admin && (
        <div>
          {users.map((element, i) => {
            return (
              <div key={i} id="list_users">
                <div id="list_users_one">
                  <div id="list_users_two">
                    <div
                      className="previewProfile"
                      style={{
                        backgroundImage: `url(/img/profile/${element.picture})`,
                      }}
                    />
                    <span>
                      <p>{element.fullName}</p>
                      <p>{element.email}</p>
                    </span>
                  </div>
                  <div id="list_users_three">
                    <button
                      id={element.role === "admin" ? "makeUser" : "makeAdmin"}
                      type="button"
                      onClick={() => {
                        setUserId(element._id);
                        setUserRole(element.role);
                        setToggleB(true);
                        setToggle(false);
                      }}
                    >
                      {element.role === "admin" ? "Make User" : "Make Admin"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setUserId(element._id);
                        setToggle(true);
                        setToggleB(false);
                      }}
                    >
                      Delete User
                    </button>
                  </div>
                </div>
                <div id="border"></div>
              </div>
            );
          })}
        </div>
      )}
      {toggle ? (
        <AdminDelete
          id={userId}
          toggl={() => {
            setToggle(false);
          }}
          func={deleteUser}
        />
      ) : null}
      {toggleB ? (
        <AdminRole
          func={updateRole}
          id={userId}
          role={userRole}
          toggl={() => {
            setToggleB(false);
          }}
        />
      ) : null}
    </div>
  );
};
