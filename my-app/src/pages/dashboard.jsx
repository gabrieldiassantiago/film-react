import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function Dashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Obtenha o token de autenticação dos cookies
        const authToken = Cookies.get('authToken');
        console.log(authToken); // Verifique se o token está presente nos logs

  
        if (!authToken) {
          console.error('Token de autenticação não encontrado nos cookies.');
          return;
        }
  
        const response = await fetch('http://localhost:3001/api/auth/user-data', {
          method: 'GET',
          headers: {
            Authorization: `${authToken}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Erro ao obter dados do usuário:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao obter dados do usuário:', error.message);
      }
    };
  
    fetchUserData();
  }, []); // Execute apenas uma vez ao montar o componente

  return (
    <div>
      <h1>Dashboard</h1>
      {userData ? (
        <div>
          <p>Bem-vindo ao seu painel, {userData.username}!</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Carregando dados do usuário...</p>
      )}
    </div>
  );
}

export default Dashboard;
