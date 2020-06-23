import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState([]);
  const jwt = require('jsonwebtoken');

  let token;
  let emailMatch = "null";
  let passwordMatch = false;

  useEffect(() => {
    axios
      .get("http://localhost:4000/userdata/")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    setEmail("");
    setPassword("");
    const allUsers = user.map(function (current, i) {
      const container = {
        id: current._id,
        email: current.email,
        password: current.password,
      };
      return container;
    });

    for (let x = 0; x < allUsers.length; x++) {
      if (email === allUsers[x].email){
        emailMatch = true;
        if( password === allUsers[x].password) {
          passwordMatch = true;  
          setLoggedIn(true);
          token = jwt.sign({id: allUsers[x].id, email: allUsers[x].email,}, "secret")
          localStorage.setItem("TOKEN", token);
          console.log(loggedIn);
          console.log(allUsers[x])
          break;
      }
        else{
            passwordMatch = false;
            alert("Password mismatch");
            break;
        }
    }
    else{
        emailMatch = false;
        continue;
    }
}
}

  const successRedirector = () => {
    if (loggedIn) {
      return <Redirect to="/success" />;
    }
  };
  return (
    <div className="page">
      <form className="form" id="login-form" onSubmit={submitHandler}>
        <div className="form-header" id="login-header">
          LOGIN
        </div>
        <input
          className="input-login"
          type="email"
          value={email}
          onChange={emailHandler}
          placeholder="Email"
          required
        />
        <input
          className="input-login"
          type="password"
          value={password}
          onChange={passwordHandler}
          placeholder="Password"
          required
        />
        <input className="submit-login" type="submit" placeholder="SUBMIT" />
        <div style={{ visibility: "hidden" }}>{successRedirector()}</div>
      </form>
    </div>
  );
}

export default Login;
