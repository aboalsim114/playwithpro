import React from 'react';

const Contact = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Contactez-nous</h1>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <p>
          Vous avez des questions ? Notre équipe est là pour vous aider !
        </p>
        <div style={{ marginTop: '2rem' }}>
          <h3>Informations de contact</h3>
          <p><strong>Email:</strong> contact@playwithpro.com</p>
          <p><strong>Téléphone:</strong> +33 1 23 45 67 89</p>
          <p><strong>Adresse:</strong> 123 Rue du Gaming, 75001 Paris</p>
        </div>
        <div style={{ marginTop: '2rem' }}>
          <h3>Heures d'ouverture</h3>
          <p>Lundi - Vendredi: 9h00 - 18h00</p>
          <p>Samedi: 10h00 - 16h00</p>
          <p>Dimanche: Fermé</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
