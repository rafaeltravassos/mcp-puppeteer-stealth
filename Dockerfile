FROM node:20-slim
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY index.js ./

# Configurações de Rede
ENV BROWSER_WS_ENDPOINT=ws://browserless-agencia:3000
EXPOSE 3001

CMD ["node", "index.js"]
