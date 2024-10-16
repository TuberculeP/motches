# webapp/Dockerfile
# Utiliser une image de base Node.js
FROM node:18

# Créer le répertoire de travail
WORKDIR /usr/src/webapp

# Copier les fichiers de package et installer les dépendances
COPY webapp/package*.json .
RUN npm install

COPY shared /usr/src/shared

# Copier le reste du code de l'application
COPY webapp .

# Build de l'application
ARG VITE_PORT
ENV VITE_PORT=$VITE_PORT
ARG VITE_EXPRESS_URL
ENV VITE_EXPRESS_URL=$VITE_EXPRESS_URL
ARG VITE_DOMAIN
ENV VITE_DOMAIN=$VITE_DOMAIN
RUN VITE_PORT=$VITE_PORT VITE_DOMAIN=$VITE_DOMAIN VITE_EXPRESS_URL=$VITE_EXPRESS_URL npm run build-only

# Installer un serveur HTTP simple pour servir les fichiers statiques
RUN npm install -g serve

# Exposer le port
EXPOSE 5000

RUN env

# Démarrer le serveur pour servir les fichiers statiques
CMD ["serve", "-s", "dist", "-l", "5000"]
