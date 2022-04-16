import React from 'react';
import ReactDOM from 'react-dom';
// TODO: Need an option for user to manually input css outside tested components
import './index.css';
import './style.scss';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
