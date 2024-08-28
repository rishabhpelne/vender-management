import configs from "../configs/configs";
import { getData } from "./context.service";
import store from "./redux-service";
import { getStorageValue, setStorage } from "./storage.service";

const rootApiurl = configs.rootApiurl;

export async function getMasterData() {

  let masterData = getStorageValue("masterData");
  //  store.getState()?.masterData;

  if (!masterData) {
    //roles
    const roles = await getData(rootApiurl + configs.roleApi);

    //status
    const status = await getData(rootApiurl + configs.statusUrl);

    //service
    const services = await getData(rootApiurl + configs.servicesUrl);

    //userStatus
    const userStatus = await getData(rootApiurl + configs.userStatus);

    masterData = {
      roles: roles.data,
      status: status.data,
      services: services.data,
      userStatus: userStatus.data,
    };
    setStorage("masterData", masterData);

    // const action = { type: "masterData", data: masterData };
    // store.dispatch(action);
  }

  return await masterData;
}
