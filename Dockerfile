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
ENV DATABASE_URL=mongodb://usuario:senha@host:porta/banco_de_dados
# Expõe a porta da API
EXPOSE 3000
RUN npx prisma generate
# Comando para rodar a API
CMD ["npm", "start"]
