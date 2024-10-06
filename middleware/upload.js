const multer = require('multer');
const connection = require('../config/db');

// ตั้งค่า multer สำหรับการอัพโหลดไฟล์
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // กำหนดโฟลเดอร์สำหรับเก็บไฟล์
    },
    filename: (req, file, cb) => {
        const timeStamp = Date.now(); // เวลาในมิลลิวินาที
        // ตั้งชื่อไฟล์โดยใช้ timestamp และ original name
        const fileName = `${timeStamp}.jpg`; // เปลี่ยนช่องว่างในชื่อไฟล์เป็น underscore
        cb(null, fileName); // ส่งชื่อไฟล์กลับ
    }
});

const upload = multer({ storage }).single('profileImage'); // กำหนดว่าใช้ไฟล์เดียว

// Middleware สำหรับการจัดการการอัพโหลด
const uploadMiddleware = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send({ message: 'File upload failed.', error: err.message });
        }
        next(); // ไปยัง middleware ถัดไปหรือ route handler
    });
};

const CheckUser = async (req, res, next) => {
    const data = await req.body
    await connection.query("SELECT * FROM users WHERE username =?",
        [data.username], (err, result) => {
            if (err) console.log(err.message)
            if (result.length > 0) return res.status(409).json({ message: "มีชื่อผู้ใช้แล้ว" })
            else {
                next()
            }
        }
    )
}

module.exports = { CheckUser, uploadMiddleware };
