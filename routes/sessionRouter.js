const Router = require(`express`).Router()
const controller = require(`../controllers/sessionController`)

Router
    .get(`/`, controller.getAllSessions)
    .post(`/:id/:attribute/:value`, controller.updateAttribute)

module.exports = Router
