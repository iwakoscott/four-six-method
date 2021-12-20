import { Route, Routes } from "react-router-dom"
import { StartView } from "./views/start"
import { ConfigurationContextProvider } from "./hooks"

const App = () => (
  <ConfigurationContextProvider>
    <Routes>
      <Route path="/" element={<StartView />} />
    </Routes>
  </ConfigurationContextProvider>
)

export default App
