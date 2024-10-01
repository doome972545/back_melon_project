const connection = require('../config/db')
const jwt = require('jsonwebtoken');

module.exports = {
    login: (req, res) => {
        const { username, password } = req.body;
        // Validate user credentials
        connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Database query failed' });
            }
            if (results.length === 0) {
                return res.status(401).json({ message: 'ไม่พบชื่อผู้ใช้' });
            }
            const user = results[0];
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
}