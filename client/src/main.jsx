import { createRoot } from "react-dom/client"
import { StrictMode } from "react"
import "./App.css"
import App from "./App.jsx"
import { BrowserRouter } from "react-router-dom"

createRoot(document.querySelector("#root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
