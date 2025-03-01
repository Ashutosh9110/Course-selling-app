import { StrictMode, React } from 'react'
import ReactDOM from "react-dom/client";
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import './index.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter> {/* Wrap the App inside BrowserRouter */}
      <App />
    </BrowserRouter>
);
