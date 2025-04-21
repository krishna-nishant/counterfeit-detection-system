import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import GeneratePage from "./pages/GeneratePage"
import StatsPage from "./pages/StatsPage"
import TestPage from "./pages/TestPage"

// Import Google Material Symbols
import "./styles.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generate" element={<GeneratePage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </Router>
  )
}

export default App
