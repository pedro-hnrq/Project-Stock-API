FROM node:23-alpine3.20

WORKDIR /app

# Copiar arquivos necessários para o contêiner
COPY package.json package-lock.json* ./
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY . .

# Expor a porta em que a aplicação rodará
EXPOSE 3000

# Comando padrão para iniciar o serviço
CMD ["npm", "run", "dev"]
