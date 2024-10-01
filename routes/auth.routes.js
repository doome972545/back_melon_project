const { login } = require('../controller/Auth.controller');

const router = require('express').Router();

router.post("/login", login)
// router.post('/cancel/:id',cancelPatient )

module.exports = router;