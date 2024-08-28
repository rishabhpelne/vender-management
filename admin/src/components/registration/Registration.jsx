import { useContext, useEffect, useRef, useState } from "react";
import {
  createUser,
  getRolesList,
  UpdateUser,
} from "../../services/user.service";
import { Link } from "react-router-dom";
import { Users } from "../users/users";
import { useForm } from "react-hook-form";
import { getMasterData } from "../../services/shared.service";
import { getStorageValue } from "../../services/storage.service";
import configs from "../../configs/configs";
import UserContext from "../../services/user-context.service";

export function Registration() {
  const [roles, setRoles] = useState([]);
  const [userId, setUserId] = useState(0);
  const [btnText, setbtnText] = useState("Create User");
  const [refreshGrid, setRefreshGrid] = useState(true);
  const [userData, setUserData] = useState({});
  const d = useContext(UserContext)

  // const nameRef = useRef();
  // const emailRef = useRef();
  // const passwordRef = useRef();
  // const confirmPasswordRef = useRef();
  // const roleIdRef = useRef();

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm();

  useEffect(() => {
    setUserData(d);
    getRoles();
  }, []);

  async function getRoles() {
    // getRolesList()
    //   .then((res) => setRoles(res.data));
    let data = await getMasterData();
    setRoles(data.roles);
    if (d.roleId == configs.roles.serviceTeam) {
      setValue("roleId", configs.roles.vendor);
    }
  }

  function saveUser(data) {
    delete data["confirmPassword"];

    if (d.roleId == configs.roles.serviceTeam) {
      data = { ...data, requestedBy: d.id, ApprovedBy: "" };
    } else {
      data = { ...data, requestedBy: 1, ApprovedBy: 1 };
    }

    if (userId == 0) {
      createUser(data).then((data) => {
        alert("User Created Successfully !!");
        setRefreshGrid(true);
      });
    } else {
      data["id"] = userId;
      UpdateUser(data).then((data) => {
        resetFormData();
        alert("User Updated Successfully !!");
        setRefreshGrid(true);
      });
    }
  }

  function resetFormData() {
    setbtnText("Create User");
    setUserId(0);
    document.getElementsByTagName("form")[0].reset();
  }

  function getUserIdFromChild(user) {
    setUserId(user.id);
    setValue("name", user.name);
    setValue("email", user.email);
    setValue("password", user.password);
    setValue("confirmPassword", user.name);
    setValue("roleId", user.roleId);
    setbtnText("Update User");
  }

  return (
    <div>
      <form onSubmit={handleSubmit((data) => saveUser(data))}>
        <h3 className="bg-color">Register User</h3>
        <div className="form-group">
          <label className="form-label">User Name</label>
          <input
            type="text"
            className="form-control"
            {...register("name", {
              required: true,
              minLength: 3,
              maxLength: 20,
            })}
          />
          <div className="text-danger">
            {errors.name?.type == "required" && (
              <label>Name field is required</label>
            )}
            {errors.name?.type == "minLength" && (
              <label>Name must have 3 char's minimum</label>
            )}
            {errors.name?.type == "maxLength" && (
              <label>Name should have 10 char's maximum</label>
            )}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            {...register("email", { required: true })}
          />
          <div className="text-danger">
            {errors.email?.type == "required" && (
              <label>Email field is required</label>
            )}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            {...register("password", { required: true })}
          />
          <div className="text-danger">
            {errors.password?.type == "required" && (
              <label>Password field is required</label>
            )}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            {...register("confirmPassword", { required: true })}
          />
          <div className="text-danger">
            {errors.confirmPassword?.type == "required" && (
              <label>Password field is required</label>
            )}
          </div>
          <p className="mt-3">
            {" "}
            <strong>Role ID : {userData.roleId}</strong>
          </p>
        </div>
        <div className="form-group">
          <label className="form-label">User Role</label>
          <select
            className="form-control"
            {...register("roleId", { required: true })}
            disabled={userData.roleId == 2}
            defaultValue={
              userData.roleId == configs.roles.serviceTeam
                ? configs.roles.vendor
                : ""
            }
          >
            <option value="">Select User Role</option>
            {roles.map((item) => (
              <option value={item.id}>{item.role}</option>
            ))}
          </select>
          <div className="text-danger">
            {errors.roleId?.type == "required" && (
              <label>Select Role field is required</label>
            )}
          </div>
        </div>
        <div className="mt-2">
          <input
            type="submit"
            className="btn btn-success me-3"
            value={btnText}
          />
          <input type="reset" className="btn btn-secondary" value="Clear" />
          <Link to="/login" className="btn btn-link">
            Login User
          </Link>
        </div>
      </form>

      <div className="mt-2">
        <Users
          refresh={refreshGrid}
          getUserId={(user) => {
            getUserIdFromChild(user);
          }}
          gridRefreshed={(val) => setRefreshGrid(false)}
        />
      </div>
    </div>
  );
}
