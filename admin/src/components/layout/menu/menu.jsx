import { MenuLink } from "../../atomic/menu-link/menu-link";
import menuItems from "./menu-list";

export function Menu() {
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
