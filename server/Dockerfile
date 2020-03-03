FROM node:12
RUN apt-get update && apt-get install -y postgresql-client
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["./wait-for-postgres.sh", "postgres", "node", "server.js"]
