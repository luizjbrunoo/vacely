import React from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import logo from '../img/logo_vascely_XXX.png';
import './Home.css'; // Reutilize o CSS da Home para manter a consistência
import Quicksight from '../Quicksight'; // Importa o componente Quicksight

const Dashboard = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return (
    <div className="App2">
      <div className="main">
        <div className="center">
          <div className="menu">
            <div className="logo">
              <img src={logo} alt="logo" title="logo" />
            </div>
            <div className="item-menu">
              {user ? (
                <>
                  <span>Olá, {user.username}!</span>
                  <button onClick={signOut}>Logout</button>
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
        <Quicksight />
      </div>

      <div className="footer">
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
      </div>
    </div>
  );
};

export default Dashboard;
