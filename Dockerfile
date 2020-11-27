FROM node:current-buster

WORKDIR /usr/app

COPY package.json .

RUN npm install --quiet

COPY . .

RUN git clone https://github.com/vishnubob/wait-for-it.git

EXPOSE 8080
CMD ["npm", "start"]