const { Session } = require('../models')


//const db = require('../db')
// db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// Create and Update Model
// const addProduct = async (req, res) => {
    
//     try {
//         //db.on('error', console.error.bind(console, 'MongoDB connection error:'))
//         let count = await ShoppingCart.count()

//         if(count==0) {
//             let shoppingCart = new ShoppingCart({
//                 product: [],
//                 totalPrice: 0
//             })
//             await ShoppingCart.insertMany(shoppingCart)
//         }

//         let productId = await Computer.findById(req.params.id)
//         if(!productId) productId = await Tablet.findById(req.params.id)

//         const shoppingCart = await ShoppingCart.findOne({})
//         shoppingCart.product.push(productId)
//         shoppingCart.save()
//         res.send(shoppingCart)
//         //db.close()


//     } catch(e) {
//         res.send(e.message)
//     }
// }

const getAllSessions = async (req, res) => {
    try {
        res.send(await Session.find())
    } catch(e) {
        res.send(e.message)
    }
}

const updateAttribute = async (req, res) => {
    try {
        let id  = req.params.id
        let attribute = req.params.attribute
        const session = await Session.findById(id)
        session[attribute] = Number(req.params.value)
        session.save()
        console.log(session)
        res.send(session)

    } catch(e) {
        console.log(e.message)
        res.send(e.message)
    }
    



}

// const clearCart = async (req, res) => {
//     try {
//         //db.on('error', console.error.bind(console, 'MongoDB connection error:'))
//         await ShoppingCart.deleteMany()
//         res.send(await ShoppingCart.find())
//         //db.close()
//     } catch(e) {
//         res.send(e.message)
//     }
// }

module.exports = {
    getAllSessions,
    updateAttribute
}

