const Router = require(`express`).Router()
const controller = require(`../controllers/songController`)

Router
    .post(`/addItem/:id`, controller.addProduct)
    .post(`/clearCart`, controller.clearCart)
    .get(`/getAllProducts`, controller.getAllProducts)

module.exports = Router