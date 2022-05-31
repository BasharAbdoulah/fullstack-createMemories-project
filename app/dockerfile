FROM node
RUN mkdir /app
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]