const Router = require(`express`).Router()
const controller = require(`../controllers/sessionController`)

Router
    .get(`/`, controller.getAllSessions)
    //.get(`/:song`, controller.getSessionBySong)

module.exports = Router
