const dotenv = require("dotenv").config();
const mysql = require("mysql");

const maxRetries = 20; // จำนวนครั้งสูงสุดในการ retry
const retryDelay = 3000; // รอ 3 วินาที

let retries = 0;
let connection;

function connectWithRetry() {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
  });

  connection.connect((err) => {
    if (err) {
      retries++;
      console.error(
        `❌ ไม่สามารถเชื่อมต่อฐานข้อมูล (ลองครั้งที่ ${retries}):`,
        err.message
      );
      if (retries < maxRetries) {
        setTimeout(connectWithRetry, retryDelay); // รอแล้วลองใหม่
      } else {
        console.error("❌ เชื่อมต่อฐานข้อมูลไม่สำเร็จ หลังจาก retry หลายครั้ง");
      }
    } else {
      console.log("✅ เชื่อมต่อฐานข้อมูลสำเร็จ");
    }
  });
}

connectWithRetry();

module.exports = () => connection;
