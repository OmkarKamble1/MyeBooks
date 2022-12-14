import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Err from "./Err";
import "./css/Signup.css";

function Signup() {
  const [name, setName] = useState(null);
  const [password, setpassword] = useState(null);
  const [confirm, setconfirm] = useState(null);
  const [username, setusername] = useState(null);
  const navigate = useNavigate();
  const [err, setErr] = useState(null);

  const errFunc = (msg) => {
    setErr(msg);
    setTimeout(() => {
      setErr(null);
    }, 2000);
  };

  const submitHandler = () => {
    if (name && password && confirm && username) {
      if (confirm === password) {
        axios
          .post("https://ebook-backend.onrender.com/api/signup", {
            name: name,
            username: username,
            password: password,
          })
          .then((res) => {
            if (res.data.message === "UserExists") {
              errFunc("User already exists");
            }
            if (res.data.message === "UserRegistered") {
              errFunc("Registered successfully");
              localStorage.setItem("username", username);
              localStorage.setItem("islogged", true);

              setTimeout(() => {
                navigate(0);
              }, 2200);
            }
            if (res.data.message === "UserNotRegistered") {
              errFunc("Registeration failed, try again");
            }
          })
          .catch((er) => errFunc(er.message));
      } else {
        errFunc("Password doesn't match");
      }
    } else {
      errFunc("Enter details");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("islogged")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="sign_div1">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="sign_div2">
          <h1>Enter name</h1>
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="sign_div3">
          <h1>Enter username</h1>
          <input type="text" onChange={(e) => setusername(e.target.value)} />
        </div>
        <div className="sign_div4">
          <h1>Enter password</h1>
          <input
            type="password"
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <div className="sign_div5">
          <h1>Confirm password</h1>
          <input type="password" onChange={(e) => setconfirm(e.target.value)} />
        </div>
        <button onClick={submitHandler}>Sign up</button>
        {err ? <Err msg={err} /> : null}
      </form>
    </div>
  );
}

export default Signup;
