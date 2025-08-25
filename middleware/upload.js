const multer = require('multer');
const connection = require('../config/db');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

// ตั้งค่า storage ให้กับ multer เพื่อเก็บไฟล์ที่ Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'profile_images', // โฟลเดอร์ใน Cloudinary ที่ต้องการเก็บรูป
        format: async (req, file) => 'png', // ฟอร์แมตรูปภาพ
        public_id: (req, file) => Date.now(), // กำหนดชื่อไฟล์โดยใช้ timestamp
    },
});

const upload = multer({ storage }).single('profileImage');

const uploadMiddleware = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            return res.status(500).send(err);
        }

        // ตรวจสอบว่ามีการอัพโหลดไฟล์หรือไม่
    if (!req.file) {
        // ถ้าไม่มีไฟล์ให้ไปลงทะเบียนต่อ
        return next(); // ถ้ามีรูปภาพ อัปโหลดไปยัง Cloudinary
    }

        // เก็บ URL ของรูปที่อัพโหลดใน req.file.path
        req.file.path = req.file.path; // เก็บ URL รูปใน req.file.path
        next();
    });
};

module.exports = { uploadMiddleware };
