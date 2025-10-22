# Guide Docker - PlayWithPro

Ce guide explique comment utiliser Docker pour développer et déployer l'application PlayWithPro.

## 📋 Prérequis

- Docker (version 20.10+)
- Docker Compose (version 2.0+)

## 🚀 Démarrage rapide

### Développement

```bash
# Démarrer l'environnement de développement
./scripts/docker-dev.sh

# Ou manuellement
docker-compose --profile dev up --build
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000)

### Production

```bash
# Déployer en production
./scripts/docker-prod.sh

# Ou manuellement
docker-compose -f docker-compose.prod.yml up --build -d
```

L'application sera disponible sur [http://localhost:80](http://localhost:80)

## 🏗️ Architecture Docker

### Multi-stage Build

Le Dockerfile utilise un build multi-stage pour optimiser la taille de l'image :

1. **Stage Builder** : Construit l'application React
2. **Stage Production** : Serve l'application avec Nginx
3. **Stage Development** : Environnement de développement avec hot-reload

### Services

- **app-dev** : Service de développement avec hot-reload
- **app-prod** : Service de production avec Nginx
- **nginx** : Service Nginx séparé (optionnel)

## 📁 Structure des fichiers

```
playwithpro/
├── Dockerfile                 # Configuration Docker multi-stage
├── docker-compose.yml         # Configuration pour dev/prod
├── docker-compose.prod.yml    # Configuration production optimisée
├── nginx.conf                 # Configuration Nginx
├── .dockerignore              # Fichiers à ignorer lors du build
└── scripts/
    ├── docker-dev.sh          # Script de développement
    ├── docker-prod.sh         # Script de production
    └── docker-clean.sh        # Script de nettoyage
```

## 🛠️ Commandes utiles

### Développement

```bash
# Démarrer en mode développement
docker-compose --profile dev up

# Démarrer en arrière-plan
docker-compose --profile dev up -d

# Voir les logs
docker-compose --profile dev logs -f

# Arrêter les services
docker-compose --profile dev down
```

### Production

```bash
# Déployer en production
docker-compose -f docker-compose.prod.yml up -d

# Voir les logs
docker-compose -f docker-compose.prod.yml logs -f

# Redémarrer les services
docker-compose -f docker-compose.prod.yml restart

# Arrêter les services
docker-compose -f docker-compose.prod.yml down
```

### Maintenance

```bash
# Nettoyer les ressources Docker
./scripts/docker-clean.sh

# Reconstruire les images
docker-compose build --no-cache

# Voir l'utilisation des ressources
docker stats
```

## 🔧 Configuration

### Variables d'environnement

Vous pouvez créer un fichier `.env` pour personnaliser la configuration :

```env
# Ports
REACT_APP_PORT=3000
NGINX_PORT=80

# Environnement
NODE_ENV=production

# URLs
REACT_APP_API_URL=http://localhost:8080
```

### Nginx

La configuration Nginx inclut :
- Support des SPA (Single Page Applications)
- Compression gzip
- Cache pour les assets statiques
- Headers de sécurité
- Logs d'accès et d'erreur

## 🐛 Dépannage

### Problèmes courants

1. **Port déjà utilisé**
   ```bash
   # Changer le port dans docker-compose.yml
   ports:
     - "3001:3000"  # Utiliser le port 3001 au lieu de 3000
   ```

2. **Problème de permissions**
   ```bash
   # Donner les permissions d'exécution aux scripts
   chmod +x scripts/*.sh
   ```

3. **Cache Docker**
   ```bash
   # Nettoyer le cache Docker
   docker system prune -a
   ```

### Logs et debugging

```bash
# Voir les logs en temps réel
docker-compose logs -f

# Voir les logs d'un service spécifique
docker-compose logs -f app-dev

# Entrer dans le conteneur
docker-compose exec app-dev sh
```

## 📊 Monitoring

### Health checks

Le service de production inclut des health checks automatiques :

```bash
# Vérifier le statut des services
docker-compose -f docker-compose.prod.yml ps

# Voir les health checks
docker inspect playwithpro_app-prod_1 | grep -A 10 Health
```

### Métriques

```bash
# Voir l'utilisation des ressources
docker stats

# Voir l'espace disque utilisé
docker system df
```

## 🚀 Déploiement

### Sur un serveur

1. Cloner le repository
2. Configurer les variables d'environnement
3. Lancer le script de production :
   ```bash
   ./scripts/docker-prod.sh
   ```

### Avec un reverse proxy

Pour utiliser avec un reverse proxy (Nginx, Traefik, etc.) :

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 🔒 Sécurité

### Bonnes pratiques

- Utiliser des images officielles
- Ne pas exposer de ports inutiles
- Utiliser des secrets pour les données sensibles
- Mettre à jour régulièrement les images

### Headers de sécurité

La configuration Nginx inclut des headers de sécurité :
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Referrer-Policy

## 📚 Ressources

- [Documentation Docker](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [React Docker Best Practices](https://create-react-app.dev/docs/deployment/#docker)
