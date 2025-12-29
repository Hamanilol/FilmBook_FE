import { createRoot } from "react-dom/client"
import { StrictMode } from "react"
import "./App.css"
import App from "./App.jsx"
import { BrowserRouter } from "react-router-dom"
import "./App.css"

createRoot(document.querySelector("#root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
