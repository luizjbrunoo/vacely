import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './App.css';
import Home from './pages/Home';
import './i18n'; // Import the translation setup

const App = () => {
  const [showAuth, setShowAuth] = useState(false);

  const handleLoginClick = () => {
    setShowAuth(true);
  };

  const handleAuthClose = () => {
    setShowAuth(false);
  };

  return (
    <Authenticator.Provider>
      <div className="app-container">
        <Router>
          <Routes>
            <Route path="/" element={<Home onLoginClick={handleLoginClick} />} />
          </Routes>
        </Router>
        {showAuth && (
          <div className="auth-overlay">
            <Authenticator>
              <button onClick={handleAuthClose}>Close</button>
            </Authenticator>
          </div>
        )}
      </div>
    </Authenticator.Provider>
  );
};

export default App;
