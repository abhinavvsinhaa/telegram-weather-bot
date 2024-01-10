import React, { useContext } from "react";
import { GoogleLoginProvider } from "../GoogleLoginProvider/GoogleLoginProvider";
import { AuthContext } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { setToken } = useContext(AuthContext)
  const navigate = useNavigate()

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onLoginHandler = async (event) => {
    try {
      event.preventDefault()
      const res = await axios.post(`https://telegram-weather-bot-server-gz9r.onrender.com/auth/login`, {
        username,
        password
      })
  
      if (res.data.access_token) {
        setToken(res.data.access_token)
        navigate('/')
        return
      }
  
      alert('Invalid credentials!') 
    } catch (error) {
      console.error("error: ", error)
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-inner-wrapper">
        <h1 className="text-3xl mb-4 font-bold">Login Dashboard</h1>
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
