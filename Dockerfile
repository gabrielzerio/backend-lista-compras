# Usa a versão correta do Node.js
FROM node:20.12-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto
COPY package.json package-lock.json ./
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Expõe a porta da API
EXPOSE 3000

# Comando para rodar a API
CMD ["npm", "start"]
