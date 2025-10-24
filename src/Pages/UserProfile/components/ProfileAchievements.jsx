import React from 'react'
import './ProfileAchievements.css'

function ProfileAchievements({ achievements }) {
  const unlockedCount = achievements.filter(achievement => achievement.unlocked).length
  const totalCount = achievements.length
  const progressPercentage = (unlockedCount / totalCount) * 100

  const formatDate = (dateString) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  }

  return (
    <div className="profile-achievements">
      <div className="achievements-header">
        <h2 className="achievements-title">
          <span className="achievements-icon">🏆</span>
          Succès et récompenses
        </h2>
        <p className="achievements-subtitle">
          {unlockedCount} sur {totalCount} succès débloqués
        </p>
      </div>

      {/* Progress Overview */}
      <div className="achievements-progress">
        <div className="progress-header">
          <span className="progress-label">Progression globale</span>
          <span className="progress-percentage">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="achievements-grid">
        {achievements.map((achievement, index) => (
          <div 
            key={achievement.id}
            className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
            style={{ '--delay': `${index * 0.1}s` }}
          >
            <div className="achievement-icon-container">
              <span className="achievement-icon">{achievement.icon}</span>
              {achievement.unlocked && (
                <div className="unlock-badge">
                  <span className="unlock-icon">✓</span>
                </div>
              )}
            </div>
            
            <div className="achievement-content">
              <h3 className="achievement-name">{achievement.name}</h3>
              {achievement.unlocked ? (
                <div className="achievement-unlocked">
                  <span className="unlock-date">
                    Débloqué le {formatDate(achievement.date)}
                  </span>
                  <div className="unlock-celebration">
                    <span className="celebration-text">🎉 Félicitations !</span>
                  </div>
                </div>
              ) : (
                <div className="achievement-locked">
                  <span className="lock-text">Verrouillé</span>
                  <div className="lock-progress">
                    <div className="lock-progress-bar">
                      <div className="lock-progress-fill" style={{ width: '0%' }}></div>
                    </div>
                    <span className="lock-progress-text">0%</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Achievement Stats */}
      <div className="achievement-stats">
        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <div className="stat-value">{unlockedCount}</div>
            <div className="stat-label">Succès débloqués</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <div className="stat-value">{totalCount - unlockedCount}</div>
            <div className="stat-label">En cours</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <div className="stat-value">{Math.round(progressPercentage)}%</div>
            <div className="stat-label">Complétion</div>
          </div>
        </div>
      </div>

      {/* Next Achievement Hint */}
      {unlockedCount < totalCount && (
        <div className="next-achievement">
          <div className="next-achievement-header">
            <span className="next-icon">🎯</span>
            <h3>Prochain objectif</h3>
          </div>
          <div className="next-achievement-content">
            <p>Continuez à jouer pour débloquer de nouveaux succès !</p>
            <div className="next-achievement-actions">
              <button className="action-button primary">
                <span className="button-icon">🚀</span>
                Jouer maintenant
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileAchievements
