import React from "react";
import { GoogleLoginProvider } from "../GoogleLoginProvider/GoogleLoginProvider";

export const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onLoginHandler = (event) => {
    event.preventDefault()
    console.log(username);
    console.log(password);
  }

  return (
    <div className="login-wrapper">
      <div className="login-inner-wrapper">
        <h1>Login Dashboard</h1>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          required
          defaultValue={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required
          defaultValue={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-btn" onClick={onLoginHandler}>
          Login
        </button>
        <GoogleLoginProvider />
      </div>
    </div>
  );
};
