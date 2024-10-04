const { getUsers, getUserAllhouse, getUserActivities, getListCostsAdmin, approveUser, get_data_chart } = require('../controller/adminprocess.controller');
const authenticateToken = require('../middleware/authentication');
const router = require('express').Router();

router.get('/getUsers', authenticateToken, getUsers)
router.post('/getUserAllhouse', authenticateToken, getUserAllhouse)
router.post('/getUserActivities', authenticateToken, getUserActivities)
router.post('/getListCostsAdmin', authenticateToken, getListCostsAdmin)
router.post('/approveUser', authenticateToken, approveUser)
router.post('/get_data_chart',authenticateToken, get_data_chart)

module.exports = router;