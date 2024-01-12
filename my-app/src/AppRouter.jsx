// AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/Signup';
import Register from './pages/Register';
import Dashboard from './pages/dashboard';
import CheckAuthToken from './utils/checkauth';  // Importe o componente do Dashboard aqui
import Cookies from 'js-cookie';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute component={<Dashboard />} />} />
        <Route path="/check-auth" element={<CheckAuthToken />} />
      </Routes>
    </Router>
  );
};

// Componente de rota privada para verificar se o usuário está autenticado
function PrivateRoute({ component }) {
  const authToken = Cookies.get('authToken');

  return authToken ? component : <Navigate to="/signup" />;
}

export default AppRouter;
