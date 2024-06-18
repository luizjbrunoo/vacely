// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Authenticator } from '@aws-amplify/ui-react';
// import '@aws-amplify/ui-react/styles.css';
// import './App.css';
// import Home from './pages/Home';
// import Dashboard from './pages/Dashboard'; // Importa a nova página Dashboard
// import './i18n'; // Importa a configuração de tradução

// const App = () => {
//   const [showAuth, setShowAuth] = useState(false);

//   const handleLoginClick = () => {
//     setShowAuth(true);
//   };

//   const handleAuthClose = () => {
//     setShowAuth(false);
//   };

//   return (
//     <Authenticator.Provider>
//       <div className="app-container">
//         <Router>
//           <Routes>
//             <Route path="/" element={<Home onLoginClick={handleLoginClick} />} />
//             <Route path="/dashboard" element={<Dashboard />} /> {/* Adiciona a nova rota */}
//           </Routes>
//         </Router>
//         {showAuth && (
//           <div className="auth-overlay">
//             <Authenticator>
//               <button onClick={handleAuthClose}>Close</button>
//             </Authenticator>
//           </div>
//         )}
//       </div>
//     </Authenticator.Provider>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import './i18n';
import { fetchAuthSession } from '@aws-amplify/auth';




// Chame essa função em um contexto onde o usuário está autenticado



const AppContent = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [showAuth, setShowAuth] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  const handleLoginClick = () => {
    setShowAuth(true);
  };

  const handleAuthClose = () => {
    setShowAuth(false);
  };

  async function retrieveAccessToken() {
    try {
      const session = await fetchAuthSession();
      const accessTokenString = session.tokens.accessToken.toString();  // Chame toString() para obter o JWT como string
      const accessTokenPayload = session.tokens.accessToken.payload
       console.log("Access Token toString:", accessTokenString);
       console.log("Access Token Payload:", accessTokenPayload);
      setAccessToken(accessTokenString);
      return accessTokenString;
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  }

  useEffect(() => {
retrieveAccessToken();

  }, [user]);

  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<Home onLoginClick={handleLoginClick} />} />
          <Route path="/dashboard" element={<Dashboard accessToken={accessToken} />
} />
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
  );
};

const App = () => (
  <Authenticator.Provider>
    <AppContent />
  </Authenticator.Provider>
);

export default App;




