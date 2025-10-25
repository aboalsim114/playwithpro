import React, { useState, useEffect } from 'react';
import { generateUsernameSuggestions } from '../../utils/validationUtils';

const UsernameSuggestions = ({ 
  username, 
  onSuggestionSelect, 
  isVisible = false,
  existingUsernames = [] 
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (username && username.length >= 2 && isVisible) {
      setIsLoading(true);
      
      // Simuler un délai pour l'API (en réalité, ceci serait un appel API)
      const timer = setTimeout(() => {
        const newSuggestions = generateUsernameSuggestions(username, existingUsernames);
        setSuggestions(newSuggestions);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setIsLoading(false);
    }
  }, [username, isVisible, existingUsernames]);

  if (!isVisible || (!isLoading && suggestions.length === 0)) {
    return null;
  }

  const handleSuggestionClick = (suggestion) => {
    onSuggestionSelect(suggestion);
  };

  return (
    <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
      <div className="flex items-center gap-2 p-3 bg-blue-50 border-b border-gray-200">
        <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4"/>
          <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
          <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
          <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"/>
          <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"/>
        </svg>
        <span className="text-sm font-medium text-blue-800">Suggestions disponibles</span>
      </div>
      
      {isLoading ? (
        <div className="flex items-center gap-3 p-4">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
          <span className="text-sm text-gray-600">Recherche de suggestions...</span>
        </div>
      ) : (
        <div className="p-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span className="text-sm text-gray-700 flex-1">{suggestion}</span>
              <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          ))}
        </div>
      )}
      
      <div className="flex items-center gap-2 p-3 bg-gray-50 border-t border-gray-200">
        <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
        <span className="text-xs text-gray-600">Cliquez pour sélectionner</span>
      </div>
    </div>
  );
};

export default UsernameSuggestions;
