import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

// Use "/chrisert" for GitHub Pages, "/" for Netlify
const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

// Handle GitHub Pages SPA redirect
const redirect = sessionStorage.getItem("redirect");
if (redirect) {
  sessionStorage.removeItem("redirect");
  // Redirect to the original path the user requested
  window.history.replaceState(null, "", redirect);
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
