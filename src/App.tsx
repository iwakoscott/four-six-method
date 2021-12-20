import { Route, Routes } from "react-router-dom"
import { StartView } from "./views/start"

const App = () => (
  <Routes>
    <Route path="/" element={<StartView />} />
  </Routes>
)

export default App
