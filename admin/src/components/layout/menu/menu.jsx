import { useContext, useEffect, useState } from "react";
import { getStorageValue } from "../../../services/storage.service";
import { MenuLink } from "../../atomic/menu-link/menu-link";
import { authorizeUserRole } from "../../../middleware/role-authorization";
import UserContext from "../../../services/user-context.service";

export function Menu() {
  const [menuItems, setmenuItems] = useState([]);
  const userDetails = useContext(UserContext);

  useEffect(() => {
    const list = authorizeUserRole(userDetails.roleId);
    setmenuItems(list);
  }, []);

  return (
    <div className="bg-dark" style={{ height: "100vh" }}>
      {menuItems &&
        menuItems.map((item) => (
          <MenuLink
            linkTo={item.linkTo}
            name={item.name}
            className="d-block text-decoration-none text-light p-3"
          />
        ))}
    </div>
  );
}
