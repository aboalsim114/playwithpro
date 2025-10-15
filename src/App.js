import './App.css';
import Hero from './Composants/Hero/Hero';
import Navbar from './Composants/Navbar/Navbar';
import Home from './Pages/HomePage/Home';

function App() {
  return (
    <div>
      <Navbar />
      <Home/>
      <Hero/>
    </div>
  );
}

export default App;
