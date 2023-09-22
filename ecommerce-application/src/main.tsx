import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App/App';
import './index.scss';
import { setTheme } from './App/utils/utils';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

setTheme();

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
