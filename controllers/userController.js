const { Tablet } = require(`../models`)

const getAllTablets = async(req,res)=>{
    try{
        const tablets = await Tablet.find()
        res.status(200).json(tablets)
    } catch(e){
        res.status(400).send(e.message)
    }
}

const getTabletByName = async(req,res)=>{
    try{
        let searchKey = new RegExp(req.params.name, `i`)
        const tablet = await Tablet.find({name: searchKey})
        if (!tablet) throw Error(`tablet not found`)
        res.status(200).json(tablet)
    } catch(e){
        res.status(400).send(e.message)
    }
}

module.exports = {
    getAllTablets,
    getTabletByName
}