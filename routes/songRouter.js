const Router = require(`express`).Router()
const controller = require(`../controllers/songController`)

Router
     .post(`/:tabs_url`, controller.createSongs)
      .get(`/:song`, controller.getSongbyName)
    //  .post(`/:id/:new_song`, controller.updateSongName)
    //  .delete('/:id', controller.deleteSong)

module.exports = Router