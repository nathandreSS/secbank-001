import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ROUTES } from "./Constants";
import Home from "./pages/home";
import GlobalStyle from "./Styles";
import Register from "./pages/register";
import { setupAxiosInterceptors } from "./api";
import { useAuth } from "./hooks/useAuth";
import RequireUnauth from "./highOrderComponents/requireUnauth";
import RequireAuth from "./highOrderComponents/requireAuth";
import Login from "./pages/login";

function App() {
  const { refresh, logout } = useAuth();
  useEffect(() => {
    setupAxiosInterceptors(refresh, logout);
  }, [logout]);

  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route
            path={ROUTES.login}
            element={
              <RequireUnauth>
                <Login />
              </RequireUnauth>
            }
          />
          <Route
            path={ROUTES.register}
            element={
              <RequireUnauth>
                <Register />
              </RequireUnauth>
            }
          />
          <Route
            path={ROUTES.home}
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
