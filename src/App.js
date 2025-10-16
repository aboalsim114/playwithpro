import './App.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from './Composants/Navbar/Navbar';
import Home from './Pages/HomePage/Home';
import Inscription from './Pages/InscriptionPage/Inscription';
import Connexion from './Pages/ConnexionPage/Connexion';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />
      </Routes>
    </div>
  );
}

export default App;
