import React from 'react';

const Games = () => {
  const games = [
    { name: 'League of Legends', description: 'MOBA stratégique', players: '150+ pros' },
    { name: 'Counter-Strike 2', description: 'FPS tactique', players: '120+ pros' },
    { name: 'Valorant', description: 'FPS tactique', players: '100+ pros' },
    { name: 'Dota 2', description: 'MOBA complexe', players: '80+ pros' },
    { name: 'Rocket League', description: 'Football avec voitures', players: '60+ pros' },
    { name: 'Fortnite', description: 'Battle Royale', players: '90+ pros' }
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Jeux Disponibles</h1>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '1.5rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {games.map((game, index) => (
          <div 
            key={index}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '1.5rem',
              backgroundColor: '#f9f9f9',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>{game.name}</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>{game.description}</p>
            <p style={{ color: '#007bff', fontWeight: 'bold' }}>{game.players}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
