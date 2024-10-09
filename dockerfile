FROM node:18
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 10000
CMD ["npm","run","dev"]