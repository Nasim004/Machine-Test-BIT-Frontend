import "./login.css";
import React, { useContext } from "react";
import axios from "../../utils/axios";
import Cookies from "js-cookie";
import { login } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "../../context/UserContext";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const { updateUsername } = useContext(UserContext);
  const handleLogin = (e) => {
    e.preventDefault();
    const data = JSON.stringify({
      username,
      password,
    });
    axios
      .post(login, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.data.status === "Logged") {
          Cookies.set("jwt", String(response.data.jwt_token));
          updateUsername(username);
        }
        navigate("/dashboard");
      });
  };

  return (
    <div class="container-fluid d-flex align-items-center justify-content-center vh-100 ">
      <div class="row main-content bg-success text-center">
        <div class="col-md-4 text-center company__info">
          <span class="company__logo">
            <h2>
              <span class="fa fa-android"></span>
            </h2>
          </span>
          <h4 class="company_title">Hello Login Here</h4>
        </div>
        <div class="col-md-8 col-xs-12 col-sm-12 login_form ">
          <div class="container-fluid">
            <div class="row">
              <form control="" class="form-group" onSubmit={handleLogin}>
                <div class="row">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    class="form__input"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>
                <div class="row">
                  <span class="fa fa-lock"></span>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    class="form__input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div class="row">
                  <input type="submit" value="Submit" class="btn" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
