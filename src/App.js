import './App.css';


import {Authenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// 1 config react router
import {BrowserRouter, Routes, Route} from 'react-router-dom'

// 2 pages
import Home from "./pages/Home"


function App() {
  return (
    
  
    <Authenticator hideSignUp>
      {({ signOut, user}) => (
        
        <div className='App'>

          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />}/>
            </Routes>
          </BrowserRouter>

          
          
          
          
          <p>
          {'E1 ${user, username}, Bem vindo a vascely'}
          </p>
          <button onClick={signOut}>Sair</button>
        </div>

      )}
    </Authenticator>
    
    
);
}

export default App;
