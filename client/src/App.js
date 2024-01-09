import { GoogleOAuthProvider } from '@react-oauth/google'
import { Dashboard } from './components/Dashboard/Dashboard';
import './App.css';

function App() {
  return (
    <GoogleOAuthProvider clientId='347210081971-vegf5lgrv2sqo9i7hm13st7bcpdmt5sk.apps.googleusercontent.com'>
      <div className="App">
        <Dashboard/>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
