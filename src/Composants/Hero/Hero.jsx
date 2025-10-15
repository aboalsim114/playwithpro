import React from 'react'
import './Hero.css'

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Status Indicators */}
        <div className="status-indicators">
          <div className="status-badge">
            <div className="status-dot green"></div>
            <span>Server Online</span>
          </div>
          <div className="status-badge">
            <div className="status-icon flame">🔥</div>
            <span>Trending #1</span>
          </div>
          <div className="status-badge">
            <div className="status-icon clock">⏰</div>
            <span>Event Ends in 2h 45m</span>
          </div>
        </div>

        {/* Hero Title Section */}
        <div className="hero-title-section">
          <h1 className="hero-title">
            <span className="title-text">Enter the</span>
            <span className="title-gradient">Battlefield</span>
          </h1>
          <p className="hero-description">
            Experience next-level competitive gaming. Join millions of players, climb the leaderboards, and claim your victory.
          </p>
          <div className="hero-buttons">
            <button className="play-btn">
              <svg className="play-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5,3 19,12 5,21"/>
              </svg>
              <span>Play Now - Free</span>
            </button>
            <button className="explore-btn">
              <span>Explore Modes</span>
              <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="feature-cards">
          <div className="feature-card">
            <div className="feature-icon orange">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                <path d="M4 22h16"/>
                <path d="M10 14.66V17c0 .55.47.98.97 1.21l1.03.4c.5.23 1.03.23 1.53 0l1.03-.4c.5-.23.97-.66.97-1.21v-2.34"/>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
              </svg>
            </div>
            <h3>5v5 Battles</h3>
            <p>Team-based combat</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon yellow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3>Ranked Mode</h3>
            <p>Climb to the top</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h3>50+ Heroes</h3>
            <p>Unique abilities</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon purple">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                <path d="M4 22h16"/>
                <path d="M10 14.66V17c0 .55.47.98.97 1.21l1.03.4c.5.23 1.03.23 1.53 0l1.03-.4c.5-.23.97-.66.97-1.21v-2.34"/>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
              </svg>
            </div>
            <h3>Esports Ready</h3>
            <p>Pro tournaments</p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-label">Active Players</div>
            <div className="stat-value">2.8M</div>
            <div className="stat-change positive">+12%</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Daily Matches</div>
            <div className="stat-value">450K</div>
            <div className="stat-change positive">+8%</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Avg. Queue Time</div>
            <div className="stat-value">45s</div>
            <div className="stat-change negative">-15%</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
