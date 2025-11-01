import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useCurrentUser } from '../../../store/hooks';
import { logoutUser } from '../../../store/slices/authSlice';
import { NAV_SECTIONS, SVG_ICONS } from '../constants';

const Sidebar = ({ 
  activeNav, 
  onNavClick,
  userType = 'player'
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useCurrentUser();
  const userId = currentUser?.id || currentUser?._id || '1'; // Fallback to '1' if user ID not available
  
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/connexion');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };
  
  // Mapping des routes pour la navigation
  const routeMapping = {
    dashboard: '/dash-user',
    matches: '/dash-user/matches',
    coaching: '/dash-user/coaching',
    calendar: '/dash-user/calendar',
    payments: `/user/${userId}/payment`,
    profile: '/dash-user/profile'
  };

  // Fonction pour déterminer si un lien est actif
  const isActiveRoute = (navId) => {
    const route = routeMapping[navId];
    if (!route) return false;
    
    if (navId === 'dashboard') {
      return location.pathname === route;
    }
    if (navId === 'payments') {
      // Check if path matches /user/:id/payment pattern
      return location.pathname.match(/^\/user\/[^/]+\/payment$/);
    }
    return location.pathname.startsWith(route);
  };
  const renderNavItem = (item) => {
    const route = routeMapping[item.id];
    const isActive = isActiveRoute(item.id);
    
    return (
      <Link 
        key={item.id}
        to={route}
        className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl transition-all duration-300 ${
          isActive
            ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25' 
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
        aria-label={item.label}
        onClick={() => {
          // Fermer le menu mobile lors de la navigation
          if (onNavClick) {
            onNavClick(item.id);
          }
        }}
      >
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {SVG_ICONS[item.icon]}
        </svg>
        <span className="font-medium">{item.label}</span>
      </Link>
    );
  };

  return (
    <aside 
      className="fixed left-0 top-0 h-full w-64 bg-gray-800 border-r border-gray-700 z-40 overflow-y-auto transition-all duration-300"
      style={{
        scrollbarWidth: 'none', /* Firefox */
        msOverflowStyle: 'none', /* IE and Edge */
        WebkitScrollbar: 'none', /* Chrome, Safari, Opera */
      }}
    >
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">PLAY-WITH-PRO</div>
            <div className="text-sm text-gray-300 font-medium">E-Sport Platform</div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {NAV_SECTIONS.MAIN.items.map(renderNavItem)}
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl transition-all duration-300 text-red-400 hover:bg-red-500/10 hover:text-red-300 mt-4"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="font-medium">Déconnexion</span>
          </button>
        </nav>
        
        {/* Quick Match Section */}
        <div className="p-4 border-t border-gray-700">
          <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl p-4 overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50">
            {/* Animated background shimmer */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 animate-shimmer"></div>
            </div>
            
            {/* Sparkle effects */}
            <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-75"></div>
            <div className="absolute top-3 right-6 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-150"></div>
            <div className="absolute bottom-2 left-2 w-1 h-1 bg-blue-300 rounded-full animate-pulse delay-300"></div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                {/* Animated icon container */}
                <div className="relative w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-xl"></div>
                  <svg className="w-5 h-5 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-white text-sm font-bold mb-1 transform group-hover:translate-x-1 transition-transform duration-300">
                    Match avec un Pro
                  </div>
                  <div className="text-white/80 text-xs font-medium">
                    Réservez dès maintenant
                  </div>
                </div>
              </div>
              
              {/* CTA Button */}
              <Link 
                to="/dash-user/matches" 
                className="relative w-full bg-white text-purple-600 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden group/button shadow-lg hover:shadow-xl hover:shadow-white/25 transform hover:scale-105"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover/button:translate-x-[100%] transition-transform duration-1000"></div>
                
                {/* Button content */}
                <svg className="w-5 h-5 relative z-10 transform group-hover/button:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <span className="relative z-10">Réserver</span>
                
                {/* Pulse effect */}
                <div className="absolute inset-0 rounded-xl bg-white/30 animate-ping opacity-0 group-hover/button:opacity-100"></div>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Social Links & Support */}
        <div className="p-4 border-t border-gray-700">
          <div className="text-gray-400 text-xs mb-3">Follow us:</div>
          <div className="flex gap-2 mb-4">
            <button className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors">
              <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </button>
            <button className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors">
              <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </button>
            <button className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors">
              <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
              </svg>
            </button>
          </div>
          <Link 
            to="/support" 
            className="w-full bg-gray-700 hover:bg-gray-600 text-gray-300 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>Support</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;