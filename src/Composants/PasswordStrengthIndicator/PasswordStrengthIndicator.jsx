import React from 'react';
import { calculatePasswordStrength } from '../../utils/validationUtils';
import './PasswordStrengthIndicator.css';

const PasswordStrengthIndicator = ({ password, showFeedback = true }) => {
  const { score, level, feedback } = calculatePasswordStrength(password);

  const getStrengthColor = (level) => {
    switch (level) {
      case 'weak': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'strong': return '#10B981';
      case 'very-strong': return '#059669';
      default: return '#6B7280';
    }
  };

  const getStrengthText = (level) => {
    switch (level) {
      case 'weak': return 'Faible';
      case 'medium': return 'Moyen';
      case 'strong': return 'Fort';
      case 'very-strong': return 'Très fort';
      default: return '';
    }
  };

  const getStrengthIcon = (level) => {
    switch (level) {
      case 'weak':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
        );
      case 'medium':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <circle cx="12" cy="16" r="1"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        );
      case 'strong':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12l2 2 4-4"/>
            <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
            <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
            <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"/>
            <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"/>
          </svg>
        );
      case 'very-strong':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
            <path d="M9 12l2 2 4-4"/>
          </svg>
        );
      default:
        return null;
    }
  };

  if (!password) return null;

  return (
    <div className="password-strength-indicator">
      <div className="strength-header">
        <div className="strength-icon" style={{ color: getStrengthColor(level) }}>
          {getStrengthIcon(level)}
        </div>
        <span className="strength-text" style={{ color: getStrengthColor(level) }}>
          {getStrengthText(level)}
        </span>
      </div>
      
      <div className="strength-bar">
        <div 
          className="strength-fill" 
          style={{ 
            width: `${(score / 6) * 100}%`,
            backgroundColor: getStrengthColor(level),
            boxShadow: `0 0 10px ${getStrengthColor(level)}40`
          }}
        />
      </div>
      
      {showFeedback && feedback.length > 0 && (
        <div className="strength-feedback">
          <div className="feedback-title">Critères manquants :</div>
          <ul className="feedback-list">
            {feedback.map((item, index) => (
              <li key={index} className="feedback-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;
