#!/bin/bash

# Script pour déployer l'application en production
echo "🚀 Déploiement de PlayWithPro en production..."

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

# Arrêter les conteneurs existants
echo "🛑 Arrêt des conteneurs existants..."
docker-compose -f docker-compose.prod.yml down

# Construire l'image de production
echo "📦 Construction de l'image de production..."
docker-compose -f docker-compose.prod.yml build --no-cache

# Démarrer les services de production
echo "🏃 Démarrage des services de production..."
docker-compose -f docker-compose.prod.yml up -d

# Vérifier le statut des conteneurs
echo "📊 Statut des conteneurs:"
docker-compose -f docker-compose.prod.yml ps

echo "✅ L'application est déployée et disponible sur http://localhost:80"
echo "📝 Logs: docker-compose -f docker-compose.prod.yml logs -f"
