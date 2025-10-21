import React, { useState, useEffect } from 'react';
import { generateUsernameSuggestions } from '../../utils/validationUtils';
import './UsernameSuggestions.css';

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
    <div className="username-suggestions">
      <div className="suggestions-header">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4"/>
          <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
          <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
          <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"/>
          <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"/>
        </svg>
        <span>Suggestions disponibles</span>
      </div>
      
      {isLoading ? (
        <div className="suggestions-loading">
          <div className="loading-spinner"></div>
          <span>Recherche de suggestions...</span>
        </div>
      ) : (
        <div className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span className="suggestion-text">{suggestion}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          ))}
        </div>
      )}
      
      <div className="suggestions-footer">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
        <span>Cliquez pour sélectionner</span>
      </div>
    </div>
  );
};

export default UsernameSuggestions;
