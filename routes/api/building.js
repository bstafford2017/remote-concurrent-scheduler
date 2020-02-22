const sendJSONResultBack = require('./utils/query')
const router = express.Router()

// Get all buildings
router.get('/', (req, res) => {
    const getAllBuildings = `SELECT * FROM buildings`
    sendJSONResultBack(getAllBuildings, res)
})