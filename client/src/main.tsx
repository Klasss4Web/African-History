import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import "./styles/globals.css";
import App from "./App.tsx";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("Service Worker registered:", registration);
      })
      .catch((err) => console.log("SW registration failed:", err));
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
