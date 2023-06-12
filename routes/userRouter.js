const Router = require(`express`).Router()
const controller = require(`../controllers/userController`)

Router
    .get(`/`, controller.getAllTablets)
    .get(`/:name`, controller.getTabletByName)

module.exports = Router