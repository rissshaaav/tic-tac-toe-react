import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

const Signup = ({setIsAuth}) => {
  const cookies = new Cookies();
  const [userInfo, setUserInfo] = useState(null);

  const signup = () => {
    Axios.post("http://localhost:3001/signup", userInfo).then(res=>{
      const {token, userId, firstName, lastName, username, hashedPassword} = res.data;

      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("username", username);
      cookies.set("hashedPassword", hashedPassword);
      setIsAuth(true);
    })
  };
  return (
    <div className="signUp">
      <label>Signup Page</label>
      <input
        type="text"
        placeholder="first name"
        onChange={(e) => {
          setUserInfo({ ...userInfo, firstName: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="last name"
        onChange={(e) => {
          setUserInfo({ ...userInfo, lastName: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="username"
        onChange={(e) => {
          setUserInfo({ ...userInfo, username: e.target.value });
        }}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => {
          setUserInfo({ ...userInfo, password: e.target.value });
        }}
      />
      <button type="submit" onClick={signup}>
        Signup
      </button>
    </div>
  );
};

export default Signup;
