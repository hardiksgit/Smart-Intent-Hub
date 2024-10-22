FROM node:18

WORKDIR /siena-challenge

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
