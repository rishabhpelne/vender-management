import menuItems from "../components/layout/menu/menu-list";
import configs from "../configs/configs";

export function authorizeUserRole(roleId) {
  const menuList = menuItems;
  const roles= configs.roles;

  switch (parseInt(roleId)) {
    case roles.admin:
      return menuList;

    case roles.serviceTeam:
      return menuItems.filter(
        (menu) =>
          menu.name == "Dashboard" ||
          menu.name == "Register User" ||
          menu.name == "My Requests"
      );

    case roles.buTeam:
      return menuItems.filter(
        (menu) =>
          menu.name == "Dashboard" ||
          menu.name == "My Approvals" ||
          menu.name == "Service Requests"
      );

    case roles.vendor:
      return [];

    default:
      return [];
  }
}
