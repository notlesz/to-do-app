import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "./context/authContext";
import CreateUser from "./pages/CreateUser";
import Login from "./pages/Login";
import PrivateOutlet from "./pages/PrivateOutlet";
import Home from "./pages/PrivateOutlet/Home";
import GlobalStyle from "./styles/GlobalStyle";
import { theme } from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<CreateUser />} />
            <Route path="/home" element={<PrivateOutlet />}>
              <Route path="" element={<Home />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
