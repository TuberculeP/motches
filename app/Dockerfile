FROM node:18

# Créer le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers de package et installer les dépendances
COPY app/package*.json ./
RUN npm install

COPY shared /usr/src/shared

# Copier le reste du code de l'application
COPY app .

# Build de l'application
RUN npm run build

# Exposer le port
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]