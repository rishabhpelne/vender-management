import { useEffect, useRef, useState } from "react";
import {
  createUser,
  getRolesList,
  UpdateUser,
} from "../../services/user.service";
import { Link } from "react-router-dom";
import { Users } from "../users/users";
import { useForm } from "react-hook-form";

export function Registration() {
  const [roles, setRoles] = useState([]);
  const [userId, setUserId] = useState(0);
  const [btnText, setbtnText] = useState("Create User");

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
    getRoles();
  }, []);

  function getRoles() {
    getRolesList()
      .then((res) => res.json())
      .then((data) => setRoles(data));
  }

  function saveUser(data) {
    delete data["confirmPassword"];

    if (userId == 0) {
      createUser(data)
        .then((res) => res.json())
        .then((data) => {
          alert("User Created Successfully !!");
        });
    } else {
      data["id"] = userId;
      UpdateUser(data)
        .then((res) => res.json())
        .then((data) => {
          resetFormData();
          alert("User Updated Successfully !!");
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
      <form
        onSubmit={handleSubmit((data) => {
          saveUser(data);
        })}
      >
        <h3 className="bg-color">Register User</h3>
        <div className="form-group">
          <label className="form-label">User Name</label>
          <input
            type="text"
            className="form-control"
            {...register("name", {
              required: true,
              minLength: 3,
              maxLength: 10,
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
        </div>
        <div className="form-group">
          <label className="form-label">User Role</label>
          <select
            className="form-control"
            {...register("roleId", { required: true })}
          >
            <option value="">Select User Role</option>
            {roles.map((item) => {
              return <option value={item.id}>{item.role}</option>;
            })}
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
          getUserId={(user) => {
            getUserIdFromChild(user);
          }}
        />
      </div>
    </div>
  );
}
