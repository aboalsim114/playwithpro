import './App.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from './Composants/Navbar/Navbar';
import Home from './Pages/HomePage/Home';
import About from './Pages/AboutPage/About';
import Contact from './Pages/ContactPage/Contact';
import Games from './Pages/GamesPage/Games';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/games" element={<Games />} />
      </Routes>
    </div>
  );
}

export default App;
