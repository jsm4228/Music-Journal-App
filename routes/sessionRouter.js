const Router = require(`express`).Router()
const controller = require(`../controllers/sessionController`)

Router
    .get(`/`, controller.getAllSessions)
    .get('/:attribute', controller.getColumn)
    .post(`/:id/:attribute/:value`, controller.updateAttribute)

module.exports = Router
