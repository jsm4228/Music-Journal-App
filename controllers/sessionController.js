const { Session, Song, User } = require('../models')


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

const getColumn = async (req, res) => {
    try {
        let attribute = req.params.attribute
        let data = await Session.find()
        let attributes = []
        data.forEach((object) => {
            attributes.push(object[attribute])
        })
        res.send(attributes)
    } catch(e) {
        res.send(e.message)
    }
}


const getSongs= async (url) => {
    let startIndex = url.indexOf('tab/') + 4; // Adding 4 to skip 'tab/'
    let endIndex = url.indexOf('/', startIndex); // the second parameter is starting index to search from
    let artist_name = url.substring(startIndex, endIndex).replace(/-/g, ' ');

    startIndex = endIndex+=1
    endIndex = url.indexOf('-chords', startIndex)
    let song_name = url.substring(startIndex, endIndex).replace(/-/g, ' ');


    return new Song({
        song_name: song_name,
        artist_name: artist_name,
        guitar_tab_url: url
    })
}
const createSongs = async (url) => {
  
   
        song = await getSongs(url)
    
    
    let songObj = await Song.insertMany(song)
    return songObj
    
}

const createSession = async (req, res) => {
    try {
        let url = req.params.tabs_url
        let duration = req.params.duration
        let mood = req.params.mood
        let focus = req.params.focus
        let notes = req.params.notes
        let tempo = req.params.tempo
        let session = await new Session({
            user_id: User.findOne()._id,
            song_id: await createSongs(url),
            duration: duration,
            mood: mood,
            focus: focus,
            notes: notes,
            tempo: tempo,
            date: new Date()
        })

        Session.insertMany(session)
        res.send(session)

    } catch(e) {
        res.send(e.message)
    }
}

const deleteSession = async (req, res) => {
    Session.findByIdAndDelete(req.params.id)
    res.send('complete')
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
    updateAttribute,
    getColumn,
    createSession,
    deleteSession
}

