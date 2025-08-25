FROM node:18

WORKDIR /app

# copy เฉพาะไฟล์ dependency ก่อน
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# ติดตั้ง nodemon แยกเฉพาะ dev
RUN npm install -g nodemon

# copy source code ที่เหลือ
COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
