import React from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../Store';  // Import useStore

import logo from '../img/logo_vascely_XXX.png';
import './Home.css'; // Reutilize o CSS da Home para manter a consistência
import Quicksight from '../Quicksight'; // Importa o componente Quicksight

const Dashboard = ({accessToken}) => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();
  const { redirected, setRedirected, resetStore } = useStore();  // Get resetStore from useStore

  const handleSignout = () => {
    signOut();
        navigate('/');
  }
  
  return (
    <div className="App2">
      <div className="main">
        <div className="center">
          <div className="menu">
            <div className="logo">
              <img src={logo} alt="logo" title="logo" />
            </div>
            <div className="item-menu">
              <a href="/">HOME</a>
            </div>
            {user && (<>
              <div className="item-menu">
              <a href="/upload">UPLOAD</a>
            </div>
            <div className="item-menu">
              <a href="/dashboard">DASHBOARD</a>
            </div>
            </>)}

            <div className="item-menu">
              {user ? (
                <>
                  <span style={{color:'white'}}>Olá, {user.username}!</span><span> </span>
                  <button onClick={handleSignout}>Logout</button>
                </>
              ) : (
                <button>Login</button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard">
        <h1>Dashboard</h1>
        {user ? (
        <Quicksight accessToken={accessToken}/>

        ) : (<div>
          <p>Para acessar o dashboard, faça login na home page.</p>
        </div>)}
      </div>

      {/* <div className="footer">
        <div className="footer-content">
          <div className="footer-item">
            <img src={logo} alt="logo" title="logo" />
          </div>
          <div className="footer-item">
            <p>
              <a href="mailto:teste@teste.com">email</a>
            </p>
            <p>
              <a href="tel:+5511999999999">
                +55 11 99999-9999
              </a>
            </p>
          </div>
          <div className="footer-item-social">
            <a href="https://www.linkedin.com/company/vascely/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <p>|</p>
            <a href="https://www.instagram.com/teste" target="_blank" rel="noreferrer">
              Youtube
            </a>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
