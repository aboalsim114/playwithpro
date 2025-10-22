import './App.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from './Composants/Navbar/Navbar';
import Home from './Pages/HomePage/Home';
import Inscription from './Pages/InscriptionPage/Inscription';
import Connexion from './Pages/ConnexionPage/Connexion';
import DashboardUser from './Pages/DashboardUser/DashboardUser';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { useAuthInitialization } from './hooks/useAuthInitialization';

function App() {
  // Initialiser l'authentification au démarrage de l'app
  useAuthInitialization();

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/dash-user" element={<DashboardUser />} />
      </Routes>
    </div>
  );
}

export default App;
