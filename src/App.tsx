import { CssBaseline, ThemeProvider, Box } from "@mui/material"
import { createTheme } from "@mui/material/styles"
import { useMemo } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { themeSettings } from "./theme"
import Navbar from "@/scenes/navbar"


function App() {
  const theme = useMemo(() => createTheme(themeSettings), [])
  return <div className="app">
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
          <Navbar />
          <Routes>
            <Route path="/" element={<div>Dashboard Page</div>} />
            <Route path="/predictions" element={<div>Predictions Page</div>} />
          </Routes>
        </Box>
      </ThemeProvider>
    </Router>
  </div>
}

export default App
