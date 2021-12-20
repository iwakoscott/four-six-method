import { render } from "react-dom"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import "../index.css"

const rootElement = document.getElementById("root")
render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
)
