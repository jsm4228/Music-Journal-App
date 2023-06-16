const Router = require(`express`).Router()
const controller = require(`../controllers/sessionController`)

Router
    .get(`/`, controller.getAllSessions)
    .get('/:attribute', controller.getColumn)
    .post('/:tabs_url/:duration/:mood/:focus/:notes/:tempo/', controller.createSession)
    .post(`/:id/:attribute/:value`, controller.updateAttribute)
    .delete('/:id', controller.deleteSession)


module.exports = Router
