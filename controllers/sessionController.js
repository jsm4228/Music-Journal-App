const { ShoppingCart } = require('../models')
const { Computer } = require(`../models`)
const { Tablet } = require(`../models`)

//const db = require('../db')
// db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// Create and Update Model
const addProduct = async (req, res) => {
    
    try {
        //db.on('error', console.error.bind(console, 'MongoDB connection error:'))
        let count = await ShoppingCart.count()

        if(count==0) {
            let shoppingCart = new ShoppingCart({
                product: [],
                totalPrice: 0
            })
            await ShoppingCart.insertMany(shoppingCart)
        }

        let productId = await Computer.findById(req.params.id)
        if(!productId) productId = await Tablet.findById(req.params.id)

        const shoppingCart = await ShoppingCart.findOne({})
        shoppingCart.product.push(productId)
        shoppingCart.save()
        res.send(shoppingCart)
        //db.close()


    } catch(e) {
        res.send(e.message)
    }
}

const getAllProducts = async (req, res) => {
    try {
        res.send(await ShoppingCart.find())
    } catch(e) {
        res.send(e.message)
    }
}

const clearCart = async (req, res) => {
    try {
        //db.on('error', console.error.bind(console, 'MongoDB connection error:'))
        await ShoppingCart.deleteMany()
        res.send(await ShoppingCart.find())
        //db.close()
    } catch(e) {
        res.send(e.message)
    }
}

module.exports = {
    addProduct,
    clearCart,
    getAllProducts
}

