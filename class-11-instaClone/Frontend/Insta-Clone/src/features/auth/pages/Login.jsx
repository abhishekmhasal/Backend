import { useState } from "react";
import "./styles/form.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hookes/useAuth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <h1>Loading....</h1>;
  }
  async function submitHandler(e) {
    e.preventDefault();

    handleLogin(username, password).then((res) => {
      console.log(res);
      navigate("/");
    });
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>

        <form onSubmit={submitHandler}>
          <input
            onInput={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="Username"
            placeholder="Enter username"
          />

          <input
            onInput={(e) => {
              setPassword(e.target.value);
            }}
            type="text"
            name="password"
            placeholder="enter Password"
          />
          <button type="submit"> Login </button>
        </form>
        <p>
          Don't have an account?
          <Link to="/register" className="toggle-auth-form">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
