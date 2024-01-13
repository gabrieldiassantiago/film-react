import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import fundo from '../images/fundo.png';
import Header from '../components/header';
import CheckAuthToken from '../utils/checkauth';

function Signup() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = Cookies.get('authToken');

    if (authToken) {
      navigate('/dashboard');
    } else {
      console.log('Nenhum token encontrado nos cookies.');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();

      Cookies.set('authToken', data.token, { expires: 1 });

      navigate('/dashboard');
    } else {
      const errorData = await response.json();
      console.error('Erro ao fazer login:', errorData.error);
    }
  };

  return (
    <div className="relative h-screen flex flex-col fundo">
      <Header />

      <div className="flex flex-col items-center justify-start flex-grow text-white z-10 ">
      <CheckAuthToken />
        <div className="bg-gray-800 p-8 rounded-md shadow-md w-96 mt-48">
          <h2 className="text-3xl font-bold mb-4 text-white">Login</h2>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-gray-400 text-sm font-semibold mb-2" htmlFor="email">
                Seu email:
              </label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-800"
                type="email"
                id="email"
                name="email"
                placeholder="Insira seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-semibold mb-2" htmlFor="password">
                Sua senha:
              </label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-800"
                type="password"
                id="password"
                name="password"
                placeholder="Insira sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
           <div className='flex'>
           <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Fazer login
            </button>
           </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
