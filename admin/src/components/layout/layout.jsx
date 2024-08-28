import React, { useContext, useEffect, useState } from "react";
import { Menu } from "./menu/menu";
import UserContext from "../../services/user-context.service";
import store from "../../services/redux-service";
import { removeStorageValue } from "../../services/storage.service";
import { useNavigate } from "react-router-dom";
import { getMasterData } from "../../services/shared.service";

export function Layout(props) {
  const [userRoleName, setUserRoleName] = useState("");
  const userDetails = useContext(UserContext);
  const navigate = useNavigate();

  function logOut() {
    store.dispatch({ type: "userDetails", data: null });
    removeStorageValue("userDetails");
    navigate("/");
  }

  useEffect(() => {
    getUserRole();
  }, []);

  async function getUserRole() {
    const d = await getMasterData();
    setUserRoleName(d.roles.find((item) => item.id == userDetails.roleId).role);
  }
  return (
    <React.Fragment>
      <div className="row bg-dark">
        <div className="col-9"></div>
        <div className="col-3 text-light">
          {userDetails.name.toUpperCase()} ({userRoleName})
          <input
            type="button"
            className="btn btn-link mx-3"
            value="Logout"
            onClick={() => {
              logOut();
            }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <Menu />
        </div>
        <div className="col-10">{props.children}</div>
      </div>
    </React.Fragment>
  );
}
