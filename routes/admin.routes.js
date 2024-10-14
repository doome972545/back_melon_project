const { getUsers, getUserAllhouse, getUserActivities, getListCostsAdmin, approveUser, get_data_chart, get_costs, edit_costs, create_costs } = require('../controller/adminprocess.controller');
const authenticateToken = require('../middleware/authentication');
const router = require('express').Router();

router.get('/getUsers', authenticateToken, getUsers)
router.post('/getUserAllhouse', authenticateToken, getUserAllhouse)
router.post('/getUserActivities', authenticateToken, getUserActivities)
router.post('/getListCostsAdmin', authenticateToken, getListCostsAdmin)
router.post('/approveUser', authenticateToken, approveUser)
router.post('/get_data_chart', authenticateToken, get_data_chart)
router.get('/get_costs', authenticateToken, get_costs)
router.post('/edit_costs', authenticateToken, edit_costs)
router.post('/create_costs', authenticateToken, create_costs)

module.exports = router;