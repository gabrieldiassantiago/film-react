import logo from '../../images/logofig.svg';
import world from '../../images/world.svg';
import persona from '../../images/persona.svg';


function Header({ isAuthenticated }) {
    const handleCriarContaClick = () => {
        // Redirecionar para a rota de registro
        window.location.href = '/register';
      };
    return (
        <div>
            <header>
                <nav className="bg-transparent pt-8 lg:px-6 py-2.5">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <a href="https://flowbite.com" className="flex items-center">
                            <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                        </a>

                        <button
                            data-collapse-toggle="mobile-menu-2"
                            type="button"
                            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="mobile-menu-2"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Abrir menu</span>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                            </svg>
                            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </button>

                        <div className="hidden lg:flex lg:items-center lg:w-auto lg:space-x-10" id="mobile-menu-2">
                        <button className="border-2 cursor-pointer text-white p-2 rounded-2xl flex gap-3"><img src={world} alt="" /> English</button>
                        { !isAuthenticated && (
                    <button onClick={handleCriarContaClick}
                     className="bg-white cursor-pointer text-black font-bold p-2 rounded-2xl flex gap-3">
                        <img src={persona}  alt="" /> Criar conta
                    </button>
                     )}
                    </div>
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default Header;
