import logo from '../images/logofig.svg';
import fundo from '../images/fundo.png';
import searchIcon from '../images/search.svg';
import Header from '../components/header';


const Home = () => {
  
    return (
        <div className="relative h-screen flex flex-col fundo">
           
            <Header />

            <div className="flex flex-col items-center justify-center flex-grow text-center text-white z-10">
                <img src={logo} width={400} alt="Logo" className="mx-auto mb-4" />

                <h1 className="text-4xl font-bold mb-2">Unlimited movies, TV shows, and more.</h1>
                <span className="block mb-4">Watch anywhere. Cancel anytime.</span>

                <div className="relative">
                    <img src={searchIcon} alt="Search Icon" className="absolute left-4 top-1/2 transform -translate-y-1/2" />
                    <input 
                        type="text"
                        placeholder="Buscar algo aqui..."
                        className="pl-16 bg-white border-0 text-black px-6 py-4 rounded-2xl"
                    />
                </div>

               
            </div>
        </div>
    );
}

export default Home;
