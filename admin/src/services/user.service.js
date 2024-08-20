import configs from "../configs/configs";
import { getData, saveData, updateData } from "./context.service";

const url = configs.rootApiurl + configs.usersUrl;

const roleApiurl = configs.rootApiurl + configs.roleApi;

export function getUsers() {
  return getData(url);
}

export function getRolesList () {
  return getData(roleApiurl);
}

export function createUser(user) {
  return saveData(url, user);
}

export function UpdateUser(user) {
  return updateData(url+user.id, user);
}

