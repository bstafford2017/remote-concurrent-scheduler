const sendJSONResultBack = require('./utils/query')
const router = express.Router()

// Get particular building's rooms
router.get('/', (req, res) => {
    const searchBuilding = req.body.building
    if(!searchBuilding)
        res.sendStatus(404)

    const getRooms = `SELECT * FROM rooms WHERE building = '${searchBuilding}'`
    sendJSONResultBack(getRooms, res)
})