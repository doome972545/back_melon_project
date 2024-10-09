const connection = require('../config/db')
const jwt = require('jsonwebtoken');
const fs = require('fs-extra');
const path = require('path');
const bcrypt = require('bcryptjs'); // เปลี่ยนเป็น bcryptjs
const saltRounds = 10;

module.exports = {
    login: async (req, res) => {
        const { username, password } = await req.body;
        // Validate user credentials
        connection.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Database query failed' });
            }
            if (results.length === 0) {
                return res.status(401).json({ message: 'ไม่พบชื่อผู้ใช้' });
            }

            const user = results[0];

            // ตรวจสอบ password ที่ถูก hash ไว้
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Password ไม่ถูกต้อง' });
            }

            const token = jwt.sign({ user_id: user.id, status: user.status }, process.env.JWT_KEY);
            res.json({
                token: token,
                data: {
                    user_id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    status: user.status
                }
            });
        });
    },


    register: async (req, res) => {
        try {
            const imageUrl = req.file ? req.file.path : null; // รับ URL ของรูปที่อัพโหลดจาก Cloudinary
            const data = await req.body;
            const publicId = req.file ? req.file.filename : null; 
            if (req.file) {
                var fileName = await req.file.filename;
            }
            if (!data.username) {
                return res.status(400).json({ message: "Username is required" });
            }

            connection.query("SELECT * FROM users WHERE username = ?", [data.username], async (err, result) => {
                if (err) {
                    console.log(err.message);
                    return res.status(500).json({ message: 'Internal server error' });
                }

                if (result.length > 0) {
                    if (req.file && publicId) {
                        // ลบรูปภาพจาก Cloudinary
                        cloudinary.uploader.destroy(publicId, function (error, result) {
                            if (error) {
                                console.error('Error deleting image from Cloudinary:', error);
                                return res.status(500).json({ message: 'Failed to delete image from Cloudinary', error: error.message });
                            }
                            return res.status(409).json({ message: 'มีชื่อผู้ใช้แล้ว' });
                        });
                    } else {
                        return res.status(409).json({ message: 'มีชื่อผู้ใช้แล้ว' });
                    }
                } else {

                    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

                    connection.query("INSERT INTO users (username,password,firstName,lastName,phone,fullName,profile_info) VALUES (?,?,?,?,?,?,?)",
                        [
                            data.username,
                            hashedPassword, // บันทึก password ที่ hash แล้ว
                            data.firstName,
                            data.lastName,
                            data.phone,
                            data.fullName,
                            imageUrl,
                        ], (err, result) => {
                            if (err) return res.status(500).send({ message: "Error inserting" });
                            return res.status(200).json({ message: 'ลงทะเบียนสำเร็จ' });
                        }
                    );
                }
            });
        } catch (e) {
            console.log(e.message);
            return res.status(500).send("Internal Server Error");
        }
    }
}