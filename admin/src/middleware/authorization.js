import { useNavigate } from "react-router-dom";
import { getStorageValue } from "../services/storage.service";
import { authorizeUserRole } from "./role-authorization";
import { useContext } from "react";
import UserContext from "../services/user-context.service";

export function Authorization(props) {
  const navigate = useNavigate();
  const userDetails = useContext(UserContext);

  const path = window.location.pathname;
  if (
    !(
      path == "" ||
      path == "/" ||
      path == "/login" ||
      path == "/no-access" ||
      path == "not-found"
    )
  ) {
    // getStorageValue("userDetails");
    const menuList = authorizeUserRole(userDetails.roleId);

    const hasAccess = menuList.some(
      (item) => item.linkTo.toLowerCase() == path.toLowerCase()
    );
    if (hasAccess) {
      return props.children;
    } else {
      window.location.pathname = "/no-access";
      return navigate("/no-access");
    }
  } else {
    return props.children;
  }
}
