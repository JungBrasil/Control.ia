import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Ouvidoria from "@/pages/Ouvidoria";
import Auditorias from "@/pages/Auditorias";
import Disciplinar from "@/pages/Disciplinar";
import TransparenciaPublica from "@/pages/TransparenciaPublica";
import Layout from "@/components/Layout";
import Register from "@/pages/Register";
import ResetPassword from "@/pages/ResetPassword";
import Gabinete from "@/pages/Gabinete";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route element={<Layout /> }>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/auditorias"
              element={
                <ProtectedRoute>
                  <Auditorias />
                </ProtectedRoute>
              }
            />
            <Route path="/gabinete" element={<Gabinete />} />
            <Route path="/ouvidoria" element={<Ouvidoria />} />
            <Route path="/transparencia" element={<TransparenciaPublica />} />
            <Route
              path="/corregedoria"
              element={
                <ProtectedRoute>
                  <Disciplinar />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
