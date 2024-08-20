import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useRef } from "react";
import { setStorage } from "../../services/storage.service";
import { useForm } from "react-hook-form";

const Login = () => {
  // const EmailRef = useRef();
  // const passwordRef = useRef();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  async function userLogin(user) {
    // const user = {
    //   email: EmailRef.current.value,
    //   password: passwordRef.current.value,
    // };

    const users = await getUser();

    const userData = users.find(
      (item) =>
        item.email.toLowerCase() === user.email.toLowerCase() &&
        item.password === user.password
    );

    // localStorage.setItem("userDetails" , JSON.stringify(userData))
    setStorage("userDetails", JSON.stringify(userData));

    navigate("/home");
  }

  async function getUser() {
    const url = "http://localhost:4000/users/";
    const res = await fetch(url);
    const users = await res.json();
    return users;
  }

  const navigate = useNavigate();

  function navigateToRegistration() {
    navigate("/registration");
  }
  return (
    <form onSubmit={handleSubmit((user) => userLogin(user))}>
      <h3 className="bg-color">Login Page</h3>
      <div className="form-group">
        <label className="form-label">UserName/Email</label>
        <input
          type="text"
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
      <div className="mt-2">
        <input type="submit" className="btn btn-primary me-2" value="Login" />
        <input
          type="button"
          className="btn btn-secondary me-2"
          value="Cancel"
        />
        <input
          type="button"
          className="btn btn-link"
          value="Register User"
          onClick={() => navigateToRegistration()}
        />
        {/* <Link to="/registration" className="btn btn-link" >Register User</Link> */}
      </div>
    </form>
  );
};

export default Login;
