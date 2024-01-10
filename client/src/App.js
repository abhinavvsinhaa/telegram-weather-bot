import { GoogleOAuthProvider } from '@react-oauth/google'
import { useState, createContext } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Login } from './components/Login/Login';
import { Dashboard } from './components/Dashboard/Dashboard'
import './App.css';

export const AuthContext = createContext()

function App() {
  const [token, setToken] = useState('')

  return (
    <GoogleOAuthProvider clientId='347210081971-vegf5lgrv2sqo9i7hm13st7bcpdmt5sk.apps.googleusercontent.com'>
      <AuthContext.Provider value={{ token, setToken }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Dashboard/>} />
            <Route path='/login' element={<Login/>} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
