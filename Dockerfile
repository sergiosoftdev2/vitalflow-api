FROM node:20-slim

# Instalamos pnpm
RUN npm install -g pnpm

WORKDIR /app

# Primero solo los archivos de dependencias
COPY package.json pnpm-lock.yaml* ./

# Instalamos (esto se queda en cache si no cambias el package.json)
RUN pnpm install
COPY . .

EXPOSE 3000
CMD ["pnpm", "run", "start:dev"]