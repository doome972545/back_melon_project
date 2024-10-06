const express = require('express');
const app = express();
const port = 3000
const connection = require("../config/db")
const dotenv = require("dotenv").config();
const cors = require("cors");

const fertilizer = require('../routes/house.routes')
const auth = require('../routes/auth.routes')
const admin = require('../routes/admin.routes')
app.use(cors())
app.use(express.json());
app.use(express.static('./uploads'))

app.use('/api/house', fertilizer);
app.use('/api/auth', auth);
app.use('/api/admin', admin);

app.get('/', (req, res) => res.send('Hello World!!!!!!!!!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
