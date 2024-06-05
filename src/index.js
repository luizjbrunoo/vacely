import React from 'react';
import ReactDOM from 'react-dom';
import {Amplify} from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';
import App from './App';
import './i18n'; // Import the translation setup

Amplify.configure(awsExports);

ReactDOM.render(
  <React.StrictMode>
    <Authenticator>
      <App />
    </Authenticator>
  </React.StrictMode>,
  document.getElementById('root')
);
