import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

const Login = ({setIsAuth}) => {
  const cookies = new Cookies();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    Axios.post("http://localhost:3001/login", { username, password }).then(
      (res) => {
        const { token, userId, firstName, lastName, username, hashedPassword } =
          res.data;
        cookies.set("token", token);
        cookies.set("userId", userId);
        cookies.set("firstName", firstName);
        cookies.set("lastName", lastName);
        cookies.set("username", username);
        cookies.set("hashedPassword", hashedPassword);
        setIsAuth(true);
      }
    );
  };
  return (
    <div>
      <input
        type="text"
        placeholder="username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button type="submit" onClick={login}>
        Login
      </button>
    </div>
  );
};

export default Login;
