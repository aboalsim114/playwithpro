#!/bin/bash

# Script pour nettoyer les ressources Docker
echo "🧹 Nettoyage des ressources Docker..."

# Arrêter tous les conteneurs
echo "🛑 Arrêt de tous les conteneurs..."
docker-compose down
docker-compose -f docker-compose.prod.yml down

# Supprimer les images non utilisées
echo "🗑️ Suppression des images non utilisées..."
docker image prune -f

# Supprimer les volumes non utilisés
echo "🗑️ Suppression des volumes non utilisés..."
docker volume prune -f

# Supprimer les réseaux non utilisés
echo "🗑️ Suppression des réseaux non utilisés..."
docker network prune -f

# Supprimer les conteneurs arrêtés
echo "🗑️ Suppression des conteneurs arrêtés..."
docker container prune -f

echo "✅ Nettoyage terminé!"
