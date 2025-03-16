import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from "./app/store"; // ✅ Correct relative path
import App from "./App"; // ✅ Correct relative path

import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const container = document.getElementById('root');

if (!container) {
  throw new Error("Root container not found! Make sure you have an element with id='root' in your HTML.");
}

const root = createRoot(container); // Now TypeScript is happy

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
