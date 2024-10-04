const router = require('express').Router();
const { addHouse,
    getHouse,
    getPlantingType,
    getActivities,
    getList,
    saveActivities,
    getActivitiesCosts,
    add_melon_costs,
    get_melon_costs,
    edit_melon_costs,
    delete_melon_costs,
    end_process_for_greenhouse,
    delete_greenhouse,
} = require('../controller/Process.controller');
const authenticateToken = require('../middleware/authentication');

router.post('/addHouse', authenticateToken, addHouse)
router.get('/getHouse', authenticateToken, getHouse)
router.get('/getPlantingType', authenticateToken, getPlantingType)
router.get('/getActivities', authenticateToken, getActivities)
router.post('/saveActivities', authenticateToken, saveActivities)
router.get('/getActivitiesCosts/:house_id', authenticateToken, getActivitiesCosts)
router.post('/add_melon_costs', authenticateToken, add_melon_costs)
router.post('/get_melon_costs', authenticateToken, get_melon_costs)
router.post('/edit_melon_costs', authenticateToken, edit_melon_costs)
router.post('/delete_melon_costs', authenticateToken, delete_melon_costs)
router.post('/end_process_for_greenhouse', authenticateToken, end_process_for_greenhouse)
router.post('/delete_greenhouse', authenticateToken, delete_greenhouse)
router.post('/getList', authenticateToken, getList)

// router.post('/cancel/:id',cancelPatient )

module.exports = router;