FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . /usr/src/app/src

# Expose port and start application
EXPOSE 3000
CMD [ "npm", "dev" ]