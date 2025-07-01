import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // File CSS cơ bản, có thể để trống hoặc thêm global styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
