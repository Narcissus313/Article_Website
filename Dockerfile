FROM node:20.15.1-alpine3.20
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000 27017
CMD ["npm","start"]