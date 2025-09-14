import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"; // Tailwind import
import "./style.css"; // your custom styles (moved from style.css)

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
