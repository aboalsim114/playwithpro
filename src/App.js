import './App.css';
import Hero from './Composants/Hero/Hero';
import Navbar from './Composants/Navbar/Navbar';
import GamesSection from './Composants/GamesSection/GamesSection';
import Home from './Pages/HomePage/Home';

function App() {
  return (
    <div>
      <Navbar />
      <Home/>
      <Hero/>
      <GamesSection/>
    </div>
  );
}

export default App;
