const { Computer } = require(`../models`)

const getAllComputers = async(req,res)=>{
    try{
        const computers = await Computer.find()
        res.status(200).json(computers)
    } catch(e){
        res.status(400).send(e.message)
    }
}

const getComputerByName = async(req,res)=>{
    try{
        let searchKey = new RegExp(req.params.name, `i`)
        const computer = await Computer.find({name: searchKey})
        if (!computer) throw Error(`computer not found`)
        res.status(200).json(computer)
    } catch(e){
        res.status(400).send(e.message)
    }
}

const createComputer = async (req,res)=> {
    try {
        const { name, price, image } = req.params
        const newComputer = new Computer({
            name: name,
            price: price,
            image: image,
            specs: {
              Weight: '1700g',
              Dimensions: '280.6 x 214.9 x 6.4mm',
              OS: 'Windows 11',
              screenSize: '17.3-inch',
              Resolution: '1920 x 1080 pixels',
              CPU: 'Intel Core i7',
              Storage: '128GB/256GB/512GB/1TB/2TB',
              microSDSlot: 'No',
              Battery: 'Up to 12 hours',
              RearCamera: '12MP + 10MP + LiDAR',
              FrontCamera: '12MP',

            }
    })

    } catch(e) {

    }
}

module.exports = {
    getAllComputers,
    getComputerByName,
    createComputer
}