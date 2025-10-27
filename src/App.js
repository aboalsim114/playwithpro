import './index.css';
import { Routes, Route } from 'react-router-dom';

import PublicLayout from './Components/PublicLayout';
import PrivateLayout from './Components/PrivateLayout';
import Home from './Pages/HomePage/Home';
import Inscription from './Pages/InscriptionPage/Inscription';
import Connexion from './Pages/ConnexionPage/Connexion';
import DashboardUser from './Pages/DashboardUser/DashboardUser';
import UserProfile from './Pages/UserProfile/UserProfile';
import CalendarComponent from './Pages/Calendar/Calendar';
import PrivateRoute from './utils/PrivateRoute';
import NotFound from './Pages/NotFound/NotFound';

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
        <Route path="*" element={
          <PublicLayout>
            <NotFound />
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
        
        {/* Pages protégées avec Sidebar */}
        <Route element={<PrivateRoute />}>
          <Route path="/dash-user" element={
            <PrivateLayout>
              <DashboardUser />
            </PrivateLayout>
          } />
          <Route path="/dash-user/matches" element={
            <PrivateLayout>
              <div className="p-6">
                <h1 className="text-2xl font-bold text-white mb-4">Mes Matchs</h1>
                <p className="text-gray-300">Page des matchs en cours de développement...</p>
              </div>
            </PrivateLayout>
          } />
          <Route path="/dash-user/coaching" element={
            <PrivateLayout>
              <div className="p-6">
                <h1 className="text-2xl font-bold text-white mb-4">Coaching</h1>
                <p className="text-gray-300">Page de coaching en cours de développement...</p>
              </div>
            </PrivateLayout>
          } />
          <Route path="/dash-user/calendar" element={
            <PrivateLayout>
              <CalendarComponent />
            </PrivateLayout>
          } />
          <Route path="/dash-user/payments" element={
            <PrivateLayout>
              <div className="p-6">
                <h1 className="text-2xl font-bold text-white mb-4">Paiements</h1>
                <p className="text-gray-300">Page des paiements en cours de développement...</p>
              </div>
            </PrivateLayout>
          } />
          <Route path="/dash-user/profile" element={
            <PrivateLayout>
              <UserProfile />
            </PrivateLayout>
          } />
          <Route path="/user/:id" element={
            <PrivateLayout>
              <UserProfile />
            </PrivateLayout>
          } />
          <Route path="user/:id/calendar" element={
            <PrivateLayout>
              <CalendarComponent />
            </PrivateLayout>
          } />
          <Route path="/support" element={
            <PrivateLayout>
              <div className="p-6">
                <h1 className="text-2xl font-bold text-white mb-4">Support</h1>
                <p className="text-gray-300">Page de support en cours de développement...</p>
              </div>
            </PrivateLayout>
          } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
