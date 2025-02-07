# Usa a versão correta do Node.js
FROM node:20.12-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto
COPY package.json package-lock.json ./
RUN npm install

# Copia o restante dos arquivos
COPY . .
ENV NODE_ENV=production
ENV DATABASE_URL="mongodb+srv://gabrielzerio:JJyijuRxX6UbpRHk@cluster0.wf6r8.mongodb.net/lista_de_comprass?retryWrites=true&w=majority&appName=Cluster0"
ENV JWT_SECRET="2164c0b2410b5078af5da9519808c0323cc6233934490984fb4990b6308b56e1"
# Expõe a porta da API
EXPOSE 3000
RUN npx prisma generate
# Comando para rodar a API
CMD ["npm", "start"]
