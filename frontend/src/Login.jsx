import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Err from "./Err";
import "./css/Login.css";

function Login() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();
  const [islogged, setLogged] = useState(localStorage.getItem("islogged"));
  const [err, setErr] = useState(null);

  const errFunc = (msg) => {
    setErr(msg);
    setTimeout(() => {
      setErr(null);
    }, 2000);
  };
  useEffect(() => {
    if (localStorage.getItem("islogged")) {
      navigate("/");
    }
  });

  const loginHandler = () => {
    if (username && password) {
      axios
        .post("https://ebook-backend.onrender.com/api/login", {
          username: username,
          password: password,
        })
        .then((res) => {
          if (res.data.message === "UserNotFound") {
            errFunc("Invalid credentials");
          } else {
            localStorage.setItem("username", username);
            localStorage.setItem("islogged", true);
            navigate(0);
          }
        })
        .catch((er) => errFunc(er.message));
    } else {
      errFunc("Enter credentials");
    }
  };
  return (
    <div className="login_div1">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="login_div2">
          <h1>Username </h1>
          <input
            type="text"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="login_div3">
          <h1>Password</h1>
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={loginHandler}>Login</button>
      </form>

      {err ? <Err msg={err} /> : null}
    </div>
  );
}

export default Login;
