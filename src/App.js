import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import { fetchAuthSession } from '@aws-amplify/auth';
import './i18n';
import { StoreProvider } from './Store';  // Import StoreProvider


const AppContent = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [showAuth, setShowAuth] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginClick = () => {
    setShowAuth(true);
  };

  const handleAuthClose = () => {
    setShowAuth(false);
  };

  async function retrieveAccessToken() {
    try {
      const session = await fetchAuthSession();
      const accessTokenString = session.tokens.accessToken.toString();
      setAccessToken(accessTokenString);
      setShowAuth(false);
      if (accessTokenString) {
        setIsLogged(true);
      }
      return accessTokenString;
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  }

  useEffect(() => {
    if (user) {
      retrieveAccessToken();
    }
  }, [user]);

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home onLoginClick={handleLoginClick} />} />
        <Route path="/dashboard" element={<Dashboard accessToken={accessToken}  />} />
        <Route path="/upload" element={<Upload accessToken={accessToken}  />} />
      </Routes>
      {showAuth && (
        <div className="auth-overlay">
          <Authenticator>
            <button onClick={handleAuthClose}>Close</button>
          </Authenticator>
        </div>
      )}
    </div>
  );
};

const App = () => (
  <Router>
    <Authenticator.Provider>
    <StoreProvider>
        <AppContent />
      </StoreProvider>
    </Authenticator.Provider>
  </Router>
);

export default App;
