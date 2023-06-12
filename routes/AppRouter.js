const Router = require(`express`).Router()

const SessionRouter = require(`./sessionRouter`)
const UserRouter = require(`./userRouter`)
const SongRouter = require(`./songRouter`)

Router.use(`/session`, SessionRouter)
Router.use(`/user`, UserRouter)
Router.use('/song', SongRouter)


module.exports = Router