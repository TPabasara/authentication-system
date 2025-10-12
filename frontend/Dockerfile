# frontend/Dockerfile
FROM node:20.15.0-slim

WORKDIR /opt/app/frontend

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
