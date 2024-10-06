const { login, register } = require('../controller/Auth.controller'); // เพิ่มฟังก์ชัน register
const { uploadMiddleware, CheckUser } = require('../middleware/upload');

const router = require('express').Router();

// เส้นทางสำหรับเข้าสู่ระบบ
router.post("/login", login);
router.post("/register",uploadMiddleware, register);

module.exports = router;
