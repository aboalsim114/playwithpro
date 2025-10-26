import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import PromotionalBanner from './components/PromotionalBanner';
import GameSelection from './components/GameSelection';
import RightSidebar from './components/RightSidebar';

function DashboardUser() {
  const [activeNav, setActiveNav] = useState('home');

  const handleNavClick = (navId) => {
    setActiveNav(navId);
  };

  return (
    <div className="h-screen bg-gray-900 flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        activeNav={activeNav}
        onNavClick={handleNavClick}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Top Bar */}
        <div className="flex-shrink-0">
          <TopBar />
        </div>
        
        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Central Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {/* Promotional Banner */}
              <PromotionalBanner />
              
              {/* Game Selection */}
              <GameSelection />
            </div>
          </div>
          
          {/* Right Sidebar */}
          <div className="w-80 flex-shrink-0 overflow-y-auto">
            <div className="p-6">
              <RightSidebar />
            </div>
          </div>
        </div>
      </div>
      
      {/* Global Styles */}
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        
        html, body {
          height: 100%;
          margin: 0;
          padding: 0;
          background-color: #0b0f1a;
          overflow: hidden;
        }
        
        #root {
          height: 100%;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1f2937;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #8A2BE2;
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #9932CC;
        }
        
        /* Glow effects */
        .glow-purple {
          box-shadow: 0 0 20px rgba(138, 43, 226, 0.3);
        }
        
        .glow-blue {
          box-shadow: 0 0 20px rgba(0, 191, 255, 0.3);
        }
        
        /* Animations */
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(138, 43, 226, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(138, 43, 226, 0.8);
          }
        }
        
        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .ml-64 {
            margin-left: 0;
          }
          
          .w-80 {
            width: 18rem;
          }
          
          .flex {
            flex-direction: column;
          }
          
          .flex-1 {
            height: calc(100vh - 4rem);
          }
        }
        
        @media (max-width: 768px) {
          .grid-cols-5 {
            grid-template-columns: repeat(3, 1fr);
          }
          
          .w-80 {
            width: 100%;
          }
          
          .flex-col {
            flex-direction: column;
          }
          
          .h-screen {
            height: 100vh;
          }
          
          .p-6 {
            padding: 1rem;
          }
        }
        
        @media (max-width: 640px) {
          .grid-cols-5 {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .text-2xl {
            font-size: 1.5rem;
          }
          
          .text-xl {
            font-size: 1.25rem;
          }
        }
        
        @media (max-width: 480px) {
          .grid-cols-5 {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .gap-3 {
            gap: 0.5rem;
          }
          
          .p-3 {
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}

export default DashboardUser;