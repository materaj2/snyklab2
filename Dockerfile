FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install express sqlite3

COPY src /usr/src/app 

#EXPOSE 3000

COPY start.sh /start.sh
#CMD [ "node", "app.js" ]
ENTRYPOINT ["/start.sh"]
