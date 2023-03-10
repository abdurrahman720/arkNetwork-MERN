import { BrowserRouter,  Routes, Route } from "react-router-dom";
import HomePage from "./scenes/HomePage/HomePage";
import LoginPage from "./scenes/LoginPage/LoginPage";
import ProfilePage from "./scenes/ProfilePage/ProfilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";


function App() {
  const mode  = useSelector((state)=>state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
    <Routes>
          <Route path="/" element={<LoginPage/>}></Route>
          <Route path="/home" element={<HomePage/>}></Route>
          <Route path="/profile/:userId" element={<ProfilePage/>}></Route>
        </Routes>
  </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
