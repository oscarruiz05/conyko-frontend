import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "@/pages/auth/Auth";
import Home from "@/pages/home/Home";
import Tareas from "./pages/home/Tareas";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token_conyko");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Ruta de Login */}
          <Route
            path="/login"
            element={!isAuthenticated ? <Auth /> : <Navigate to="/" />}
          />
          {/* Ruta de Home */}
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          >
            <Route index element={<Tareas />} />
          </Route>
          {/* Redirección predeterminada */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
