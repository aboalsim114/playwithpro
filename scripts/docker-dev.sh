#!/bin/bash

# Script pour démarrer l'environnement de développement Docker
echo "🚀 Démarrage de l'environnement de développement PlayWithPro..."

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé. Veuillez installer Docker d'abord."
    exit 1
fi

# Vérifier si Docker Compose est installé
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose n'est pas installé. Veuillez installer Docker Compose d'abord."
    exit 1
fi

# Construire et démarrer le service de développement
echo "📦 Construction de l'image de développement..."
docker-compose --profile dev build

echo "🏃 Démarrage du service de développement..."
docker-compose --profile dev up

echo "✅ L'application est disponible sur http://localhost:3000"
