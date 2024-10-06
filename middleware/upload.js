const multer = require('multer');
const connection = require('../config/db');

// ตั้งค่า multer สำหรับการอัพโหลดไฟล์
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const timeStamp = Date.now();
        const fileName = `${timeStamp}.jpg`;
        cb(null, fileName);
    }
});

const upload = multer({ storage }).single('profileImage');

const uploadMiddleware = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send({ message: 'File upload failed.', error: err.message });
        }
        next();
    });
};

module.exports = { uploadMiddleware };
