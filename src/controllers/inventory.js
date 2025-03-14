const serviceInventory = require("../services/inventory")

class InventoryController {
    async FindAll (req, res){
        try{
            const organizationId = req.session.organizationId
            const inventories = await serviceInventory.FindAll(organizationId)
            res.status(200).send(inventories)
        }
        catch(error){
            res.status(500).send({msg: error.message})
        }
    }
    async FindById (req, res){
        try{
            const {id} =req.params
            const organizationId = req.session.organizationId
            const invetory = await serviceInventory.FindById(organizationId, id)
            res.status(200).send(invetory)
        }
        catch(error){
            res.status(500).send({msg: error.message})
        }
    }
    async Create (req, res){
        try{
            const {name} = req.body
            const organizationId = req.session.organizationId
            const invetory = await serviceInventory.Create(organizationId, name)
            res.status(201).send(invetory)
        }
        catch(error){
            res.status(500).send({msg: error.message})
        }
    }
    async Update (req, res){
        try{
            const {id} = req.params
            const {name} = req.body
            const organizationId = req.session.organizationId
            const invetory = await serviceInventory.Update(organizationId, id, name)
            res.status(200).send(invetory)
        }
        catch(error){
            res.status(500).send({msg: error.message})
        }        
    }
    async Delete (req, res){
        try{
            const {id} = req.params
            const organizationId = req.session.organizationId
            const invetory = await serviceInventory.Delete(organizationId, id)
            res.status(204).send(invetory)
        }
        catch(error){
            res.status(500).send({msg: error.message})
        }
    }
}
module.exports = new InventoryController()