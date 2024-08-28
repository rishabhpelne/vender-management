import { useContext, useEffect, useState } from "react";
import { getUsers } from "../../services/user.service";
import { getMasterData } from "../../services/shared.service";
import { getStorageValue } from "../../services/storage.service";
import configs from "../../configs/configs";
import UserContext from "../../services/user-context.service";

export function Users(props) {
  const [data, setData] = useState([]);
  const [roles, setRoles] = useState([]);
  let userData = useContext(UserContext);
  useEffect(() => {
    getUsersList();
  });

  function Click(user) {
    props.getUserId(user);
  }

  function getUsersList() {
    getUsers().then(async (res) => {
      let r = await getMasterData();
      let data = res.data;
      if (userData.roleId == configs.roles.serviceTeam) {
        data = data.filter(
          (item) =>
            item.roleId == configs.roles.vendor &&
            item.requestedBy == userData.id
        );
      }

      data = data.map((item) => {
        return {
          ...item,
          roleName: r.roles.find((x) => x.id == item.roleId)?.role,
        };
      });
      setData(data);
      gridRefreshed();
    });
  }

  function gridRefreshed() {
    props.gridRefreshed(true);
  }
  return (
    <div>
      <table className="table table-striped table-hover table-bordered">
        <thead className="table-primary">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role Name</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.roleName}</td>
                <td>
                  <input
                    type="button"
                    onClick={() => Click(item)}
                    className="btn btn-link"
                    value="Update"
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
