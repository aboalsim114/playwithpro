import './App.css';
import { Routes, Route } from 'react-router-dom';

import PublicLayout from './Components/PublicLayout';
import Home from './Pages/HomePage/Home';
import Inscription from './Pages/InscriptionPage/Inscription';
import Connexion from './Pages/ConnexionPage/Connexion';
import DashboardUser from './Pages/DashboardUser/DashboardUser';
import UserProfile from './Pages/UserProfile/UserProfile';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <div>
      <Routes>
        {/* Pages publiques avec Navbar */}
        <Route path="/" element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        } />
        <Route path="/inscription" element={
          <PublicLayout>
            <Inscription />
          </PublicLayout>
        } />
        <Route path="/connexion" element={
          <PublicLayout>
            <Connexion />
          </PublicLayout>
        } />
        
        {/* Pages protégées avec Sidebar (DashboardUser) */}
        <Route element={<PrivateRoute />}>
          <Route path="/dash-user" element={<DashboardUser />} />
          <Route path="/user/:id" element={<UserProfile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
