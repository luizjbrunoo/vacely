import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Quicksight from './Quicksight';
import {Amplify} from 'aws-amplify';
import aws_exports from './aws-exports'

Amplify.configure(aws_exports);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


