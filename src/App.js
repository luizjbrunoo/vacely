import React from 'react';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './App.css';


const AppContent = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return (
    <main>
      <h1>Hello {user ? user.username : 'Guest'}</h1>
      {user ? <button onClick={signOut}>Sign Out</button> : <p>Please sign in</p>}
    </main>
  );
};

const App = () => (
  <Authenticator>
    <div className="App">
    <AppContent />
    </div>
  </Authenticator>
);

export default App;
