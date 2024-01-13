import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import searchIcon from '../images/search.svg';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const authToken = Cookies.get('authToken');

      if (!authToken) {
        console.error('Token de autenticação não encontrado nos cookies.');
        navigate('/signup');
        return;
      }

      const response = await fetch('http://localhost:3001/api/user-data', {
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

  const fetchMoviesData = async (searchTerm) => {
    try {
      const authToken = Cookies.get('authToken');

      if (!authToken) {
        console.error('Token de autenticação não encontrado nos cookies.');
        navigate('/signup');
        return;
      }

      const apiUrl = 'https://api.themoviedb.org/3/search/movie';
      const apiKey = '9772ebae19e854dd86f2d89c7089351c';

      const response = await fetch(`${apiUrl}?query=${encodeURIComponent(searchTerm)}&api_key=${apiKey}`, {
        method: 'GET',
        headers: {
          Authorization: `${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMovies(data.results);
      } else {
        console.error('Erro ao obter dados dos filmes:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao obter dados dos filmes:', error.message);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    await fetchMoviesData(searchTerm);
  };

  useEffect(() => {
    const authToken = Cookies.get('authToken');

    if (!authToken || isTokenExpired(authToken)) {
      navigate('/signup');
      return;
    }

    fetchUserData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const isTokenExpired = (token) => {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the payload
      const currentTimestamp = Math.floor(Date.now() / 1000);
      return decodedToken.exp <= currentTimestamp;
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return true; 
    }
  };
  return (
    <div className='relative h-screen flex flex-col fundo'>
      <Header isAuthenticated={userData !== null} />

      {userData ? (
        <div>
          <h1 className='text-white text-center font-bold text-3xl p-12 pb-0'>Olá, {userData.username}, vamos buscar?</h1>

          <div className='flex justify-center items-center m-10'>
            <div className="relative">
              <form onSubmit={handleSearch}>
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='bg-white p-2 pl-8 pr-2 m-2 rounded-xl border border-gray-300 focus:outline-none focus:border-indigo-500'
                  type='text'
                  id='buscar'
                  placeholder='Busque algo aqui...'
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <img src={searchIcon} alt='Ícone de busca' className='w-5 h-10 m-1' />
                </div>
                <button type="submit" className='bg-indigo-500 text-white p-2 m-2 rounded-xl focus:outline-none hover:bg-indigo-700'>
                  Pesquisar
                </button>

              </form>
            </div>
          </div>

          <div className='flex flex-wrap justify-center'>
          {movies.map((movie) => (
          <div key={movie.id} className='m-4 bg-white rounded-xl w-64 p-4 shadow-md'>
            {movie.poster_path ? (
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            ) : (
              <div className="no-image-placeholder">
                <p>Imagem não</p>
              </div>
            )}
            <h2 className='text-xl font-semibold'>{movie.title}</h2>
          </div>
        ))}

          </div>
        </div>
      ) : (
        <p>Carregando dados do usuário...</p>
      )}
    </div>
  );
}

export default Dashboard;
