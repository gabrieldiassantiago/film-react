// CheckAuthToken.jsx
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function CheckAuthToken() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authToken = Cookies.get('authToken');
    setIsAuthenticated(!!authToken);  // Define isAuthenticated com base na presença do token
  }, []);

  return isAuthenticated;  // Retorna o estado de autenticação diretamente
}

export default CheckAuthToken;
